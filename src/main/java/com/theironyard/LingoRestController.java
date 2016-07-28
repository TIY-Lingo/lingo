package com.theironyard;

import com.theironyard.entities.*;
import com.theironyard.services.CategoryRepository;
import com.theironyard.services.DictionaryRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.theironyard.services.ArticleRepository;
import com.theironyard.services.UserRepository;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Scanner;


@RestController
public class LingoRestController {

    @Autowired
    UserRepository users;

    @Autowired
    ArticleRepository articles;

    @Autowired
    DictionaryRepository dictionaries;

    @Autowired
    CategoryRepository categories;

    Server dbui = null;

    @PostConstruct
    public void init() throws SQLException, IOException, InterruptedException {
        dbui.createWebServer().start();
        parseDictionary();

        Category cat = new Category("business", 1);
        System.out.println(cat);
        if (categories.count() == 0) {
            categories.save(cat);
            cat = new Category("politics",2);
            categories.save(cat);
            cat = new Category("sports",3);
            categories.save(cat);
            cat = new Category("arts",4);
            categories.save(cat);
            cat = new Category("technology",5);
            categories.save(cat);
        }
    }

    @PreDestroy
    public void destroy(){dbui.stop();}


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Boolean login(@RequestBody User user, HttpSession session,  java.util.Date date) throws Exception {

        User user1 = users.findByUsername(user.getUsername());
        if (user1 == null) {
            return false;
        }
        else if (!PasswordStorage.verifyPassword(user.getPassword(), user1.getPassword())){
            return false;
        }
//        user1.setTimestamp(LocalDateTime.now());
//        users.save(user1);
        session.setAttribute("username", user1.getUsername());
        return true;
    }

    @RequestMapping(path = "/registerUser", method = RequestMethod.POST)
    public Boolean register(@RequestBody User user, HttpServletResponse response, HttpSession session) throws PasswordStorage.CannotPerformOperationException, IOException {
        if(users.findByUsername(user.getUsername())!= null){   // If the username is in the DB return false
            return false;
        }else {                                                 //Otherwise create the user and add it to the DB
            User user1 = new User(user.getUsername(), PasswordStorage.createHash(user.getPassword()));

            users.save(user1);
            session.setAttribute("username", user1.getUsername());
            return true;
        }
    }

    @RequestMapping(path = "/preferences", method = RequestMethod.GET)
    public User getPreferences( HttpSession session) throws Exception {
       if (session.getAttribute("username") != null){
           return users.findByUsername((String) session.getAttribute("username"));
       } else{
           throw new Exception("you mst be logged in to change preferences");
       }
    }

    @RequestMapping(path = "/preferences", method = RequestMethod.POST)
    public User setPreferences(@RequestBody User user, HttpSession session) throws Exception {
        if (session.getAttribute("username") ==null){
            throw new Exception("You must Login to view or change preferences!");
        }else {
            User userA = users.findByUsername((String) session.getAttribute("username"));
            userA.setLanguage(user.getLanguage());
            if (user.getArts()) {
                Category cat = categories.findFirstByType("arts");
                userA.getCatList().add(cat);
            }
            if(user.getBusiness()){
                Category cat = categories.findFirstByType("business");
                userA.getCatList().add(cat);
            }
            if(user.getPolitics()){
                Category cat = categories.findFirstByType("politics");
                userA.getCatList().add(cat);
            }
            if(user.getSports()){
                Category cat = categories.findFirstByType("sports");
                userA.getCatList().add(cat);
            }
            if(user.getTechnology()){
                Category cat = categories.findFirstByType("technology");
                userA.getCatList().add(cat);
            }

            users.save(userA);
            System.out.println("User saved to Database...");
        }
        return users.findByUsername((String) session.getAttribute("username"));
    }

    @RequestMapping(path = "/articles", method = RequestMethod.GET)
    public ArrayList<ReturnArticle> getArticles(HttpSession session) throws Exception {
        if (session.getAttribute("username")==null){
            throw new Exception("You must log in to view this page");
        }else {
            User user = users.findByUsername((String) session.getAttribute("username"));

            String sql = "SELECT ca.CATEGORY_ID, " + "a.span1 " + ", a.title, a.type"  + "  FROM Articles a " +
            "INNER JOIN CATEGORY_ARTICLE ca ON ca.article_id = a.ID " +
            "INNER JOIN USERS_CATEGORIES uc on uc.catlist_ID = ca.CATEGORY_ID " +
            "WHERE uc.user_id = ? ";

            Connection conn = DriverManager.getConnection("jdbc:h2:./main;DB_CLOSE_ON_EXIT=FALSE", "sa", "");
            PreparedStatement stmnt = conn.prepareStatement(sql);
            stmnt.setInt(1, user.getId());
            ResultSet results = stmnt.executeQuery();

            ArrayList<ReturnArticle> returnArray = new ArrayList<>();
            while(results.next()){
                int categoryId = results.getInt(1);
                String translation = results.getString(2);
                String title = results.getString(3);
                String type = results.getString(4);
                ReturnArticle ra1 = new ReturnArticle(categoryId, translation, title, type);
                returnArray.add(ra1);
            }

            conn.close();

            return returnArray;
        }
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session) throws IOException {
        session.invalidate();
        System.out.println("Session has been invalidated");
    }

    public void parseDictionary() throws FileNotFoundException {

        if(dictionaries.count() == 0) {
            File f = new File("Tri-Lingual-Library.csv");
            Scanner scanner = new Scanner(f);
            scanner.nextLine();
            while (scanner.hasNext()) {
                String[] arrayString = scanner.nextLine().split(",");
                Dictionary dictEntry = new Dictionary(arrayString[0], arrayString[1], arrayString[2]);
                dictionaries.save(dictEntry);
            }
            System.out.println("Language Dictionary has been created");//for console testing
        } else {
            System.out.println("Language Dictionary already exists");//for console testing
        }
    }
}

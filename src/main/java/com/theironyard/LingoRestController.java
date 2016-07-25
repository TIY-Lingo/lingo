package com.theironyard;

import com.theironyard.entities.Article;
import com.theironyard.entities.Dictionary;
import com.theironyard.entities.User;
import com.theironyard.services.DictionaryRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.theironyard.services.ArticleRepository;
import com.theironyard.services.UserRepository;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Scanner;
import java.sql.SQLException;


@RestController
public class LingoRestController {

    @Autowired
    UserRepository users;

    @Autowired
    ArticleRepository articles;

    @Autowired
    DictionaryRepository dictionaries;

    @PostConstruct
    public void init() throws SQLException, IOException, InterruptedException {
        Server.createWebServer().start();
        parseDictionary();
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Boolean login(@RequestBody User user, HttpSession session,  java.util.Date date) throws Exception {

        User user1 = users.findByUsername(user.getUsername());
        if (user1 == null) {
            return false;
        }
        else if (!PasswordStorage.verifyPassword(user.getPassword(), user1.getPassword())){
            return false;
        }
        user1.setTimestamp(LocalDateTime.now());
        users.save(user1);
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
    public void setPreferences(@RequestBody User user, HttpSession session) throws Exception {
        if (session.getAttribute("username") ==null){
            throw new Exception("You must Login to view or change preferences!");
        }else {
            User userA = users.findByUsername((String) session.getAttribute("username"));
            userA.setArts(user.getArts());
            userA.setBusiness(user.getBusiness());
            userA.setLanguage(user.getLanguage());
            userA.setPolitics(user.getPolitics());
            userA.setSports(user.getSports());
            userA.setTechnology(user.getTechnology());
            users.save(userA);
            System.out.println("User saved to Database...");
        }
    }

    @RequestMapping(path = "/articles", method = RequestMethod.GET)
    public ArrayList<Iterable<Article>> getArticles(HttpSession session) throws Exception {
        if (session.getAttribute("username")==null){
            throw new Exception("You must log in to view this page");
        }else {
            User user = users.findByUsername((String) session.getAttribute("username"));

            ArrayList<Iterable<Article>> articleList = new ArrayList<>();
            if (user.getTechnology()){
                articleList.add((Iterable<Article>) articles.findArticleByType("technology"));
            }
            if(user.getSports()){
                articleList.add((Iterable<Article>) articles.findArticleByType("sports"));
            }
            if(user.getPolitics()){
                articleList.add((Iterable<Article>) articles.findArticleByType("politics"));
            }
            if(user.getArts()){
                articleList.add((Iterable<Article>) articles.findArticleByType("arts"));
            }
            if (user.getBusiness()){
                articleList.add((Iterable<Article>) articles.findArticleByType("business"));
            }
        return articleList;
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

package com.theironyard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Article;
import com.theironyard.entities.Dictionary;
import com.theironyard.entities.User;
import com.theironyard.services.DictionaryRepository;
import com.theironyard.utils.PasswordStorage;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.h2.tools.Server;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Async;

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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

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
        scrapeAPIResults();
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public Boolean login(@RequestBody User user, HttpSession session, HttpServletResponse response) throws Exception {
        User user1 = users.findByUsername(user.getUsername());
        if (user1 == null) {
            return false;
        }
        else if (!PasswordStorage.verifyPassword(user.getPassword(), user1.getPassword())){
            return false;
        }
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
    public User getPreferences(String username, String language, Boolean technology, Boolean sports, Boolean business, Boolean politics, Boolean arts){
        return users.findByUsername(username);
    }



    @RequestMapping(path = "/preferences", method = RequestMethod.POST)
    public void setPreferences(@RequestBody User user ){
        User userA = users.findByUsername(user.getUsername());
        userA.setArts(user.getArts());
        userA.setBusiness(user.getBusiness());
        userA.setLanguage(user.getLanguage());
        userA.setPolitics(user.getPolitics());
        userA.setSports(user.getSports());
        userA.setTechnology(user.getTechnology());
        users.save(userA);
    }




    @RequestMapping(path = "/articles", method = RequestMethod.GET)
    public Iterable<Article> getArticles(){
        return articles.findAll();

    }



    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session, HttpServletResponse response) throws IOException {
        session.invalidate();
        response.sendRedirect("/home");
    }


    @Async
    public void scrapeAPIResults() throws IOException, InterruptedException {
        parseDictionary();               //Brings language dictionary into the DB if it isn't already there.
        System.out.println("Retrieving Json from API...");               //for console testing
        String apiURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45";   // The Technology API url
        String returnedJson = apiRequest(apiURL);                        //setting the returned Json string to a String object for use.

        ObjectMapper mapper = new ObjectMapper();
        JsonNode fullJsonReturn = mapper.readValue(returnedJson, JsonNode.class);    //converts Json String into a Node for use with Jackson

        JsonNode results = fullJsonReturn.get("results");                //Creating a sub-node containing only the "results" portion of the original json file
        System.out.println("Parsing Json and populating Article List...");  //for console testing
        for(JsonNode result : results) {                                 // For every Result in the Results Node

            JsonNode title = result.findValue("title");                 // grab the title
            if (articles.findByTitle(title.toString()) != null) {       // use the title to see if it's in the DB, if it's there move on, otherwise add it
                continue;
            } else {
                JsonNode returnedURL = result.findValue("url");          // grab the url
                JsonNode author = result.findValue("byline");            // grab the byline - AKA the author

                String urlClean = returnedURL.toString();                 // The returned url has an extra set of "" that need to be removed before it can be used to get the article contents
                urlClean = urlClean.substring(1, urlClean.length() - 1); // this line drops the extra quotes by dropping the first and last character of the string

                Document doc = Jsoup.connect(urlClean).get();             // This scrapes the provided webpage and puts it in a document Object for use with Jsoup
                String content = doc.select("p").text();                  // this line grabs only the content from the css paragraph tags
                content = content.substring(27, content.length());        // Removes the first few characters because they are consistently gibberish or advertisements

                Article article = new Article(title.toString(), returnedURL.toString(), author.toString(), content.toString());  //creates an Article Object from the information grabbed above

                if (article.getContent().length() > 25000) {                 //Checking to make sure it will fit the confines of a cell in the DB
                    article.setContent(article.getContent().substring(0, 24999));
                    System.out.println("damn thats a big article");
                }
                articles.save(article);                                    //Saving the article to the Repo
            }
        }
        System.out.println("Processing Articles...");  //for console testing
        wordReplacement();
    }

    public static String apiRequest(String url) throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        try (Response response = client.newCall(request).execute()){
            return response.body().string();

        }
    }

    public int randomNum(){
        int n = (int) (1 + (Math.random() * (dictionaries.count())));
        return n;
    }

    public void wordReplacement(){
        for (Article article: articles.findAll()){
            if (article.getSpan1()!= null){             //if spanish has already been injected, move onto the next article
                System.out.println("This article - #" + article.getId() + " - Has Already Been translated ");
                continue;
            }else {                                     //otherwise, get to hotswappin'
                System.out.println("Currently Translating: " + article.getId());
                String spanishArticle = article.getContent();  //set placeholder for manipulating to the original content
                int count = 0;
                int failedcount=0;
                while (count <= 20) {
                    int seedValue = randomNum();   //grab a random number to check for in the article
                    if (spanishArticle.contains(dictionaries.findOne(seedValue).getEnglish())) {   //if the article contains the randomly selected english word from the language dictionary....
                        spanishArticle = spanishArticle.replace(dictionaries.findOne(seedValue).getEnglish(), "<span class='spanish'>" + dictionaries.findOne(seedValue).getSpanish() +"</span>"); //replace english seed value with spanish seed value

                        System.out.println("Replaced: " + dictionaries.findOne(seedValue).getEnglish() + " With: " + dictionaries.findOne(seedValue).getSpanish()); //for console testing
                        count++;
                    } else if (count == 20) {
                        article.setSpan1(spanishArticle);  //once the count hits 6 save the spanish changes and save it back to the DB
                        articles.save(article);            //add the article to the DB in case of failure further down the chain
                        levelTwoReplacement(article, spanishArticle);   //Take the article and the translated String and pass it down a the chain
                        break;
                    } else{
                        failedcount++;
                        if (failedcount >5000){
                            article.setSpan1(spanishArticle);
                            articles.save(article);
                            levelTwoReplacement(article, spanishArticle);
                            System.out.println("THIS ARTICLE DOESN'T HAVE ENOUGH WORDS TO TRANSLATE");
                            break;
                        }
                    }
                }
            }
        }
        System.out.println("Finished Processing Articles...");
    }

    public void levelTwoReplacement(Article article, String level1){
        int count2=0;
        int failedcount=0;
        while (count2 <= 20) {
            int seedValue = randomNum();   //grab a random number to check for in the article
            if (level1.contains(dictionaries.findOne(seedValue).getEnglish())) {   //if the article contains the randomly selected english word from the language dictionary....
                level1 = level1.replace(dictionaries.findOne(seedValue).getEnglish(), "<span class='spanish'>" + dictionaries.findOne(seedValue).getSpanish() +"</span>"); //replace english seed value with spanish seed value
                count2++;
            } else if (count2 == 20) {
                article.setSpan2(level1);  //once the count hits 6 save the spanish changes and save it back to the DB
                articles.save(article);
                levelThreeReplacement(article, level1);
                break;
            } else{
                failedcount++;
                if (failedcount >5000){
                    article.setSpan2(level1);
                    articles.save(article);
                    levelThreeReplacement(article, level1);
                    System.out.println("Level 2 THIS ARTICLE DOESN'T HAVE ENOUGH WORDS TO TRANSLATE");
                    break;
                }
            }
        }
    }

    public void levelThreeReplacement(Article article, String level2){
        int count2=0;
        int failedcount=0;
        while (count2 <= 20) {
            int seedValue = randomNum();   //grab a random number to check for in the article
            if (level2.contains(dictionaries.findOne(seedValue).getEnglish())) {   //if the article contains the randomly selected english word from the language dictionary....
                level2 = level2.replace(dictionaries.findOne(seedValue).getEnglish(), "<span class='spanish'>" + dictionaries.findOne(seedValue).getSpanish() +"</span>"); //replace english seed value with spanish seed value
                count2++;
            } else if (count2 == 20) {
                article.setSpan2(level2);  //once the count hits 6 save the spanish changes and save it back to the DB
                articles.save(article);
                break;
            } else{
                failedcount++;
                if (failedcount >5000){
                    article.setSpan3(level2);
                    articles.save(article);
                    System.out.println("Level 3 THIS ARTICLE DOESN'T HAVE ENOUGH WORDS TO TRANSLATE");
                    break;
                }
            }
        }
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

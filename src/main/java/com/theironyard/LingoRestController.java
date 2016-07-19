package com.theironyard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Article;
import com.theironyard.entities.User;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.h2.tools.Server;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.theironyard.services.ArticleRepository;
import com.theironyard.services.UserRepository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@RestController
public class LingoRestController {

    @Autowired
    UserRepository users;

    @Autowired
    ArticleRepository articles;

    @PostConstruct
    public void init() throws SQLException {
        Server.createWebServer().start();
    }


    @RequestMapping(path="/", method = RequestMethod.GET)
    public Iterable<User> findUser(){
        return users.findAll();
    }

    @PostConstruct
    public void scrapeAPIResults() throws IOException {

        String apiURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45";
        String returnedJson = apiRequest(apiURL);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readValue(returnedJson, JsonNode.class);

        JsonNode results = actualObj.get("results");

        ArrayList<Article> articleList = new ArrayList<>();


        for(JsonNode result : results){
            JsonNode title = result.findValue("title");
            JsonNode returnedURL = result.findValue("url");
            JsonNode author = result.findValue("byline");

            String urlCleaner = returnedURL.toString();
            urlCleaner = urlCleaner.substring(1,urlCleaner.length()-1);

            Document doc = Jsoup.connect(urlCleaner).get();
            String content = doc.select("p").text();
            content = content.substring(27, content.length());

            Article article = new Article(title.toString(),returnedURL.toString(), author.toString(), content.toString());
            if(article.getContent().length() > 25000){
                article.setContent(article.getContent().substring(0,24999));
                System.out.println("damn thats a big article");
            }

            System.out.println("TESTING THIS SHIT" +  article.toString());
            articles.save(article);
            System.out.println("TESTING THIS SHIT" +  article.toString());

        }

        System.out.println(articles.findOne(1).toString());

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

}

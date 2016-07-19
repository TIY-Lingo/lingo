package com.theironyard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import entities.Article;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.h2.tools.Server;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import services.ArticleRepository;
import services.UserRepository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@RestController
public class LingoRestController {

    @Autowired
    UserRepository users;

    @Autowired
    ArticleRepository articleRepo;

    @PostConstruct
    public void init() throws SQLException {
        Server.createWebServer().start();
    }

//    public void scrapeAPIResults() throws IOException {
//
//        String apiURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45";
//        String returnedJson = apiRequest(apiURL);
//
//        ObjectMapper mapper = new ObjectMapper();
//        JsonNode actualObj = mapper.readValue(returnedJson, JsonNode.class);
//
//        JsonNode results = actualObj.get("results");
//
//        ArrayList<Article> articleList = new ArrayList<>();
//
//
//        for(JsonNode result : results){
//            JsonNode title = result.findValue("title");
//            JsonNode returnedURL = result.findValue("url");
//            JsonNode author = result.findValue("byline");
//
//            String cleaner = returnedURL.toString();
//            cleaner = cleaner.substring(1,cleaner.length()-1);
//
//            Document doc = Jsoup.connect(cleaner).get();
//            String content = doc.select("p").text();
//            content = content.substring(27, content.length());
//
//            Article article = new Article(title.toString(),returnedURL.toString(), author.toString(), content);
//            articleRepo.save(article);
//            articleList.add(article);
//        }
//
//        System.out.println(articleRepo.findOne(1).toString());
//
//    }
//    public String apiRequest(String url) throws IOException {
//        OkHttpClient client = new OkHttpClient();
//        Request request = new Request.Builder()
//                .url(url)
//                .build();
//        try (Response response = client.newCall(request).execute()){
//            return response.body().string();
//
//        }
//    }
}

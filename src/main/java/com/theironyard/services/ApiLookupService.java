package com.theironyard.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.LingoRestController;
import com.theironyard.entities.Article;
import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.concurrent.Future;

@Service
public class ApiLookupService {

        RestTemplate restTemplate = new RestTemplate();

        @Async
        public Future<ResultContainter> findResults(String url) throws InterruptedException, IOException {
            System.out.println("Looking up " + url);
            ResultContainter results = restTemplate.getForObject(url, ResultContainter.class);
            // Artificial delay of 1s for demonstration purposes
            for (Results result: results.getResults()){
                System.out.println(result.getTitle());

//                String urlClean = returnedURL.toString();                 // The returned url has an extra set of "" that need to be removed before it can be used to get the article contents
//                urlClean = urlClean.substring(1, urlClean.length() - 1); // this line drops the extra quotes by dropping the first and last character of the string
//
//                Document doc = Jsoup.connect(urlClean).get();             // This scrapes the provided webpage and puts it in a document Object for use with Jsoup
//                String content = doc.select("p").text();                  // this line grabs only the content from the css paragraph tags
//                content = content.substring(27, content.length());
//
                Article article = new Article(result.getTitle(),result.getUrl(), result.getByline())

            }

            return new AsyncResult<>(results);
        }

 }


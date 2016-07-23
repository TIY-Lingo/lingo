package com.theironyard.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.LingoRestController;
import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
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
            System.out.println("temp");
            Thread.sleep(1000L);

//            String apiURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45";   // The Technology API url
//            String returnedJson = LingoRestController.apiRequest(apiURL);                        //setting the returned Json string to a String object for use.
//
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode fullJsonReturn = mapper.readValue(returnedJson, JsonNode.class);    //converts Json String into a Node for use with Jackson
//
//            JsonNode nodeResults = fullJsonReturn.get("results");
//            Results results = new Results(nodeResults.get("title").toString(),nodeResults.get("url").toString(), nodeResults.get("byline").toString());
            return new AsyncResult<>(results);
        }

 }


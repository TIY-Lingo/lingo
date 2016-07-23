package com.theironyard.services;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        public Future<Results> findResults(String url) throws InterruptedException, IOException {
            System.out.println("Looking up " + url);
            Results results = restTemplate.getForObject(url, Results.class);
            // Artificial delay of 1s for demonstration purposes
            System.out.println("temp");
            Thread.sleep(1000L);

            return new AsyncResult<Results>(results);
        }

 }


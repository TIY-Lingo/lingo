package com.theironyard.services;


import com.theironyard.entities.Results;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Future;

@Service
public class ApiLookupService {

        RestTemplate restTemplate = new RestTemplate();

        @Async
        public Future<Results> findResults(String url) throws InterruptedException {
            System.out.println("Looking up " + url);
            Results results = restTemplate.getForObject(url, Results.class);
            // Artificial delay of 1s for demonstration purposes
            Thread.sleep(1000L);
            return new AsyncResult<Results>(results);
        }
 }


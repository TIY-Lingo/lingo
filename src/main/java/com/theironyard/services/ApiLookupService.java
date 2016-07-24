package com.theironyard.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Article;
import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Random;
import java.util.concurrent.Future;

@Service
public class ApiLookupService {
        @Autowired
        ArticleRepository articles;

        @Autowired
        DictionaryRepository dictionaries;

        RestTemplate restTemplate = new RestTemplate();

        @Async
        public Future<ResultContainter> findResults(String url) throws InterruptedException, IOException {
            System.out.println("Parsing from: " + url);
            ResultContainter results = restTemplate.getForObject(url, ResultContainter.class);


            for (Results result: results.getResults()){
                Article article;

                if (articles.findByTitle(result.getTitle()) != null) {       // use the title to see if it's in the DB, if it's there move on, otherwise add it
                    continue;
                }else {
                    String returnedURL = result.getUrl();

                    Document doc = Jsoup.connect(returnedURL).get();             // This scrapes the provided webpage and puts it in a document Object for use with Jsoup
                    String content = doc.select("p").text();                     // this line grabs only the content from the css paragraph tags
                    content = content.substring(27, content.length());           //Chops off advertisement at the beginning of the article

                    if (content.length() >= 24999) {                               // if it's over 25k characters cut off anything extra...
                        content = content.substring(0, 24999);
                    }

                    article = new Article(result.getTitle(), result.getUrl(), result.getByline(), content, results.getSection());
                    articles.save(article);
                }
                langInjection(article, "french");
                langInjection(article, "spanish");
                System.out.println("article translation complete");
            }

            System.out.println( results.getSection() + " thread has completed...");
            return new AsyncResult<>(results);
        }

    public void langInjection(Article article, String language) {
        System.out.println("translation of: " + article.getTitle() +  " has begun");
        Random r = new Random();
        String contentPlaceholder = article.getContent();
        int count = 0;
        int failures = 0;
        while (count <= 20) {
            int seedValue = (1 + r.nextInt((int) dictionaries.count()-1));
            Object langPlaceholder;

            if(language.equals("spanish")){
                langPlaceholder = dictionaries.findOne(seedValue).getSpanish();
            }else{
                langPlaceholder = dictionaries.findOne(seedValue).getFrench();
            }
            if (contentPlaceholder.contains(dictionaries.findOne(seedValue).getEnglish())) {
                contentPlaceholder = contentPlaceholder.replace(dictionaries.findOne(seedValue).getEnglish(), "<span class=\'" + language + "\'>" + langPlaceholder + "</span>");
                count++;
            } else if (count == 5) {
                if (language.equals("spanish")) {
                    article.setSpan1(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 1 complete");
                } else if (language.equals("french")) {
                    article.setFrench1(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 1 complete");
                } else {
                    System.out.println("This should never happen, You have 2 options: spanish or french");
                }
            } else if (count == 10) {
                if (language.equals("spanish")) {
                    article.setSpan2(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 2 complete");
                } else if (language.equals("french")) {
                    article.setFrench2(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 2 complete");
                } else {
                    System.out.println("This should never happen, You have 2 options: spanish or french");
                }
            } else if (count == 15) {
                if (language.equals("spanish")) {
                    article.setSpan3(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 3 complete");
                    break;
                } else if (language.equals("french")) {
                    article.setFrench3(contentPlaceholder);
                    articles.save(article);
                    count++;
                    System.out.println("level 3 complete");
                    break;
                } else {
                    System.out.println("This should never happen, You have 2 options: spanish or french");
                }
            } else {
                failures++;
                if (failures > 500) {
                    if (language.equals("spanish")) {
                        if (count < 5) {
                            article.setSpan1(contentPlaceholder);
                            article.setSpan2(contentPlaceholder);
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println(" failed before level 1 complete");
                            break;
                        } else if (count > 10 && count <= 15) {
                            article.setSpan2(contentPlaceholder);
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println(" failed before level 2 complete");
                            break;
                        } else if (count > 15) {
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println(" failed before level 3 complete");
                            break;
                        }
                    } else if (language.equals("french")) {
                        if (count < 5) {
                            article.setFrench1(contentPlaceholder);
                            article.setFrench2(contentPlaceholder);
                            article.setFrench3(contentPlaceholder);
                            articles.save(article);
                            break;
                        } else if (count > 10 && count <= 15) {
                            article.setSpan2(contentPlaceholder);
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            break;
                        } else if (count > 15) {
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            break;
                        }
                    }
                }
            }

        }
    }
 }


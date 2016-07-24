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
                langInjection(article, "french");                               //Run it once for spanish and once for french
                langInjection(article, "spanish");
                System.out.println("Article translation complete");
            }

            System.out.println( results.getSection() + " thread has completed...");
            return new AsyncResult<>(results);
        }
    @Async
    public void langInjection(Article article, String language) {
        System.out.println("translation of: " + article.getTitle() +  " has begun in " + language);
        Random r = new Random();
        String contentPlaceholder = article.getContent();
        int count = 0;
        int failures = 0;
        while (count <= 60) {
            int seedValue = (1 + r.nextInt((int) dictionaries.count()-1));  //random number adjusted for no Zeros since our DB doesn't have an ID = 0;

            Object langPlaceholder;
            if(language.equals("spanish")){    //It sucks but this was needed to make the replacement work a few lines down.
                langPlaceholder = dictionaries.findOne(seedValue).getSpanish();
            }else{
                langPlaceholder = dictionaries.findOne(seedValue).getFrench();
            }

            if (contentPlaceholder.contains(dictionaries.findOne(seedValue).getEnglish())) {
                contentPlaceholder = contentPlaceholder.replace(dictionaries.findOne(seedValue).getEnglish(), "<span class=\'" + language + "\'>" + langPlaceholder + "</span>");
                count++;
            } else if (count == 15) {                   //if Level 1 count is hit, save it so if there is a failure it is not lost and continue rolling through the next levels
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
            } else if (count == 30) {                  //if Level 2 count is hit, save it so if there is a failure it is not lost and continue rolling through the next levels
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
            } else if (count == 60) {                    ////if Level 3 count is hit, save the content and kick out of the while loop
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
                if (failures > 12000) {                       //If there is a catastrophic failure save each level with whatever has been completed up to that point.
                    if (language.equals("spanish")) {         //They save along the way regardless so we only have to save the level based on where the Counter is at
                        if (count < 15) {
                            article.setSpan1(contentPlaceholder);
                            articles.save(article);
                            System.out.println("S failed before level 1 complete");
                            break;
                        } else if (count > 15 && count <= 30) {
                            article.setSpan2(contentPlaceholder);
                            articles.save(article);
                            System.out.println("S failed before level 2 complete");
                            break;
                        } else if (count > 30) {
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println("S failed before level 3 complete");
                            break;
                        }
                    } else if (language.equals("french")) {
                        if (count < 15) {
                            article.setFrench1(contentPlaceholder);
                            articles.save(article);
                            System.out.println("F failed before level 1 complete");
                            break;
                        } else if (count > 15 && count <= 30) {
                            article.setSpan2(contentPlaceholder);
                            articles.save(article);
                            System.out.println("F failed before level 2 complete");
                            break;
                        } else if (count > 30) {
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println("F failed before level 3 complete");
                            break;
                        }
                    }
                }
            }

        }
    }
 }


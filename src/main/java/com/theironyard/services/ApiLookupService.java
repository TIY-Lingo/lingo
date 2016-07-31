package com.theironyard.services;


import com.theironyard.entities.Article;
import com.theironyard.entities.Category;
import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Whitelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.Future;

@Service
public class ApiLookupService {
    @Autowired
    ArticleRepository articles;

    @Autowired
    DictionaryRepository dictionaries;
    @Autowired
    CategoryRepository categories;

    RestTemplate restTemplate = new RestTemplate();

    @Async
    public Future<ResultContainter> findResults(String url) throws InterruptedException, IOException {     //Method to find and scrape the articles
        System.out.println("Parsing from: " + url);
        ResultContainter results = restTemplate.getForObject(url, ResultContainter.class);


        for (Results result : results.getResults()) {
            Article article;

            if (articles.findByTitle(result.getTitle()) != null) {       // use the title to see if it's in the DB, if it's there move on, otherwise add it
                continue;
            } else {
                String returnedURL = result.getUrl();

                Document doc = Jsoup.connect(returnedURL).get();             // This scrapes the provided webpage and puts it in a document Object for use with Jsoup
                String content = doc.select("p").text();                     // this line grabs only the content from the css paragraph tags
                content = content.substring(27, content.length());           //Chops off advertisement at the beginning of the article

                if (content.length() >= 40000) {                               // if it's over 25k characters cut off anything extra...
                    content = content.substring(0, 35000);
                }
                String cleanContent = Jsoup.clean(content, Whitelist.basic());

                article = new Article(result.getTitle(), result.getUrl(), result.getByline(), cleanContent, results.getSection());
                article = articles.save(article);
                Category cat = categories.findByType(results.getSection());
                cat.getArticles().add(article);
                categories.save(cat);
            }
            langInjection(article, "french");                               //Run it once for spanish and once for french
            langInjection(article, "spanish");
            System.out.println("Article translation complete");
        }

        System.out.println(results.getSection() + " thread has completed...");

        return new AsyncResult<>(results);
    }


    String setHTML(String token, String translatedWord, String language) {

        String spanTag = "<span class=\"translated\" onMouseOver=\"this.innerHTML=$(this).attr('original-word')\" onMouseOut=\"this.innerHTML=$(this).attr('translated-word')\" original-word=\"%s\" translated-word=\"%s\">%s</span>";
//    original before adding JS - for reference    String spanTag = "<span class=\"translated\" onMouseOver=\"%s\" onMouseOut=\"%s\" original-word=\"%s\" translated-word=\"%s\">%s</span>";

        spanTag = String.format(spanTag, token, translatedWord, translatedWord);

        return spanTag;

    }

    @Async
    public void langInjection(Article article, String language) {
        System.out.println("translation of: " + article.getTitle() + " has begun in " + language);
        Random r = new Random();
        String contentPlaceholder = article.getContent();
        ArrayList<Integer> seedArray = new ArrayList<Integer>();
        int count = 0;
        while (count <= 60) {
            int seedValue = (1 +  r.nextInt((int) dictionaries.count()-2));  //random number adjusted for not to produce a zero since our DB doesn't have an ID = 0;
            if (!seedArray.contains(seedValue)) {                            //Check to make sure Seed Value is unique and hasn't been used already.
                seedArray.add(seedArray.size(), seedValue);
                Object langPlaceholder;

                if (language.equals("spanish")) {
                    langPlaceholder = dictionaries.findOne(seedValue).getSpanish();
                } else {
                    langPlaceholder = dictionaries.findOne(seedValue).getFrench();
                }

                if (contentPlaceholder.contains(dictionaries.findOne(seedValue).getEnglish())) {    // if the article  contains a given word - find and replace it with it's counterpart
                    String token = "$$" + langPlaceholder.toString();
                    String replaced = setHTML(token, langPlaceholder.toString(), language);                   //injects the proper html tags needed by the FEE to use a hover over animation
                    contentPlaceholder = contentPlaceholder.replace(dictionaries.findOne(seedValue).getEnglish(), replaced);// The first cycle replaces target word with a token word
                    contentPlaceholder = contentPlaceholder.replace(token, dictionaries.findOne(seedValue).getEnglish());   // second pass replaces the token with the proper translation -
                    count++;                                                                                                // we did this to avoid nesting of the span tag which popped up in rare cases
                    if (count == 15) {                   //if Level 1 count is hit, save it so if there is a failure it is not lost and continue rolling through the next levels
                        if (language.equals("spanish")) {
                            article.setSpan1(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 1 complete");
                        } else if (language.equals("french")) {
                            article.setFrench1(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 1 complete");
                        } else {
                            System.out.println("This should never happen, You have 2 options: spanish or french");
                        }
                    } else if (count == 30) {                  //if Level 2 count is hit, save it so if there is a failure it is not lost and continue rolling through the next levels
                        if (language.equals("spanish")) {
                            article.setSpan2(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 2 complete");
                        } else if (language.equals("french")) {
                            article.setFrench2(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 2 complete");
                        } else {
                            System.out.println("This should never happen, You have 2 options: spanish or french");
                        }
                    } else if (count == 60) {                    ////if Level 3 count is hit, save the content and kick out of the while loop
                        if (language.equals("spanish")) {
                            article.setSpan3(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 3 complete");
                            break;
                        } else if (language.equals("french")) {
                            article.setFrench3(contentPlaceholder);
                            articles.save(article);
                            System.out.println("level 3 complete");
                            break;
                        } else {
                            System.out.println("This should never happen, You have 2 options: spanish or french");
                        }
                    }
                } else {
                }

            } else if (seedArray.size() == dictionaries.count()-3) {
                if (language.equals("spanish")) {                        //They save along the way regardless so we only have to save the current level based on where the Counter is at
                    if (count <= 15) {
                        article.setSpan1(contentPlaceholder);
                        article.setSpan2(contentPlaceholder);
                        article.setSpan3(contentPlaceholder);
                        articles.save(article);
                        System.out.println("S failed before level 1 complete");
                        break;
                    } else if (count > 15 && count <= 30) {
                        article.setSpan2(contentPlaceholder);
                        article.setSpan3(contentPlaceholder);
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
                    if (count <= 15) {
                        article.setFrench1(contentPlaceholder);
                        article.setFrench2(contentPlaceholder);
                        article.setFrench3(contentPlaceholder);
                        articles.save(article);
                        System.out.println("French translation failed before level 1 complete");
                        break;
                    } else if (count > 15 && count <= 30) {
                        article.setFrench2(contentPlaceholder);
                        article.setFrench3(contentPlaceholder);
                        articles.save(article);
                        System.out.println("French translation failed before level 2 complete");
                        break;
                    } else if (count > 30) {
                        article.setFrench3(contentPlaceholder);
                        articles.save(article);
                        System.out.println("French translation failed before level 3 complete");
                        break;
                    }
                } else {
                    System.out.println("You should never get here");
                    break;
                }
            }
        }
    }
}


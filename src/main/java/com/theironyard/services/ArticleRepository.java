package com.theironyard.services;

import com.theironyard.entities.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<Article, Integer>{
    Article findByTitle(String title);
}

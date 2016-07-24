package com.theironyard.services;

import com.theironyard.entities.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Integer>{
    Article findByTitle(String title);
}

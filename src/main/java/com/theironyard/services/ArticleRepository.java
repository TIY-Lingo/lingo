package com.theironyard.services;

import com.theironyard.entities.Article;
import com.theironyard.entities.ReturnArticle;
import com.theironyard.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Integer>{
    Article findByTitle(String title);
    Article findById(int id);
}

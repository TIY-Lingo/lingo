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
//    Iterable<Article> findByType(String type);
//    ArrayList<Article> findArticleByType(String type);
//    Article findById(int Id);
//    Iterable<Article> findByUser(int userID);

//    @Query ("SELECT ca.CATEGORY_ID, a.Span1 FROM Article a " +
//            "INNER JOIN CATEGORY_ARTICLE ca ON ca.article_id = a.ID " +
//            "INNER JOIN USERS_CATEGORIES uc on uc.catlist_ID = ca.CATEGORY_ID " +
//            "WHERE uc.user_id = ?1 ")
//    Iterable<ReturnArticle> findByUserCatPref(int UserID);



}

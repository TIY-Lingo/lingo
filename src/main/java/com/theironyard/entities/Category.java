package com.theironyard.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by johncrooks on 7/25/16.
 */

@Entity(name = "categories")
public class Category {
    @Id
    @GeneratedValue
    int id;

    @NotNull
    String type;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "category_article", joinColumns =@JoinColumn(name="category_id"), inverseJoinColumns = @JoinColumn(name="article_id"))
    List<Article> articles;



    public Category() {
    }

    public int getId() {
        return id;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

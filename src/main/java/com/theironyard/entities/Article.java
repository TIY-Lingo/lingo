package com.theironyard.entities;

import javax.persistence.*;

@Entity
@Table(name = "articles" )
public class Article {
    @GeneratedValue
    @Id
    int id;

    @Column (nullable = false)
    String title;

    @Column (nullable = false)
    String articleUrl;

    @Column (nullable = false)
    String author;

    @Column (length = 25000, nullable = false)
    String content;


    public Article(String title, String articleUrl, String author, String content) {
        this.title = title;
        this.articleUrl = articleUrl;
        this.author = author;
        this.content = content;
    }

    public Article() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
    }

    @Override
    public String toString() {
        return "Article{" +
                "Author: '" + author + '\'' +
                ", Url: '" + articleUrl + '\'' +
                ", Title: '" + title + '\'' +
                ", Id: " + id +
                '}';
    }
}

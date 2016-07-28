package com.theironyard.entities;

import javax.persistence.*;
import java.util.ArrayList;

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

    @Column (length = 25000)
    String span1;

    @Column (length = 25000)
    String span2;

    @Column (length = 25000)
    String span3;

    @Column (length = 25000)
    String french1;

    @Column (length = 25000)
    String french2;

    @Column (length = 25000)
    String french3;

    @Column
    String type;

    public Article() {
    }

    public Article(String title, String articleUrl, String author, String content, String type) {
        this.title = title;
        this.articleUrl = articleUrl;
        this.author = author;
        this.content = content;
        this.type = type;
    }

    public Article(String title, String articleUrl, String author, String content) {
        this.title = title;
        this.articleUrl = articleUrl;
        this.author = author;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArticleUrl() {
        return articleUrl;
    }

    public void setArticleUrl(String articleUrl) {
        this.articleUrl = articleUrl;
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

    public String getSpan1() {
        return span1;
    }

    public void setSpan1(String span1) {
        this.span1 = span1;
    }

    public String getSpan2() {
        return span2;
    }

    public void setSpan2(String span2) {
        this.span2 = span2;
    }

    public String getSpan3() {
        return span3;
    }

    public void setSpan3(String span3) {
        this.span3 = span3;
    }

    public String getFrench1() {
        return french1;
    }

    public void setFrench1(String french1) {
        this.french1 = french1;
    }

    public String getFrench2() {
        return french2;
    }

    public void setFrench2(String french2) {
        this.french2 = french2;
    }

    public String getFrench3() {
        return french3;
    }

    public void setFrench3(String french3) {
        this.french3 = french3;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Article{" +
                "Author: '" + author + '\'' +
                ", Url: '" + articleUrl + '\'' +
                ", Title: '" + title + '\'' +
                ", Id: " + id + '\'' +
                ", Content: " + content +
                '}';
    }
}

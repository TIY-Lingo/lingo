package com.theironyard.entities;


public class ReturnArticle {
    int category_id;
    String span1;
    String title;
    String type;

    public ReturnArticle(int category_id, String span1, String title, String type) {
        this.category_id = category_id;
        this.span1 = span1;
        this.title = title;
        this.type = type;
    }

    public ReturnArticle(int category_id, String span1, String title) {
        this.category_id = category_id;
        this.span1 = span1;
        this.title = title;
    }

    public ReturnArticle(int category_id, String span1) {
        this.category_id = category_id;
        this.span1 = span1;
    }

    public ReturnArticle() {
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getSpan1() {
        return span1;
    }

    public void setSpan1(String span1) {
        this.span1 = span1;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

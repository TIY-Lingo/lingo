package com.theironyard.entities;


public class ReturnArticle {
    int category_id;
    String content;
    String title;
    String type;
    int articleId;

    public ReturnArticle(int category_id, String content, String title, String type, int articleId) {
        this.category_id = category_id;
        this.content = content;
        this.title = title;
        this.type = type;
        this.articleId = articleId;

    }

    public ReturnArticle(int category_id, String content) {
        this.category_id = category_id;
        this.content = content;
    }

    public ReturnArticle() {
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public int getArticleId() {
        return articleId;
    }

    public void setArticleId(int articleId) {
        this.articleId = articleId;
    }
}

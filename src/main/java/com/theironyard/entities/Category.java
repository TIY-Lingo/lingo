 package com.theironyard.entities;

        import javax.persistence.*;
        import java.util.ArrayList;
        import java.util.List;


 @Entity(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column (nullable = false)
    String type;

    @Column (nullable = false)
        int category_id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "category_article", joinColumns =@JoinColumn(name="category_id"), inverseJoinColumns = @JoinColumn(name="article_id"))
    List<Article> articles;


    public Category(String type, int category_id) {
        this.type = type;
        this.category_id = category_id;
    }

    public Category() {
    }

    public int getId() {
        return id;
    }

    public List<Article> getArticles() {
        return articles;
    }

//    public void setArticles(List<Article> articles) {
//        this.articles = articles;
//    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
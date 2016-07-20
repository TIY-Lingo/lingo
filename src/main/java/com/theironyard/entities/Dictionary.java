package com.theironyard.entities;

import javax.persistence.*;


@Entity
@Table(name = "dictionary")
public class Dictionary {
    @Id
    @GeneratedValue
    int id;

    @Column (nullable = false)
    String english;

    @Column (nullable = false)
    String french;

    @Column (nullable = false)
    String spanish;

    public Dictionary(String english, String french, String spanish) {
        this.english = english;
        this.french = french;
        this.spanish = spanish;
    }

    public Dictionary() {
    }

    public int getId() {
        return id;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getFrench() {
        return french;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public String getSpanish() {
        return spanish;
    }

    public void setSpanish(String spanish) {
        this.spanish = spanish;
    }
}

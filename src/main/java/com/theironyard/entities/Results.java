package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Results {
    String title;
    String url;
    String byline;

    public Results(String title, String url, String byline) {
        this.title = title;
        this.url = url;
        this.byline = byline;
    }

    public Results() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getByline() {
        return byline;
    }

    public void setByline(String byline) {
        this.byline = byline;
    }

    @Override
    public String toString() {
        return "Results{" +
                "title='" + title + '\'' +
                ", url='" + url + '\'' +
                ", byline='" + byline + '\'' +
                '}';
    }
}

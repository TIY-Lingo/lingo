package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultContainter {
    Results results;

    public ResultContainter(Results results) {
        this.results = results;
    }

    public ResultContainter() {
    }

    public Results getResults() {
        return results;
    }

    public void setResults(Results results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "ResultContainter{" +
                "results=" + results +
                '}';
    }
}

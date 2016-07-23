package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultContainter {
    ArrayList<Results> results;

    public ResultContainter(ArrayList<Results> results) {
        this.results = results;
    }

    public ResultContainter() {
    }

    public ArrayList<Results> getResults() {
        return results;
    }

    public void setResults(ArrayList<Results> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "ResultContainter{" +
                "results=" + results +
                '}';
    }
}

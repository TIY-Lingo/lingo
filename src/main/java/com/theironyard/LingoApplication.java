package com.theironyard;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Article;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.ArrayList;

import static com.theironyard.LingoRestController.articles;

@SpringBootApplication
public class LingoApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(LingoApplication.class, args);

	}
}

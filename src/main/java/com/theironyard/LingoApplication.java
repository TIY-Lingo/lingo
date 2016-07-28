package com.theironyard;

import com.theironyard.entities.Category;
import com.theironyard.entities.Dictionary;
import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import com.theironyard.services.ApiLookupService;
import com.theironyard.services.CategoryRepository;
import com.theironyard.services.DictionaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.concurrent.Future;


@SpringBootApplication
@EnableAsync
public class LingoApplication implements CommandLineRunner {

	@Autowired
	ApiLookupService apiLookupService;

	@Autowired
	DictionaryRepository dictionaries;

	@Autowired
	CategoryRepository categories;


	@Override
	public void run(String... args) throws Exception {
		long start = System.currentTimeMillis();
		// parseDictionary();

		Future<ResultContainter> page1 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page2 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page3 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page4 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page5 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/business.json?api-key=289858bf10514c09b02e561994f4ab45");



		System.out.println("Elapsed time: " + (System.currentTimeMillis() - start));
	} //end run method


	public void parseDictionary() throws FileNotFoundException {

		if(dictionaries.count() == 0) {
			File f = new File("Tri-Lingual-Library.csv");
			Scanner scanner = new Scanner(f);
			scanner.nextLine();
			while (scanner.hasNext()) {
				String[] arrayString = scanner.nextLine().split(",");
				Dictionary dictEntry = new Dictionary(arrayString[0], arrayString[1], arrayString[2]);
				dictionaries.save(dictEntry);
			}
			System.out.println("Language Dictionary has been created");//for console testing
		} else {
			System.out.println("Language Dictionary already exists");//for console testing
		}
	}
	public static void main(String[] args) throws IOException {
		SpringApplication.run(LingoApplication.class, args);
	}
}

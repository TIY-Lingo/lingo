package com.theironyard;

import com.theironyard.entities.ResultContainter;
import com.theironyard.entities.Results;
import com.theironyard.services.ApiLookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.IOException;
import java.util.concurrent.Future;


@SpringBootApplication
@EnableAsync
public class LingoApplication implements CommandLineRunner {

	@Autowired
	ApiLookupService apiLookupService;

	@Override
	public void run(String... args) throws Exception {
		long start = System.currentTimeMillis();

		Future<ResultContainter> page1 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page2 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=289858bf10514c09b02e561994f4ab45");
		Future<ResultContainter> page3 = apiLookupService.findResults("https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=289858bf10514c09b02e561994f4ab45");

//		while (!(page1.isDone() && page2.isDone() && page3.isDone())) {
//			Thread.sleep(10); //10-millisecond pause between each check
//		}

		// Print results, including elapsed time
		System.out.println("Elapsed time: " + (System.currentTimeMillis() - start));
		System.out.println(page1.get().getResults().get(0).getTitle());
		System.out.println(page2.get().getResults().get(0).getTitle());
		System.out.println(page3.get().getResults().get(0).getTitle());

	} //end run method

	public static void main(String[] args) throws IOException {
		SpringApplication.run(LingoApplication.class, args);

	}


}

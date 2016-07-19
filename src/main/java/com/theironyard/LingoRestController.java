package com.theironyard;

import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import services.ArticleRepository;
import services.UserRepository;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

@RestController
public class LingoRestController {

    @Autowired
    UserRepository users;

    @Autowired
    ArticleRepository articles;

    @PostConstruct
    public void init() throws SQLException {
        Server.createWebServer().start();
    }
}

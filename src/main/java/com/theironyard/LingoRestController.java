package com.theironyard;

import entities.User;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import services.ArticleRepository;
import services.UserRepository;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
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

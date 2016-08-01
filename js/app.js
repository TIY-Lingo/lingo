let app = angular.module('lingo', ['ngRoute', 'ngSanitize']);

require('./controllers/UserController')(app);
require('./controllers/NewsController')(app);
require('./controllers/ListViewController')(app);
require('./services/NewsService')(app);
require('./services/UserService')(app);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home',
        })
        .when('/home', {
            templateUrl: 'templates/homePage.html',
        })
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'templates/login.html',
        })
        // .when('/register', {
        //     controller: 'UserController',
        //     templateUrl: 'templates/registerUser.html',
        // })
        .when('/preferences', {
            controller: 'UserController',
            templateUrl: 'templates/preferences.html',
        })
        .when('/team', {
            controller: 'UserController',
            templateUrl: 'templates/teamBios.html',
        })
        .when('/news', {
            controller: 'NewsController',
            templateUrl: 'templates/articles.html',
        })
        .when('/news/list', {
            controller: 'ListViewController',
            templateUrl: 'templates/listview.html',
        })
        .when('/news/politics', {
            controller: 'NewsController',
            templateUrl: 'templates/politics.html',
        })

}]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// module.exports = function(app) {
//     app.controller('NewsController', ['NewsService','UserService' '$scope', '$location', function(NewsService,UserService, $scope, $location) {
//
//     }]);
// }

},{}],2:[function(require,module,exports){
// module.exports = function(app) {
//     app.controller('UserController', ['UserService' '$scope', '$location', function(UserService, $scope, $location) {
//
//     }]);
// }

},{}],3:[function(require,module,exports){
let app = angular.module('lingo', ['ngRoute']);
require('./controllers/UserController')(app);
require('./controllers/NewsController')(app);
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
        .when('/register', {
            controller: 'UserController',
            templateUrl: 'templates/registerUser.html',
        })
        .when('/preferences', {
            controller: 'UserController',
            templateUrl: 'templates/preferences.html',
        })
        .when('/team', {
            templateUrl: 'templates/teamBios.html',
        })
        .when('/news', {
            controller: 'NewsController',
            templateUrl: 'templates/articles.html',
        })
}]);

},{"./controllers/NewsController":1,"./controllers/UserController":2,"./services/NewsService":4,"./services/UserService":5}],4:[function(require,module,exports){
module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {

    }]);
};

},{}],5:[function(require,module,exports){
module.exports = function(app) {

    app.factory('UserService', ['$http', function($http) {

    }]);
};

},{}]},{},[3])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
    app.controller('NewsController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
      $scope.newsArray = NewsService.getNewsRequest();
      console.log($scope.newsArray);
    }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('UserController', ['UserService','$scope', '$location', function(UserService, $scope, $location) {
          $scope.userInput = '';
          $scope.userPassword = '';

          $scope.userPrefObj = {
            language: 'spanish',
            business: $scope.business,
            sports: $scope.sports,
            politics: $scope.politics,
            technology: $scope.technology,
            arts: $scope.arts,
          };

            $scope.signIn = function() {
                console.log("clicked log in");
                UserService.postUserInfo($scope.username)
                console.log('clicked')
                if ($scope.username != null) {
                    $location.path('/home');
                } else {
                    alert('Please enter a username');
                }
            }

            $scope.signUp = function() {
                console.log("clicked log in");
                UserService.postUserInfo($scope.userInput, $scope.userPassword)
                // if ($scope.username != null) {
                    // $location.path('/home');
                // } else {
                //     alert('Please enter a username');
                // }
            }

            $scope.pref = function(technology) {
              console.log('tech');

              UserService.createPreferences(updatedPref);
            }
            // $scope.politics = function() {
            //   console.log('tech');
            //
            // }
            // $scope.arts = function() {
            //   console.log('tech');
            //
            // }
            // $scope.sports = function() {
            //   console.log('tech');
            //
            // }
            // $scope.business = function() {
            //   console.log('tech');
            //
            // }
        }
    ]);
}

},{}],3:[function(require,module,exports){
let app = angular.module('lingo', ['ngRoute', 'ngSanitize']);

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
}]);

},{"./controllers/NewsController":1,"./controllers/UserController":2,"./services/NewsService":4,"./services/UserService":5}],4:[function(require,module,exports){
module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {
      let newsArray = [];

      $http({
          method: 'GET',
          url: '/articles',
      }).then(function(response) {
          let newsObject = response.data;
          angular.copy(newsObject, newsArray)
          console.log("object with news", newsArray);

      });

      return {
          getNewsRequest: function() {
              return newsArray;
          }
      }
    }]);
};

},{}],5:[function(require,module,exports){
module.exports = function(app) {

        app.factory('UserService', ['$http', function($http) {
          // let currentUser= {};
                ////signIn() click event to post username and password to server//////
                return {
                    postUserInfo: function(name,pw) {
                        $http({
                            url: '/registerUser',
                            method: 'POST',
                            data: {
                                username: name,
                                password: pw,
                            },
                        }).then(function(results) {
                            console.log("posted")
                            // if(response.data.isArtist === true){
                            //   $location.path('/artist');
                            //   angular.copy(response.data, currentUser )
                            //   console.log(currentUser);
                            // }

                            // angular.copy(response.data, currentUser);
                            // console.log(currentUser);

                        });
                      },
                      // user preferences
                      createPreferences: function(updatedPref) {
                          // userPref = pref;
                          // console.log(userPref);

                          $http({
                              method: 'POST',
                              url: '/preferences',
                              data: updatedPref
                          }).then(function(response) {
                              let userPrefObject = response.data;
                              console.log("object with user preferences", userPrefObject);
                              // if (userPrefObject === prefCategory.technology) {
                                // angular.copy(prefCategory.technology, userPrefObject)
                              // }
                          });
                      },
                      sendPrefInfo: function() {
                          return userPref;
                      },
                      getCurrentUser: function() {
                            console.log("user info", currentUser);
                            return userPrefObject
                          },

                    }

                }]);
              }

},{}]},{},[3])
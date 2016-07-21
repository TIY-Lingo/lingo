(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
    app.controller('NewsController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 2;
        $scope.newsArray = NewsService.getNewsRequest();

        $scope.goback = function() {
            $scope.pageNumber = $scope.pageNumber - 1;
            $scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage)
        }
        $scope.goforward = function() {
            $scope.pageNumber = $scope.pageNumber + 1;
            $scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage);
        }

        $scope.newsArray = NewsService.getNewsRequest();
        console.log($scope.newsArray);
    }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('UserController', ['UserService','$scope', '$location', function(UserService, $scope, $location) {
          $scope.userInput = '';
          $scope.userPassword = '';
<<<<<<< HEAD

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
=======
>>>>>>> 7d7bd9ebfb8b1304eddc7dc9563eb8e9abe99c06

            $scope.signIn = function() {
                console.log("clicked log in");
                UserService.postExistingUser($scope.userInput, $scope.userPassword)
            }

            $scope.signUp = function() {
                console.log("clicked sign up");
                UserService.postUserInfo($scope.userInput, $scope.userPassword)
                // $location.path('/preferences');
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

        app.factory('UserService', ['$http', '$location', function($http, $location) {
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
                            console.log("these are the results", results.data);
                            console.log("posted new user")
                            if (results.data === false) {
                              alert("This Username is taken. If you already have an account, please sign in, if not, please choose another Username")
                            } else {
                              $location.path('/preferences');
                            }

                            // if(response.data.business === true || response.data.technology === true || response.data.business === true ){
                            //   $location.path('/artist');
                            //   angular.copy(response.data, currentUser )
                            //   console.log(currentUser);
                            // }

                            // angular.copy(response.data, currentUser);
                            // console.log(currentUser);

                        });
                      },
<<<<<<< HEAD
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
=======
                      postExistingUser: function(username, password) {
                          $http({
                              url: '/login',
                              method: 'POST',

                              data: {
                                  username: username,
                                  password: password,
                              },
                          }).then(function(results) {
                              console.log("these are the results", results.data);
                              console.log("posted existing user")
                              if (results.data === true) {
                                  $location.path('/news');
                              } else {
                                alert("Password Incorrect")
                              }
                              // if(response.data.business === true || response.data.technology === true || response.data.business === true ){
                              //   $location.path('/artist');
                              //   angular.copy(response.data, currentUser )
                              //   console.log(currentUser);
                              // }

                              // angular.copy(response.data, currentUser);
                              // console.log(currentUser);

                          });
                        }
                    };


                    // createPreferences: function(pref) {
                    //     userPref = pref;
                    //     console.log(userPref);
                    //
                    //     $http({
                    //         method: 'POST',
                    //         url: '/preferences',
                    //         data: {
                    //             language: 'spanish',
                    //             business: false,
                    //             sports: false,
                    //             politics: false,
                    //             technology: false,
                    //             arts: false,
                    //         }
                    //     }).then(function(response) {
                    //         let userPrefObject = response.data;
                    //         console.log("object with user preferences", userPrefObject);
                    //     });
                    // }

                    return {
                        // sendPrefInfo: function() {
                        //     return userPref;
                        // },
                        // getCurrentUser: function() {
                            //   console.log("user info", currentUser);
                            //   return currentUser
                            // },
>>>>>>> 7d7bd9ebfb8b1304eddc7dc9563eb8e9abe99c06

                    }

                }]);
              }

},{}]},{},[3])
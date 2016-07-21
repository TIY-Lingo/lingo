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
          //
          $scope.UserPrefences = {
            language: 'spanish',
            business: $scope.business,
            sports: $scope.sports,
            politics: $scope.politics,
            technology: $scope.technology,
            arts: $scope.arts,
          };

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
            //when controller loads, we get our user Preference object from the server;
            // $scope.UserPrefences = UserService.getPreferences();


            //this saves our object to the server with our current values that changed on our model
            $scope.logObj = function(){
              UserService.updatePreferences($scope.UserPrefences);
            };


            //these toggle and change our values of our user preference model/object
            $scope.turnOffTech = function(){
              $scope.UserPrefences.technology = false;
            };

            $scope.turnOnTech = function(){
              $scope.UserPrefences.technology = true;
            };
            $scope.turnOffBus = function(){
              $scope.UserPrefences.business = false;
            };

            $scope.turnOnBus = function(){
              $scope.UserPrefences.business = true;
            };

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
        var userPref = {};

        ////signIn() click event to post username and password to server//////
        return {
            postUserInfo: function(name, pw) {
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
            },
            // UPDATE user preferences
            updatePreferences: function() {
                $http({
                    method: 'POST',
                    url: '/preferences',
                    data: {},
                    // {
                    //   language: 'spanish',
                    //   business: false,
                    //   sports: false,
                    //   politics: false,
                    //   technology: false,
                    //   arts: false,
                    // }
                }).then(function(response) {
                    console.log("OK!");
                });
            },
            // GET user preferences
            // getPreferences: function(){
            //       $http({
            //         method: 'GET',
            //         url:'/'
            //       }).then(function(response){
            //         //copies the response object from the data base to our userPref object/model
            //         angular.copy(response.data[0], userPref);
            //       })
            //       return userPref
            //     }




            // updatePreferences: function(updatedPref) {
            //     $http({
            //         method: 'POST',
            //         url: '/preferences',
            //         data: updatedPref
            //     }).then(function(response) {
            //         let userPrefObject = response.data;
            //         console.log("updated user preferences", userPrefObject);
            //         // if (userPrefObject === prefCategory.technology) {
            //           // angular.copy(prefCategory.technology, userPrefObject)
            //         // }
            //     });
            // },
            // getPreferences: function() {
            //     $http({
            //         method: 'GET',
            //         url: '/preferences'
            //     }).then(function(response) {
            //         console.log("got user preferences");
            //         angular.copy(response.data[0], userPref);
            //     });
            //     return userPref;
            // },

        };

    }]);
}

},{}]},{},[3])
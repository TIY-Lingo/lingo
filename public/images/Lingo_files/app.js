(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 25;

        $scope.specificPref = UserService.getPreferences();


        var getArts = function() {
            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });
        }

        getArts();

        console.log($scope.newsArray)

        $scope.goback = function() {

            $scope.pageNumber -= 1;
            $scope.itemsPerPage = 25;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }
        $scope.goforward = function() {

            $scope.pageNumber += 1;
            $scope.itemsPerPage = 25;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }

        $scope.signOut = function() {
            NewsService.signOutUser();
        };

        $scope.selectedArticle = function() {
          $scope.newsArray.map(function (element){
            for (var i = 0; i < newsArray.length; i ++){
              if (newsArray[i] === $scope.newsArray.title){
                getArts();
              }
      }
    })
      }



    }]);
}

},{}],2:[function(require,module,exports){
module.exports = function(app) {
    app.controller('NewsController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;
        let prefArray = {};

        // $scope.articleArray = NewsService.async();
        // console.log("this is the article array", $scope.articleArray);
        let getCats = function() {
          NewsService.async().then(function (categoryArray) {
            $scope.articleArray = categoryArray;
            console.log(categoryArray);
          })
        }
        getCats();

        $scope.specificPref = UserService.getPreferences();

        var getArts = function(){
          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
              $scope.newsArray = newsArray;
          });
        }

        getArts();


        $scope.goback = function() {

            $scope.pageNumber -= 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }
        $scope.goforward = function() {

            $scope.pageNumber += 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }

        $scope.signOut = function() {
            NewsService.signOutUser();
        };

        $scope.clickedFullArticle = function(){

        };
        $scope.clickedListView = function(){

        };
    }]);
}

},{}],3:[function(require,module,exports){
module.exports = function(app) {
    app.controller('UserController', ['UserService','$scope', '$location', function(UserService, $scope, $location) {
          $scope.userInput = '';
          $scope.userPassword = '';

          // $scope.UserPreferences = {
          //   language: 'spanish',
          //   technology: false,
          //   sports: false,
          //   business: true,
          //   politics: false,
          //   arts: true
          // };

          $scope.UserPreferences = UserService.getPreferences();


// WORKING CODE
            $scope.signIn = function() {
                console.log("clicked log in", $scope.UserPreferences);
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
////END WORKING CODE
            // $scope.signOut = function (){
            //   console.log("clicked logout");
            //   UserService.signOutUser();
            // }

            //when controller loads, we get our user Preference object from the server;
            // $scope.UserPreferences = UserService.getPreferences();


            //this saves our object to the server with our current values that changed on our model
            $scope.savePref = function(){
              UserService.updatePreferences($scope.UserPreferences);
              console.log('saving preferences', $scope.UserPreferences);
              $location.path('/news');
            };
           //these toggle and change our values of our user preference model/object
            // TOGGLE ON AND OFF TECHNOLOGY PREFERENCE
            $scope.turnOffTech = function(){
              $scope.UserPreferences.technology = false;
            };
            $scope.turnOnTech = function(){
              $scope.UserPreferences.technology = true;
            };
            // TOGGLE ON AND OFF BUSINESS PREFERENCE
            $scope.turnOffBus = function(){
              $scope.UserPreferences.business = false;
            };
            $scope.turnOnBus = function(){
              $scope.UserPreferences.business = true;
            };
            // TOGGLE ON AND OFF POLITICS PREFERENCE
            $scope.turnOffPol = function(){
              $scope.UserPreferences.politics = false;
            };
            $scope.turnOnPol = function(){
              $scope.UserPreferences.politics = true;
            };
            // TOGGLE ON AND OFF ARTS PREFERENCE
            $scope.turnOffArts = function(){
              $scope.UserPreferences.arts = false;
            };
            $scope.turnOnArts = function(){
              $scope.UserPreferences.arts = true;
            };
            // TOGGLE ON AND OFF SPORTS PREFERENCE
            $scope.turnOffSports = function(){
              $scope.UserPreferences.sports = false;
            };
            $scope.turnOnSports = function(){
              $scope.UserPreferences.sports = true;
            };
        }
    ]);
}

},{}],4:[function(require,module,exports){
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

}]);

},{"./controllers/ListViewController":1,"./controllers/NewsController":2,"./controllers/UserController":3,"./services/NewsService":5,"./services/UserService":6}],5:[function(require,module,exports){
module.exports = function(app) {

    app.factory('NewsService', ['$http', '$location', function($http, $location) {
        let categoryArray = [];

        var newsArray = {
            async: function(pageNum, perPage) {

                var promise = $http({
                    method: 'GET',
                    url: '/articles',
                }).then(function(response) {
                    let allTheArticles = response.data;
                    angular.copy(allTheArticles, categoryArray);
                    console.log(categoryArray);
                    // let start = (pageNum + 1) * perPage;
                    //
                    // return response.data.slice(start, start + perPage);
                    return categoryArray;
                });
                return promise;
            },

            //////SIGN OUT FUNCTION//////
            signOutUser: function() {

                    $http({
                            url: '/logout',
                            method: 'POST',
                            data: {
                                username: 'Winnie'
                            }
                        })
                        .then(function(results) {
                            // $location('#/home')
                        });
                }
                //////SIGN OUT FUNCTION/////////


        };
        return newsArray;
    }]);
};

},{}],6:[function(require,module,exports){
module.exports = function(app) {

    app.factory('UserService', ['$http', '$location', function($http, $location) {
        var userPref = {};

        var updatedStuff = {};
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
            updatePreferences: function(userPref) {
              console.log(userPref);
                $http({
                    method: 'POST',
                    url: '/preferences',
                    data: userPref
                }).then(function(response) {
                    console.log("posted preferences");
                });
            },
            // GET user preferences
            getPreferences: function(updatedStuff){
                  $http({
                    method: 'GET',
                    url:'/preferences',
                    data: updatedStuff,
                  }).then(function(response){
                    console.log("this is the response from getPreferences", response);
                    //copies the response object from the data base to our userPref object/model
                    angular.copy(response.data, userPref);
                    console.log('getting user preferences:', userPref);
                  })
                  return userPref
                }
        };

    }]);
}

},{}]},{},[4])
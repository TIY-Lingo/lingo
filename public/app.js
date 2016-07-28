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

        console.log('this is the news array:', $scope.newsArray)

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

        $scope.selectedArticle = function(id) {

          console.log("id is: ", id);


          // Go to server and get article (id)
          // return article content

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
            // console.log(categoryArray);
          })
        }
        getCats();

        $scope.specificPref = UserService.getPreferences();

        var getArts = function(){
          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
              $scope.newsArray = newsArray;
              console.log($scope.newsArray);
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
    app.controller('UserController', ['UserService', '$scope', '$location', function(UserService, $scope, $location) {
        $scope.userInput = '';
        $scope.userPassword = '';

        $scope.UserPrefences = UserService.getPreferences();

        $scope.signIn = function() {
            console.log("clicked log in", $scope.UserPrefences);
            UserService.postExistingUser($scope.userInput, $scope.userPassword)
        }

        $scope.signUp = function() {
            // console.log("clicked sign up");
            UserService.postUserInfo($scope.userInput, $scope.userPassword)

        }

        //when controller loads, we get our user Preference object from the server;
        //this saves our object to the server with our current values that changed on our model
        $scope.savePref = function() {
            console.log('saving saving saving Technology is: ', $scope.UserPrefences.technology);
            UserService.updatePreferences($scope.UserPrefences).then(function(result) {
                console.log("result > updatePreferences", result);
                //$scope.UserPrefences = UserService.getPreferences();
                console.log('saved saved saved Technology is: ', $scope.UserPrefences.technology);
            });
            //console.log('saving preferencesss:', $scope.UserPrefences);
            //$location.path('/news');
        };

        //these toggle and change our values of our user preference model/object

        // TOGGLE spanish
        $scope.setSpanish = function() {
            console.log("Your lengua es Espanol");
            $scope.UserPrefences.language = "spanish";
        };
        // TOGGLE FRENCH
        $scope.setFrench = function() {
            console.log("Wee wee!!!!");
            $scope.UserPrefences.language = "french";
        };
        // TOGGLE ON AND OFF TECHNOLOGY PREFERENCE
        $scope.toggleTechnology = function(value) {
            console.log("Tech is: ", value);
            $scope.UserPrefences.technology = value;
        };
        // TOGGLE ON AND OFF BUSINESS PREFERENCE
        $scope.toggleBusiness = function(value) {
            console.log("Busy-ness is: ", value);
            $scope.UserPrefences.business = value;
        };
        // TOGGLE ON AND OFF POLITICS PREFERENCE
        $scope.togglePolitics = function(value) {
            console.log("Politics is: ", value);
            $scope.UserPrefences.politics = value;
        };
        // TOGGLE ON AND OFF ARTS PREFERENCE
        $scope.toggleArts = function(value) {
            console.log("Arts is: ", value);
            $scope.UserPrefences.arts = value;
        };
        // TOGGLE ON AND OFF SPORTS PREFERENCE
        $scope.toggleSports = function(value) {
            console.log("Sports is: ", value);
            $scope.UserPrefences.sports = value;
        };
    }]);
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
        .when('/news/{articleId}', {
            controller: 'ListViewController',
            templateUrl: 'templates/articles.html',
        })

}]);

},{"./controllers/ListViewController":1,"./controllers/NewsController":2,"./controllers/UserController":3,"./services/NewsService":5,"./services/UserService":6}],5:[function(require,module,exports){
module.exports = function(app) {

   app.factory('NewsService', ['UserService', '$http', '$location', function(UserService, $http, $location) {

     let personLoggedIn = UserService.getPreferences();
     let userSpecificArticles = [];
     let artsArticles= [];
     let sportsArticles= [];
     let politicsArticles= [];
     let businessArticles=[];
     let technologyArticles = [];

     var  newsArray = {
       async: function(pageNum, perPage) {

           var promise = $http({
               method: 'GET',
               url: '/articles',
           }).then(function(response) {
              let newsArrayResponse = response.data;
               newsArrayResponse.filter(function (element){
                 if (element.type === "arts" && personLoggedIn.arts === true) {
                   userSpecificArticles.push(element);
                   artsArticles.push(element);
                 } else if (element.type === "sports" && personLoggedIn.sports === true) {
                   userSpecificArticles.push(element);
                   sportsArticles.push(element);
                 } else if (element.type === "business" && personLoggedIn.business === true) {
                   userSpecificArticles.push(element);
                   businessArticles.push(element);
                 } else if (element.type === "politics" && personLoggedIn.politics === true) {
                   userSpecificArticles.push(element);
                   politicsArticles.push(element);
                 } else if (element.type === "technology" && personLoggedIn.technology === true){
                   userSpecificArticles.push(element);
                   technologyArticles.push(element);
                 }

               })


               let start = (pageNum + 1) * perPage;

               return response.data.slice(start, start + perPage);

           });
         return promise;
       },

       //////SIGN OUT FUNCTION//////
                   signOutUser: function(){

                     $http({
                         url: '/logout',
                         method: 'POST',
                         data: {username: 'Winnie'}
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
                    // console.log("these are the results", results.data);
                    // console.log("posted new user")
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
                    // console.log("these are the results", results.data);
                    // console.log("posted existing user")
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
              // console.log('this is user pref', userPref);
                var promise = $http({
                    method: 'POST',
                    url: '/preferences',
                    data: userPref
                }).then(function(response) {
                    console.log("posted preferences", response);
                    return response;
                });
                return promise;

            },
            // GET user preferences
            getPreferences: function(updatedStuff){
                  $http({
                    method: 'GET',
                    url:'/preferences',
                    data: updatedStuff,
                  }).then(function(response){
                    console.log("response", response);
                    // console.log("this is the response from getPreferences", response);
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
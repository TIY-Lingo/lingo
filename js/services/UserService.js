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

                    }
                }]);
        };

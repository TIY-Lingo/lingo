module.exports = function(app) {

        app.factory('UserService', ['$http', '$location', function($http, $location) {
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
                              console.log("posted existing user")
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

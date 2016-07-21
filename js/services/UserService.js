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

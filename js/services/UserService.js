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

                });
            },
// //////WORKING ON SIGN OUT FUNCTION//////
//             signOutUser: function(){
//               $http({
//                   url: '/logout',
//                   method: 'POST',
//                   //
//                   // data: {
//                   //     username: username,
//                   // },
//               }).then(function(results) {
//                   console.log("signed out the user");
//               });
//             },
// //////END WORKING ON SIGN OUT FUNCTION/////////

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

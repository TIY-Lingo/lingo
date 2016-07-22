module.exports = function(app) {
    app.controller('UserController', ['UserService','$scope', '$location', function(UserService, $scope, $location) {
          $scope.userInput = '';
          $scope.userPassword = '';

          $scope.UserPrefences = {
            language: 'spanish',
            technology: false,
            sports: false,
            business: false,
            politics: false,
            arts: false
          };

// WORKING CODE
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
////END WORKING CODE
            // $scope.signOut = function (){
            //   console.log("clicked logout");
            //   UserService.signOutUser();
            // }

            //when controller loads, we get our user Preference object from the server;
            // $scope.UserPrefences = UserService.getPreferences();


            //this saves our object to the server with our current values that changed on our model
            $scope.savePref = function(){
              UserService.updatePreferences($scope.UserPrefences);
              console.log('saving preferences');
              $location.path('/news');
            };
           //these toggle and change our values of our user preference model/object
            // TOGGLE ON AND OFF TECHNOLOGY PREFERENCE
            $scope.turnOffTech = function(){
              $scope.UserPrefences.technology = false;
            };
            $scope.turnOnTech = function(){
              $scope.UserPrefences.technology = true;
            };
            // TOGGLE ON AND OFF BUSINESS PREFERENCE
            $scope.turnOffBus = function(){
              $scope.UserPrefences.business = false;
            };
            $scope.turnOnBus = function(){
              $scope.UserPrefences.business = true;
            };
            // TOGGLE ON AND OFF POLITICS PREFERENCE
            $scope.turnOffPol = function(){
              $scope.UserPrefences.politics = false;
            };
            $scope.turnOnPol = function(){
              $scope.UserPrefences.politics = true;
            };
            // TOGGLE ON AND OFF ARTS PREFERENCE
            $scope.turnOffArts = function(){
              $scope.UserPrefences.arts = false;
            };
            $scope.turnOnArts = function(){
              $scope.UserPrefences.arts = true;
            };
            // TOGGLE ON AND OFF SPORTS PREFERENCE
            $scope.turnOffSports = function(){
              $scope.UserPrefences.sports = false;
            };
            $scope.turnOnSports = function(){
              $scope.UserPrefences.sports = true;
            };
        }
    ]);
}

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

module.exports = function(app) {
    app.controller('UserController', ['UserService','$scope', '$location', function(UserService, $scope, $location) {
          $scope.userInput = '';
          $scope.userPassword = '';

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

            $scope.signUp = function() {
                console.log("clicked log in");
                UserService.postUserInfo($scope.userInput, $scope.userPassword)
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

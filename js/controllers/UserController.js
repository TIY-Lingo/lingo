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

        // SPANISH LANGUAGE DIFFICULTY
        $scope.toggleSpanishEasyLevel = function() {
          $scope.UserPrefences.langLevel = 'span1';
          $scope.UserPrefences.language = "spanish";
          console.log('spanish is:', $scope.UserPrefences.langLevel);
          console.log('Your lengua es Espanol');
        };
        $scope.toggleSpanishMediumLevel = function() {
          $scope.UserPrefences.langLevel = 'span2';
          $scope.UserPrefences.language = "spanish";
          console.log('spanish is:', $scope.UserPrefences.langLevel);
          console.log('Your lengua es Espanol');
        };
        $scope.toggleSpanishHardLevel = function() {
          $scope.UserPrefences.langLevel = 'span3';
          $scope.UserPrefences.language = "spanish";
          console.log('spanish is:', $scope.UserPrefences.langLevel);
          console.log('Your lengua es Espanol');
        };

        // FRENCH LANGUAGE DIFFICULTY
        $scope.toggleFrenchEasyLevel = function() {
          $scope.UserPrefences.langLevel = 'french1';
          $scope.UserPrefences.language = "french"
          console.log('french is:', $scope.UserPrefences.langLevel);
          console.log("Wee wee!!!!");
        };
        $scope.toggleFrenchMediumLevel = function() {
          $scope.UserPrefences.language = "french"
          $scope.UserPrefences.langLevel = 'french2';
          console.log('french is:', $scope.UserPrefences.langLevel);
          console.log("Wee wee!!!!");
        };
        $scope.toggleFrenchHardLevel = function() {
          $scope.UserPrefences.language = "french"
          $scope.UserPrefences.langLevel = 'french3';
          console.log('french is:', $scope.UserPrefences.langLevel);
          console.log("Wee wee!!!!");
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
        //when controller loads, we get our user Preference object from the server;
        //this saves our object to the server with our current values that changed on our model
        $scope.savePref = function() {
            // console.log('saving saving saving Technology is: ', $scope.UserPrefences.technology);
            UserService.updatePreferences($scope.UserPrefences).then(function(result) {
                // console.log("result > updatePreferences", result);
                $scope.UserPrefences = UserService.getPreferences();
                // console.log('saved saved saved Technology is: ', $scope.UserPrefences.technology);
            });
            //console.log('saving preferencesss:', $scope.UserPrefences);
        };
    }]);
}

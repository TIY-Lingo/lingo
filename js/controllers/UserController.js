module.exports = function(app) {
    app.controller('UserController', ['UserService',
        '$scope', '$location',
        function(UserService, $scope, $location) {

            $scope.signIn = function() {
                UserService.postUserInfo($scope.username)
                console.log('clicked')
                if ($scope.username != null) {
                    $location.path('/home');
                } else {
                    alert('Please enter a username');
                }
            }

            $scope.meetTheTeam = function() {
                $location.path('/team');
            }
        }
    ]);
}

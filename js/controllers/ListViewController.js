module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 25;

        $scope.specificPref = UserService.getPreferences();

        $scope.getId = NewsService.allTheArticles;


        var getArts = function() {
            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });
        }

        getArts();


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


        // click headline and display full article associated w/ that headline///

        $scope.clickedHeadline = function() {
            // console.log("this is the id", $scope.getId);
        }



    }]);
}

module.exports = function(app) {
    app.controller('NewsController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;
        let prefArray = {};


          $scope.specificPref = UserService.getPreferences();



        var getArts = function(){
          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
              $scope.newsArray = newsArray;
          });
        }

        getArts();



        console.log($scope.newsArray)

        $scope.goback = function() {

            $scope.pageNumber -= 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }
        $scope.goforward = function() {

            $scope.pageNumber += 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }

        $scope.signOut = function() {
            NewsService.signOutUser();
        };

        $scope.clickedFullArticle = function(){

        };
        $scope.clickedListView = function(){

        };
    }]);
}

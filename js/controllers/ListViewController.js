module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;



        var getArts = function(){
          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
              $scope.newsArray = newsArray;
          });
        }

        getArts();

        // $scope.updatePreferences = NewsService.updatePreferences($scope.userPreferences).then(function(){
        //   getArts();
        // })


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

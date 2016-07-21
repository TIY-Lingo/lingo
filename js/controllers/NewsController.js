module.exports = function(app) {
    app.controller('NewsController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;

        NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray){
            $scope.newsArray = newsArray;
        });

        console.log($scope.newsArray)

        $scope.goback = function() {

          $scope.pageNumber -= 1;
          $scope.itemsPerPage = 1;

          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray){
              $scope.newsArray = newsArray;
          });

            //$scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage)
        }
        $scope.goforward = function() {

            $scope.pageNumber += 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray){
                $scope.newsArray = newsArray;
            });


            //$scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage);
        }
        // $scope.newsArray = NewsService.getNewsRequest();
        // console.log($scope.newsArray);
    }]);
}

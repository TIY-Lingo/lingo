module.exports = function(app) {
    app.controller('NewsController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 2;
        $scope.newsArray = NewsService.getNewsRequest();

        $scope.goback = function() {
            $scope.pageNumber = $scope.pageNumber - 1;
            $scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage)
        }
        $scope.goforward = function() {
            $scope.pageNumber = $scope.pageNumber + 1;
            $scope.newsArray = NewsService.getNewsRequest($scope.pageNumber, $scope.itemsPerPage);
        }

        $scope.newsArray = NewsService.getNewsRequest();
        console.log($scope.newsArray);
    }]);
}

module.exports = function(app) {
    app.controller('NewsController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
      $scope.newsArray = NewsService.getNewsRequest();
      console.log($scope.newsArray);
    }]);
}

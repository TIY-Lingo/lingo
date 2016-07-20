module.exports = function(app) {
    app.controller('NewsController', ['NewsService','UserService' '$scope', '$location', function(NewsService,UserService, $scope, $location) {
      $scope.news = NewsService.getNewsRequest();
    }]);
}

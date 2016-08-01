module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', 'UserService', '$routeParams',
        '$scope', '$location',
        function(NewsService, UserService, $routeParams,$scope, $location) {
            $scope.pageNumber = 1;
            $scope.itemsPerPage = 5;

            $scope.specificPref = UserService.getPreferences();

            let articleId = parseInt($routeParams.articleId);

            if (articleId) {
              console.log("in articleId", articleId);
                NewsService.getArticeById(articleId).then(function(result) {
                  console.log("in articleId then", result);
                  $scope.currentArticle = result.data;
                });
            }

            var getArts = function() {
              console.log("in get arts!");
                NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                  console.log("all done", newsArray);
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

        }
    ]);
}

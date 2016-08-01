module.exports = function(app) {
    app.controller('NewsController', ['NewsService', 'UserService', '$scope', '$sce', '$location', function(NewsService, UserService, $scope, $sce, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;
        let prefArray = {};



        let getCats = function() {
            NewsService.async().then(function(categoryArray) {
                $scope.articleArray = categoryArray;
            })
        }
        getCats();


        $scope.makeArticleSafe = function(article) {
            return $sce.trustAsHtml(article);
        }

        $scope.specificPref = UserService.getPreferences();

        var getArts = function() {
            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });
        }

        getArts();


        $scope.goback = function() {

            $scope.pageNumber -= 1;
            $scope.itemsPerPage = 1;

            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }
        $scope.goforward = function(category) {

            $scope.pageNumber += 1;
            $scope.itemsPerPage = 1;


            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });

        }

        $scope.signOut = function() {
            NewsService.signOutUser();
        };



    }]);
}

module.exports = function(app) {
    app.controller('NewsController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 1;
        let prefArray = {};

        // $scope.articleArray = NewsService.async();
        // console.log("this is the article array", $scope.articleArray);
        let getCats = function() {
          NewsService.async().then(function (categoryArray) {
            $scope.articleArray = categoryArray;
            // console.log(categoryArray);
          })
        }
        getCats();

        $scope.specificPref = UserService.getPreferences();

        var getArts = function(){
          NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
              $scope.newsArray = newsArray;
              console.log($scope.newsArray);
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

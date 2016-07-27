module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', 'UserService', '$scope', '$location', function(NewsService, UserService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 25;

        $scope.specificPref = UserService.getPreferences();


        var getArts = function() {
            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });
        }

        getArts();

        console.log('this is the news array:', $scope.newsArray)

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

        $scope.selectedArticle = function(id) {

          console.log("id is: ", id);


          // Go to server and get article (id)
          // return article content

      }



    }]);
}

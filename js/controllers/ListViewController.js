module.exports = function(app) {
    app.controller('ListViewController', ['NewsService', '$scope', '$location', function(NewsService, $scope, $location) {
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 25;

        var getArts = function() {
            NewsService.async($scope.pageNumber, $scope.itemsPerPage).then(function(newsArray) {
                $scope.newsArray = newsArray;
            });
        }

        getArts();

        console.log($scope.newsArray)

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

        $scope.selectedArticle = function() {
          console.log($scope.newsArray.title);
          // $scope.newsArray.map(function (element){
          //   for (var i = 0; i < newsArray.length; i ++){
          //     if (newsArray[i] === $scope.newsArray.title){
          //       getArts();
          //     } else
          //   }
          // })
        }



    }]);
}

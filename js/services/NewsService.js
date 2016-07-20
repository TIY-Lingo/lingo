module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {
      let newsArray = [];

      $http({
          method: 'GET',
          url: '/articles',
      }).then(function(response) {
          let newsObject = response.data;
          angular.copy(newsObject, newsArray)
          console.log("object with news", newsArray);

      });

      return {
          getNewsRequest: function() {
              return newsArray;
          }
      }
    }]);
};

module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {
      let newsArray = [];

      $http({
          method: 'GET',
          url: '/articles',
      }).then(function(response) {
          let newsObject = response.data;
          console.log("object with news", newsObject);
          angular.copy(newsObject, newsArray)
      });

      return {
          getNewsRequest: function() {
              return newsArray;
          }
      }
    }]);
};

module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {
      var  newsArray = {
        async: function(pageNum, perPage) {

            var promise = $http({
                method: 'GET',
                url: '/articles',
            }).then(function(response) {
                // let newsObject = response.data;
                // angular.copy(newsObject, newsArray)
                console.log("object with news", newsArray);
                let start = (pageNum + 1) * perPage;
                console.log("getNewsRequest");

                return response.data.slice(start, start + perPage);

            });
          return promise;
        }

      };
      return newsArray;

    }]);
};

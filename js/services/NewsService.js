module.exports = function(app) {

    app.factory('NewsService', ['$http', function($http) {

      //////END WORKING ON SIGN OUT FUNCTION/////////
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
        },
        //////WORKING ON SIGN OUT FUNCTION//////
                    signOutUser: function(){
                      console.log("running sign out");
                      $http({
                          url: '/logout',
                          method: 'POST',
                          //
                          // data: {
                          //     username: username,
                          // },
                      }).then(function(results) {
                          console.log("signed out the user");
                      });
                    }
      };
      return newsArray;

    }]);
};

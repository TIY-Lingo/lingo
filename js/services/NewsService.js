module.exports = function(app) {

    app.factory('NewsService', ['UserService', '$http', '$location', function(UserService, $http, $location) {

        let personLoggedIn = UserService.getPreferences();

        var newsArray = {
            async: function(pageNum, perPage) {

                var promise = $http({
                    method: 'GET',
                    url: '/articles',
                }).then(function(response) {

                    console.log("/articles reponse", response);

                    let start = (pageNum + 1) * perPage;

                    return response.data.slice(start, start + perPage);

                });
                return promise;
            },

            getArticeById: function(id){

              var promise = $http({
                  method: 'GET',
                  url: '/article/' + id,
              }).then(function(response) {

                return response;

              });
              return promise;

            },

            //////SIGN OUT FUNCTION//////
            signOutUser: function() {

                    $http({
                            url: '/logout',
                            method: 'POST',
                            data: {
                                username: 'Winnie'
                            }
                        })
                        .then(function(results) {
                            // $location('#/home')
                        });
                }
                //////SIGN OUT FUNCTION/////////


        };
        return newsArray;

    }]);
};

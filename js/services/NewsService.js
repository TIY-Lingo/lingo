module.exports = function(app) {

    app.factory('NewsService', ['UserService', '$http', '$location', function(UserService, $http, $location) {

        let personLoggedIn = UserService.getPreferences();
        //  let userSpecificArticles = [];
        let artsArticles = [];
        let sportsArticles = [];
        let politicsArticles = [];
        let businessArticles = [];
        let technologyArticles = [];

        var newsArray = {
            async: function(pageNum, perPage) {

                var promise = $http({
                    method: 'GET',
                    url: '/articles',
                }).then(function(response) {
                    // 
                    // let newsArrayResponse = response.data;
                    // newsArrayResponse.forEach(function(element) {
                    //         if (element.span1) {
                    //             element.article = element.span1;
                    //         })
                    //         if (element.span2) {
                    //             element.article = element.span2;
                    //         })
                    //         if (element.span3) {
                    //             element.article = element.span3;
                    //         })
                    //         if (element.french1) {
                    //             element.article = element.french1;
                    //         })
                    //         if (element.french2) {
                    //             element.article = element.french2;
                    //         })
                    //         if (element.french3) {
                    //             element.article = element.french3;
                    //         })
                    // }

                    //  newsArrayResponse.filter(function (element){
                    //    if (element.type === "arts") {
                    //      artsArticles.push(element);
                    //    } else if (element.type === "sports") {
                    //      sportsArticles.push(element);
                    //    } else if (element.type === "business") {
                    //      businessArticles.push(element);
                    //    } else if (element.type === "politics") {
                    //      politicsArticles.push(element);
                    //    } else if (element.type === "technology"){
                    //      technologyArticles.push(element);
                    //    }
                    //
                    //  })

                    let start = (pageNum + 1) * perPage;

                    return response.data.slice(start, start + perPage);

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

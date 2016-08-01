module.exports = function(app) {

    app.factory('NewsService', ['UserService', '$http', '$location', function(UserService, $http, $location) {

        let personLoggedIn = UserService.getPreferences();
        let allTheArticles = [];

        var newsArray = {
            async: function(pageNum, perPage) {

                var promise = $http({
                    method: 'GET',
                    url: '/articles',
                }).then(function(response) {
                    // // console.log(response.data);
                    // let newsArrayResponse = response.data;
                    // artsArticles = [];
                    // sportsArticles = [];
                    // politicsArticles = [];
                    // businessArticles = [];
                    // technologyArticles = [];
                    //
                    // // console.log("element categorization begin");
                    //
                    // newsArrayResponse.forEach(function(element) {
                    //     if (element.category_id === 775) {
                    //         // console.log("art element.category_id: " + 775);
                    //         artsArticles.push(element)
                    //     } else if (element.category_id === 772) {
                    //         // console.log("biz element.category_id: " + 772);
                    //         businessArticles.push(element)
                    //     } else if (element.category_id === 774) {
                    //         // console.log("sports element.category_id: " + 774);
                    //         sportsArticles.push(element)
                    //     } else if (element.category_id === 773) {
                    //         // console.log("poly element.category_id: " + 773);
                    //         politicsArticles.push(element)
                    //     } else if (element.category_id === 776) {
                    //         // console.log("tech element.category_id: " + 776);
                    //         technologyArticles.push(element)
                    //     } else {
                    //         // console.log("else element.category_id: " + element.category_id);
                    //     }
                    // })



                    let start = (pageNum + 1) * perPage;

                    return response.data.slice(start, start + perPage);

                });
                return promise;
            },

            // politicsArticles: function(pageNum, perPage) {
            //     console.log("politicsArticles: " + politicsArticles.length);
            //     let start = (pageNum + 1) * perPage;
            //
            //     if (politicsArticles) {
            //         return politicsArticles.slice(start, start + perPage);
            //     }
            //
            // },

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

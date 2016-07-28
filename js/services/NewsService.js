module.exports = function(app) {

   app.factory('NewsService', ['UserService', '$http', '$location', function(UserService, $http, $location) {

     let personLoggedIn = UserService.getPreferences();
     let userSpecificArticles = [];
     let artsArticles= [];
     let sportsArticles= [];
     let politicsArticles= [];
     let businessArticles=[];
     let technologyaArticles = [];

     var  newsArray = {
       async: function(pageNum, perPage) {

           var promise = $http({
               method: 'GET',
               url: '/articles',
           }).then(function(response) {
              // let newsArrayResponse = response.data;
              //  newsArrayResponse.filter(function (element){
              //    if (element.type === "arts" && personLoggedIn.arts === true) {
              //      userSpecificArticles.push(element);
              //      artsArticles.push(element);
              //    } else if (element.type === "sports" && personLoggedIn.sports === true) {
              //      userSpecificArticles.push(element);
              //      sportsArticles.push(element);
              //    } else if (element.type === "business" && personLoggedIn.business === true) {
              //      userSpecificArticles.push(element);
              //      businessArticles.push(element);
              //    } else if (element.type === "politics" && personLoggedIn.politics === true) {
              //      userSpecificArticles.push(element);
              //      politicsArticles.push(element);
              //    } else if (element.type === "technology" && personLoggedIn.technology === true){
              //      userSpecificArticles.push(element);
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
                   signOutUser: function(){

                     $http({
                         url: '/logout',
                         method: 'POST',
                         data: {username: 'Winnie'}
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

module.exports = function(app) {

    app.factory('UserService', ['$http', function($http) {

    ////signIn() click event to post username and password to server//////
      return {
      postUserInfo: function(name) {
          $http({
              url: '/login',
              method: 'POST',
              data: {
                  username: name,
                  password: "1234",
              },
          }).then(function(results) {
              console.log("posted")
          });
      },
    }]);
};

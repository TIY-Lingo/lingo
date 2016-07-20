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
        createLogin: function(name, password) {
          loginName = name;
          console.log(loginName);

                $http({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: ,
                        password: ,
                    }
                }).then(function(response) {
                    let userInfoObject = response.data;
                    console.log("object with user information", userInfoObject);
                });
            },
        createPreferences: function(pref)  {
          userPref = pref;
          console.log(userPref);

          $http({
              method: 'POST',
              url: '/preferences',
              data: {
                language: 'spanish',
                business: false,
                sports: false,
                politics: false,
                technology: false,
                arts: false,
              }
          }).then(function(response) {
              let userPrefObject = response.data;
              console.log("object with user preferences", userPrefObject);
          });
        } ,
            return {
                sendLoginInfo: function() {
                    return loginName;
                },
                sendPrefInfo: function() {
                  return userPref;
                }
            }
    }]);
};

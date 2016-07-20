module.exports = function(app) {

    app.factory('UserService', ['$http', function($http) {
        let loginName = "";

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

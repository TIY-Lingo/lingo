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
                        username: password:
                    }
                }).then(function(response) {
                    let userInfoObject = response.data;
                    console.log("object with user information", userInfoObject);
                });
            },
            return {
                sendLoginInfo: function() {
                    return loginName;
                }
            }
    }]);
};

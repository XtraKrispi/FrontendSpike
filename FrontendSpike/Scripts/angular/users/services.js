var UserServices = angular.module('UserServices', []);

UserServices.service('UserService', ['$http', '$q', function ($http, $q) {
    this.users = [];
    this.loadUsers = function () {
        var that = this;
        $http({ method: 'GET', url: '/api/users' }).success(function (data, status, headers, config) {
            that.users = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.checkUsername = function (username) {
        var deferred = $q.defer();

        $http.get('/api/users?username=' + username).success(function (data) {
            deferred.resolve(data && data.length > 0 && username);
        }).error(function (data) {
            deferred.reject(data);
        });

        return deferred.promise;
    };
}]);
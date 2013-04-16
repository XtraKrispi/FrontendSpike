var UserServices = angular.module('UserServices', []);

UserServices.service('UserService', ['$http', '$q', function ($http, $q) {
    this.users = [];
    this.loadUsers = function () {
        var deferred = $q.defer();
        $http({ method: 'GET', url: '/api/users' }).success(function (data, status, headers, config) {
            this.users = data;
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            deferred.reject(data);
        });

        return deferred.promise;
    };
}]);
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

    this.saveUser = function (user) {
        var that = this;
        var deferred = $q.defer();

        var promise;
        if (user.UserId) {
            promise = $http.put('/api/users/' + user.UserId, user);
        } else {
            promise = $http.post('/api/users/', user);
        }

        promise.success(function (data) {
            var dbUser = _(that.users).find(function(u) {
                return u.UserId == user.UserId;
            });
            
            if (dbUser) {
                that.users[that.users.indexOf(dbUser)] = user;
            } else {
                that.users.push(data);
            }
            
            deferred.resolve(data);
        }).error(function(data) {
            deferred.reject(data);
        });

        return deferred.promise;
    };

    this.removeUser = function(user) {
        var deferred = $q.defer();
        var that = this;
        
        $http.delete('/api/users/' + user.UserId).success(function (data) {
            var dbUser = _(that.users).find(function(u) {
                return u.UserId == user.UserId;
            });
            
            if (dbUser) {
                that.users.splice(that.users.indexOf(dbUser), 1);
            }

            deferred.resolve(user);
        }).error(function(data) {

            deferred.reject(data);
        });

        return deferred.promise;
    };
}]);
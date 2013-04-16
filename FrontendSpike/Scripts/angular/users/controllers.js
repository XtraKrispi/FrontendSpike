var UserControllers = angular.module('UserControllers', ['UserServices', 'Directives']);

UserControllers.controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    if (UserService.users.length == 0) {
        var promise = UserService.loadUsers();
        promise.then(function (users) {
            $scope.$broadcast('users-loaded', users);
        });
    }
}]);

UserControllers.controller('UserListCtrl', ['$scope', function ($scope) {
    $scope.$on('users-loaded', function (event, users) {
        $scope.users = users;
        console.log(users);
    });

    $scope.removeUser = function(user) {
        console.log('Remove:', user);
    };
}]);

UserControllers.controller('AddEditUserCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    var id = $routeParams.id;
    $scope.$on('users-loaded', function (event, users) {
        var user = _(users).find(function(u) {
            return u.UserId == id;
        });

        $scope.user = user;
    });
}]);

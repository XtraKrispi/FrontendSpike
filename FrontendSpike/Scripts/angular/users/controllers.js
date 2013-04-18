var UserControllers = angular.module('UserControllers', ['UserServices', 'Directives', 'Services']);

UserControllers.controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    if (UserService.users.length == 0) {
        var promise = UserService.loadUsers();
    }
}]);

UserControllers.controller('UserListCtrl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
    $scope.$watch(function () {
        return UserService.users;
    }, function () {
        $scope.users = UserService.users;
    }, true);

    $scope.removeUser = function (user) {
        console.log('Remove:', user);
    };

    $scope.selectUser = function (user) {
        $location.path('/users/' + user.UserId);
    };
}]);

UserControllers.controller('AddEditUserCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'HelperService', function ($scope, $routeParams, $location, UserService, HelperService) {
    var id = $routeParams.id;

    $scope.$watch(function () {
        return UserService.users;
    }, function () {
        if (!$scope.user && UserService.users.length > 0) {
            var user = _(UserService.users).find(function (u) {
                return u.UserId == id;
            });

            $scope.user = HelperService.clone(user);

            console.log('found user ', user);
        }
    }, true);


    $scope.clearUser = function () {
        $location.path('/users');
    };

    $scope.saveUser = function () {

    };

    $scope.checkUsername = function () {
        UserService.checkUsername($scope.user.Username).then(function (isTaken) {
            $scope.usernameTaken = isTaken;
        });
    };
}]);

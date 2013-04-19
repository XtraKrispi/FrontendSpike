var UserControllers = angular.module('UserControllers', ['UserServices', 'Directives', 'Services']);

UserControllers.controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    if (UserService.users.length == 0) {
        var promise = UserService.loadUsers();
    }
}]);

UserControllers.controller('UserListCtrl', ['$scope', '$location', '$routeParams', 'UserService', function ($scope, $location, $routeParams, UserService) {
    $scope.$watch(function () {
        return UserService.users;
    }, function () {
        $scope.users = UserService.users;
    }, true);

    $scope.removeUser = function (user) {
        UserService.removeUser(user).then(function(data) {
            if ($routeParams.id && $routeParams.id == data.UserId) {
                $location.path('/users');
            }
        });
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
        $scope.user = {};
        $scope.addEditForm.userName.$setValidity('usernameTaken', true);
        $location.path('/users');
    };

    $scope.saveUser = function () {
        UserService.saveUser($scope.user).then(function() {
            $scope.clearUser();
        });
    };
    
    $scope.checkUsername = function () {
        UserService.checkUsername($scope.user.Username).then(function (isTaken) {
            $scope.usernameTaken = isTaken;
            $scope.addEditForm.userName.$setValidity('usernameTaken', !isTaken);
        });
    };
}]);

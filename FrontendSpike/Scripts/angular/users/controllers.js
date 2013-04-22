var UserControllers = angular.module('UserControllers', ['UserServices', 'Directives', 'Services']);

UserControllers.controller('UserListCtrl', ['$scope', '$location', '$routeParams', 'UserService', function ($scope, $location, $routeParams, UserService) {
    $scope.removeUser = function (user, event) {
        event.stopPropagation();
        UserService.removeUser(user).then(function (data) {
            var index = _($scope.users).indexOf(data);
            $scope.users.splice(index, 1);
            
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

    var user = _($scope.users).find(function (u) {
        return u.UserId == id;
    });

    $scope.user = HelperService.clone(user);

    $scope.clearUser = function () {
        $scope.user = {};
        $scope.addEditForm.userName.$setValidity('usernameTaken', true);
        $location.path('/users');
    };

    $scope.saveUser = function () {
        UserService.saveUser($scope.user).then(function (u) {
            var fromScope = _($scope.users).find(function(us) {
                return us.UserId == u.UserId;
            });

            if (fromScope) {
                var index = _($scope.users).indexOf(fromScope);
                $scope.users[index] = u;
            } else {
                $scope.users.push(u);
            }

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

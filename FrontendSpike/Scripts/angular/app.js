var app = angular.module('myApp', ['UserControllers', 'UserServices']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/users', { templateUrl: 'partials/users.html'}).
        when('/users/:id', {
            templateUrl: 'partials/users.html'});
}]);

app.run(['$rootScope', 'UserService', function($rootScope, UserService) {
    UserService.loadUsers().then(function(users) {
        $rootScope.users = users;
    });
}]);
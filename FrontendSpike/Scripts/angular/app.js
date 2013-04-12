var app = angular.module('myApp', ['UserControllers']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/users', { templateUrl: 'partials/users.html', controller: 'UserCtrl' }).
        when('/users/:id', {
            templateUrl: 'partials/users.html', controller: 'UserCtrl'});
}]);
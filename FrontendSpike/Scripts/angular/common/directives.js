var Directives = angular.module('Directives', []);

Directives.directive('date', function () {
    return {
        restrict: 'A',
        scope: {
            value: '=',
            format: '='
        },
        template: '<span>{{formattedDate}}</span>',
        replace: true,
        link: function(scope, elem, attrs) {
            scope.formattedDate = Date.create(scope.value).format(scope.format);
        }
    };
});
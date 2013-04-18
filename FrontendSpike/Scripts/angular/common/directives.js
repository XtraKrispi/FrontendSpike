var Directives = angular.module('Directives', []);

Directives.directive('blur', [function () {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.on('blur', function() {
                scope.$apply(attrs.blur);
            });
        }
    };
}]);
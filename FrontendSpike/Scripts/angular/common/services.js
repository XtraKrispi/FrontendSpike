var Services = angular.module('Services', []);

Services.service('HelperService', [function() {
    this.clone = function(obj) {
       return $.extend(true, {}, obj);
    };
}]);
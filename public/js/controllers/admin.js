angular.module('osc.admin').controller('AdminController', ['$scope', '$routeParams', '$location', 'Global',
    function ($scope, $routeParams, $location, Global) {
        $scope.global = Global;


    }
]);
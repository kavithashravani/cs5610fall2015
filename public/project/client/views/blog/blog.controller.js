(function() {

    angular
        .module("DietTrackerApp")
        .controller("BlogController", BlogController);

    function BlogController($scope, $location) {
        $scope.$location = $location

    }

})();
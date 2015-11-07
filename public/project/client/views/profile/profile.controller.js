(function() {

    angular
        .module("DietTrackerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location) {
        $scope.$location = $location;
    }

})();
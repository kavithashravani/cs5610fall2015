(function () {
    angular
        .module("DietTrackerApp")
        .controller("ContactUsController", ContactUsController);

    function ContactUsController($scope, $location) {
        $scope.$location = $location;
    }

})();
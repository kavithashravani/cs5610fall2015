(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        function update() {
            $scope.curUserId = $rootScope.currentUser.id;
            UserService.updateUser($scope.curUserId, $scope.user, function(updatedUser) {

            });
        }
    }


})();
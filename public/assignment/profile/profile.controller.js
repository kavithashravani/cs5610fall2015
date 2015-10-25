(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.curUser = $rootScope.currentUser;
        function update() {
            $scope.updateUser = {username: $scope.username,
                                 password: $scope.password,
                                 firstName: $scope.firstName,
                                 lastName: $scope.lastName};
            UserService.updateUser($scope.curUser.id, updateUser, function(updatedUser) {

            });
        }
    }


})();
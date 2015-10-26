(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.curUser = $rootScope.currentUser;
        $scope.user = {};
        $scope.user.username = $scope.curUser.username;
        $scope.user.password = $scope.curUser.password;
        $scope.user.firstName = $scope.curUser.firstName;
        $scope.user.lastName = $scope.curUser.lastName;
        $scope.user.email = $scope.curUser.email;

        function update() {
            $scope.curUserId = $rootScope.currentUser.id;
            UserService.updateUser($scope.curUserId, $scope.user, function(updatedUser) {

            });
        }
    }


})();
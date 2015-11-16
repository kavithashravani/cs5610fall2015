(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        var profileModel = this;
        $scope.$location = $location;
        profileModel.update = update;
        profileModel.curUser = $rootScope.currentUser;
        $scope.user = {};
        $scope.user.username = profileModel.curUser.username;
        $scope.user.password = profileModel.curUser.password;
        $scope.user.firstName = profileModel.curUser.firstName;
        $scope.user.lastName = profileModel.curUser.lastName;
        $scope.user.email = profileModel.curUser.email;

        function update() {
            profileModel.curUserId = profileModel.curUser.id;
            UserService.updateUser(profileModel.curUserId, profileModel.user, function(updatedUser) {

            });
        }
    }


})();
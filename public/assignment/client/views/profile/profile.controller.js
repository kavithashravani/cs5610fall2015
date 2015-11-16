(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var profileModel = this;
        profileModel.update = update;
        profileModel.curUser = $rootScope.currentUser;
        profileModel.user = {};
        profileModel.user.username = profileModel.curUser.username;
        profileModel.user.password = profileModel.curUser.password;
        profileModel.user.firstName = profileModel.curUser.firstName;
        profileModel.user.lastName = profileModel.curUser.lastName;
        profileModel.user.email = profileModel.curUser.email;

        function update() {
            profileModel.curUserId = profileModel.curUser.id;
            UserService.updateUser(profileModel.curUserId, profileModel.user)
                .then(function(updatedUser) {
                    profileModel.curUser = updatedUser;
                    $rootScope.currentUser = updatedUser;

            });
        }
    }


})();
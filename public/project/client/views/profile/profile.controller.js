(function() {

    angular
        .module("DietTrackerApp")
        .controller("ProfileController", ProfileController)
        .controller("EditProfileController", EditProfileController);

    function ProfileController($scope, $routeParams, $filter, $rootScope, $http, $location, ngDialog, UserService, CommentService) {
        var profileModel = this;
        profileModel.toggleFollow = toggleFollow;
        profileModel.followUser = followUser;
        profileModel.unFollowUser = unFollowUser;
        profileModel.editProfile = editProfile;
        profileModel.changePwd = changePwd;
        profileModel.visitingUserName = $routeParams["userName"];
        $scope.$location = $location;

        $http.get("/api/loggedin/user")
            .success(function (user) {
                if (user != '0') {
                    $rootScope.homeTab = false;
                    $rootScope.profileTab = false;
                    $rootScope.foodLogTab = false;
                    $rootScope.signOutTab = false;
                    $rootScope.loginTab = true;
                    profileModel.currentUser = $rootScope.currentUser;
                    $scope.currentUser = $rootScope.currentUser;
                    if(profileModel.visitingUserName != profileModel.currentUser.UserName) {
                        if(profileModel.currentUser.follows.indexOf(profileModel.visitingUserName) == -1) {
                            profileModel.followVariable = "Follow"
                        }
                        else {
                            profileModel.followVariable = "Unfollow"
                        }
                        UserService
                            .findUserByUserName(profileModel.visitingUserName)
                            .then(function(user) {
                                profileModel.visitingUser = user;
                            });

                    }
                    else {
                        profileModel.visitingUser = profileModel.currentUser;
                       //console.log(profileModel.visitingUser.Weight);
                    }
                }
                else {
                    $rootScope.homeTab = false;
                    $rootScope.profileTab = true;
                    $rootScope.foodLogTab = true;
                    $rootScope.signOutTab = true;
                    $rootScope.loginTab = false;
                    $location.url("/home");
                }
                CommentService
                    .findCommentsByUserName(profileModel.visitingUserName)
                    .then(function(comments) {
                        var activityKey = [];
                        var activityComments = [];
                        for(var i = 0; i < comments.length; i++) {
                            if(activityKey.indexOf(comments[i].foodApi_ID) == -1) {
                                activityComments.push(comments[i]);
                                activityKey.push(comments[i].foodApi_ID);
                            }
                        }
                        profileModel.userActivity = activityComments;
                    });

            });


        function toggleFollow() {
            if(profileModel.currentUser.follows.indexOf(profileModel.visitingUserName) == -1) {
                followUser();
            }
            else {
                unFollowUser();
            }
        }

        function followUser() {
            UserService
                .followUser(profileModel.currentUser.UserName, profileModel.visitingUser.UserName)
                .then(function(user) {
                    profileModel.currentUser = user;
                    $rootScope.currentUser = user;
                    profileModel.followVariable = "Unfollow"
                    //console.log(user);
                });

        }

        function unFollowUser() {
            UserService
                .unFollowUser(profileModel.currentUser.UserName, profileModel.visitingUser.UserName)
                .then(function(user) {
                    profileModel.currentUser = user;
                    $rootScope.currentUser = user;
                    profileModel.followVariable = "Follow"
                    //console.log(user);
                });
        }

        function changePwd() {
            var changePwdDialog = ngDialog.open({
                template: "./views/profile/changePasswordDialog.view.html",
                className: 'ngdialog-theme-default',
                scope: $scope,
                backdrop: 'static',
                keyboard: false
            });

            changePwdDialog.closePromise.then(function(data) {
                if(data != undefined && data.value.hasOwnProperty('update')) {
                    if(data.value.update == 'update') {
                        var updateUserPwd = {
                            Password: data.value.newPassword
                        }
                        UserService
                            .updateUser($rootScope.currentUser.UserName, updateUserPwd)
                            .then(function(updatedUser) {
                                $rootScope.currentUser = updatedUser;
                                profileModel.currentUser = updatedUser;
                            })
                    }
                }
            });

        }

        function editProfile() {
            var editProfileDialog = ngDialog.open({
                template: "./views/profile/editProfileDialog.view.html",
                className: 'ngdialog-theme-default',
                controller: "EditProfileController",
                controllerAs: "profileDialogModel",
                scope: $scope,
                backdrop: 'static',
                keyboard: false
            });
            editProfileDialog.closePromise.then(function (data) {
                if(data != undefined && data.value.hasOwnProperty('update')) {
                    if (data.value.update == 'update') {
                        var updateUser = {
                            FirstName: data.value.firstName,
                            LastName: data.value.lastName,
                            Email: data.value.email,
                            Age: data.value.age,
                            Weight: data.value.weight
                        }
                        UserService
                            .updateUser($rootScope.currentUser.UserName, updateUser)
                            .then(function (updatedUser) {
                                if (updatedUser != null) {
                                    $rootScope.currentUser = updatedUser;
                                    profileModel.currentUser = updatedUser;
                                    profileModel.visitingUser = profileModel.currentUser;
                                }
                                else {
                                    //navigateToLoginDialog();
                                }
                            });
                    }
                }
            });
        }

    }

    function EditProfileController($rootScope, UserService) {
        var profileDialogModel = this
        profileDialogModel.firstName = $rootScope.currentUser.FirstName;
        profileDialogModel.lastName = $rootScope.currentUser.LastName;
        profileDialogModel.emailId = $rootScope.currentUser.Email;
        profileDialogModel.age = $rootScope.currentUser.Age;
        profileDialogModel.weight = $rootScope.currentUser.Weight;
    }

})();
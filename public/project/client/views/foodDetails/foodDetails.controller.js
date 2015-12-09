(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodDetailsController", FoodDetailsController);


    function FoodDetailsController($rootScope, $routeParams, $scope, $location, $http, ngDialog, $filter, FoodDetailsService, UserService, CommentService) {
        var foodDetailsModel = this;
        var foodId = $routeParams["foodId"];
        foodDetailsModel.logFood = logFood;
        foodDetailsModel.navigateToLoginDialog = navigateToLoginDialog;
        foodDetailsModel.comment = comment;
        foodDetailsModel.updateComment = updateComment;
        foodDetailsModel.deleteComment = deleteComment;
        foodDetailsModel.commentMsgTab = true;
        foodDetailsModel.allComments=[];

        function init() {
            $http.get("/api/loggedin/user")
                .success(function (user) {
                    if(user != '0') {
                        foodDetailsModel.currentUser = $rootScope.currentUser;
                        foodDetailsModel.commentPanelTab = true;
                    }
                    else {
                        foodDetailsModel.commentPanelTab = false;
                    }
                });
            CommentService.findAllComments(foodId)
                .then(function(comments) {
                    foodDetailsModel.allComments = comments;
                });
            FoodDetailsService.findDetailsById(foodId)
                .then(function(details) {
                    foodDetailsModel.details = details.recipe;
                    //console.log(details);
                });

        }
        init();
        function logFood() {
            $http.get("/api/loggedin/user")
                .success(function (user) {
                    if (user != '0') {
                        var foodLog = {
                            foodApi_ID: foodId,
                            UserName: $rootScope.currentUser.UserName,
                            Servings: foodDetailsModel.serving,
                            foodType: foodDetailsModel.foodType,
                            foodName: foodDetailsModel.details.recipe_name,
                            calories: (parseFloat(foodDetailsModel.details.serving_sizes.serving.calories) * parseFloat(foodDetailsModel.serving)).toString(),
                            fat:    (parseFloat(foodDetailsModel.details.serving_sizes.serving.fat) * parseFloat(foodDetailsModel.serving)).toString(),
                            carbohydrate: (parseFloat(foodDetailsModel.details.serving_sizes.serving.carbohydrate) * parseFloat(foodDetailsModel.serving)).toString(),
                            protein: (parseFloat(foodDetailsModel.details.serving_sizes.serving.protein) * parseFloat(foodDetailsModel.serving)).toString(),
                            Date: $filter('date')(foodDetailsModel.logDate, "mediumDate")
                        }
                        foodDetailsModel.currentUser = $rootScope.currentUser;
                        $rootScope.currentFoodLog = foodLog;
                        $location.url("/food-log/"+$rootScope.currentUser.UserName);
                    }
                    else {
                        navigateToLoginDialog();

                    }

                });
        }

        function comment() {
                var comment = {
                    foodApi_ID: foodId,
                    foodName: foodDetailsModel.details.recipe_name,
                    CommentDate: $filter('date')(new Date(), "mediumDate"),
                    UserName: $rootScope.currentUser.UserName,
                    Comment: foodDetailsModel.inputComment
                }

                CommentService
                    .insertComment(comment)
                    .then(function (comment) {
                        foodDetailsModel.allComments.push(comment);
                        foodDetailsModel.inputComment = "";
                        //console.log(foodDetailsModel.allComments);
                    });

        }


        function updateComment(commentId, inputComment) {
            CommentService
                .updateComment(commentId, foodId, inputComment)
                .then(function(comments) {
                    foodDetailsModel.allComments = comments;
                });
        }

        function deleteComment(commentId) {
            CommentService
                .deleteComment(commentId, foodId)
                .then(function(comments) {
                    foodDetailsModel.allComments = comments;
                });
        }


        function navigateToLoginDialog() {
                var loginDialog = ngDialog.open({
                    template: "./views/login/loginDialog.view.html",
                    className: 'ngdialog-theme-default'
                });
            loginDialog.closePromise.then(function (data) {
                if(data != undefined && data.value.hasOwnProperty('login')) {
                    if (data.value.login == 'login') {
                        var user = {
                            UserName: data.value.userName,
                            Password: data.value.password
                        }
                        UserService
                            .login(user)
                            .then(function (user) {
                                if (user != null) {
                                    $rootScope.currentUser = user;
                                    $rootScope.homeTab = false;
                                    $rootScope.profileTab = false;
                                    $rootScope.foodLogTab = false;
                                    $rootScope.signOutTab = false;
                                    $rootScope.loginTab = true;
                                    foodDetailsModel.currentUser = $rootScope.currentUser;
                                    foodDetailsModel.commentPanelTab = true;
                                }
                                else {
                                    navigateToLoginDialog();
                                }
                            });
                    }
                }
                else if(data.value.register == 'register') {
                        $location.url("/register");
                }
            });
        }

    }

}) ();
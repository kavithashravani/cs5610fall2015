(function(){
    angular
        .module("DietTrackerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                  templateUrl: "views/search/search.view.html",
                  controller: "SearchController"
            })
            .when("/food-log/:userName",{
                templateUrl: "views/foodLog/foodLog.view.html",
                controller: "FoodLogController",
                controllerAs: "foodLogModel"
            })
            .when("/food-details/:foodId",{
                templateUrl: "views/foodDetails/foodDetails.view.html",
                controller: "FoodDetailsController",
                controllerAs: "foodDetailsModel"
            })
            .when("/subscribe", {
                templateUrl: "views/subscribe/subscribe.view.html",
                controller: "SubscribeController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/blog", {
                templateUrl: "views/blog/blog.view.html",
                controller: "BlogController"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "registerModel"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
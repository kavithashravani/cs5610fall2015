(function(){
    angular
        .module("DietTrackerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
//                templateUrl: "views/slider/slider.view.html",
//                controller: "SliderController"
                  templateUrl: "views/subscribe/subscribe.view.html",
                  controller: "SubscribeController"
            })
            .when("/food-log",{
                templateUrl: "views/foodLog/foodLog.view.html",
                controller: "FoodLogController"
            })
            .when("/food-details",{
                templateUrl: "views/foodDetails/foodDetails.view.html",
                controller: "FoodDetailsController"
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
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
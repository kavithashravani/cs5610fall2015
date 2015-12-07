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
            .when("/profile/:userName", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "profileModel"
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
            .when("/signOut", {
                templateUrl: "views/search/search.view.html",
                controller: "SignOutController",
                controllerAs: "signOutModel"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
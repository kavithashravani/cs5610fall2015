(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "registerModel"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "loginModel"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "profileModel"
            })
            .when("/form", {
                templateUrl: "views/form/form.view.html",
                controller: "FormController",
                controllerAs: "formModel"
            })
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html",
                controller: "FieldController",
                controllerAs: "fieldModel"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
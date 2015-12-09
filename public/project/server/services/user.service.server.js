module.exports = function(app, userModel, passport) {
    app.get("/api/profile/:userName/:password", findUserByCredentials);
    app.post("/api/register/user", createUser);
    app.get("/api/loggedin/user", isLoggedIn);
    app.post("/api/logout", userLogOut);
    app.post("/api/login/user", passport.authenticate('local'), userLogin);
    app.put("/api/profile/:userName", updateUser);
    app.get("/api/profile/:userName", findUserByUserName);
    app.put("/api/user/:userName/follow/:followUserName", followUser);
    app.put("/api/user/:userName/unfollow/:unfollowUserName", unFollowUser);

    function userLogin(req, res) {
        var user = req.body;
        userModel
            .findUserByCredentials(user.UserName, user.Password)
            .then(function(user) {
                res.json(user);
            });
    }

    //function registerUser(req, res) {
    //
    //}

    function isLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findUserByCredentials(req, res) {
        var userName = req.params["userName"];
        var password = req.params["password"];
        userModel
            .findUserByCredentials(userName, password)
            .then(function(user) {
                res.json(user);
            });
        console.log(user);
    }

    function findUserByUserName(req, res) {
        var userName = req.params["userName"];
        userModel
            .findUserByUserName(userName)
            .then(function(user) {
                res.json(user);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .findUserByCredentials(user.UserName, user.Password)
            .then(function(existingUser) {
                if(existingUser != null) {
                    res.json(null);
                }
                else {
                    userModel
                        .insertUser(user)
                        .then(function(user) {
                            req.login(user, function(err) {
                                res.json(user);
                        });

                });
            }});
    }

    function updateUser(req, res) {
        var updateUser = req.body;
        var userName = req.params["userName"];
        userModel
            .updateUser(userName, updateUser)
            .then(function(updatedUser) {
                res.json(updatedUser);
            });
    }

    function followUser(req, res) {
        var curUserName = req.params["userName"];
        var followUserName = req.params["followUserName"];
        userModel
            .followUser(curUserName, followUserName)
            .then(function(user) {
                res.json(user);
            });
    }

    function unFollowUser(req, res) {
        var curUserName = req.params["userName"];
        var unfollowUserName = req.params["unfollowUserName"];
        userModel
            .unFollowUser(curUserName, unfollowUserName)
            .then(function(user) {
                res.json(user);
            });
    }


    function userLogOut(req, res) {
        req.logOut();
        res.send(200);
    }

};
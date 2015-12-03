module.exports = function(app, userModel, passport) {
    app.get("/api/profile/:userName/:password", findUserByUserName);
    app.post("/api/register/user", createUser);
    app.get("/api/loggedin/user", isLoggedIn);
    app.post("/api/logout", userLogOut);
    app.post("/api/login/user", passport.authenticate('local'), userLogin);

    function userLogin(req, res) {
        var user = req.body;
        userModel
            .findUserByUserName(user.UserName, user.Password)
            .then(function(user) {
                res.json(user);
            });
    }

    function isLoggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findUserByUserName(req, res) {
        var userName = req.params["userName"];
        var password = req.params["password"];
        userModel
            .findUserByUserName(userName, password)
            .then(function(user) {
                res.json(user);
            });
        console.log(user);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .findUserByUserName(user.UserName, user.Password)
            .then(function(existingUser) {
                if(existingUser != null) {
                    res.json(null);
                }
                else {
                    userModel
                        .insertUser(user)
                        .then(function(user) {
                            res.json(user);
                        });
                }
            });
    }

    function userLogOut(req, res) {
        req.logOut();
        res.send(200);
    }

};
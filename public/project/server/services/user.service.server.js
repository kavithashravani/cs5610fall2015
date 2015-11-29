module.exports = function(app, userModel, passport) {
    app.get("/api/profile/:userName/:password", findUserByUserName);
    app.post("/api/register/user", createUser);
    app.post("/api/login/user", authPassport, userLogin);
    app.get("/api/loggedin/user", isLoggedIn);
    app.post("/api/logout", userLogOut);

    var mongoose = require('mongoose');
    var userSchema = require("../models/user.schema.js")(mongoose);

    function userLogin(req, res) {
        var user = req.body;
        userSchema
            .findOne({UserName: user.userName, Password: user.passport}, function(err, foundUser) {
                res.json(foundUser);
            });
    }

    function authPassport(req, res, next) {
        passport.authenticate('local')(req, res, next);
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
                if(existingUser.length != 0) {
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
var users = require("../models/user.mock.json");
var uuid = require('node-uuid');
var q = require("q");

module.exports = function(app, mongoose, db) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema)

    //load the data from mock users into database.
    for(var i = 0; i < users.length; i++) {
        Create(users[i]);
    }

    var userApi = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    }
    return userApi;

    function Create(user) {
        var deferred = q.defer();

        UserModel.find({"username": user.username}, function(err, foundUser) {
            if(foundUser.length > 0) {
                console.log("username already exists. Try other username")
            }
            else {
                UserModel.create(user, function(err, user) {
                    deferred.resolve(user);
                });
            }
        });

        return deferred.promise;

    }

    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        UserModel.findOne({_id: id}, function(err, user) {
            if(err) {
                console.log("user doesnt exist");
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }

    function Update(id, newUser) {
        var deferred = q.defer();
        UserModel.findOne({_id: id}, function(err, foundUser) {
            console.log(foundUser);
            for(var index in newUser) {
                foundUser[index] = newUser[index];
            }
            foundUser.save(function(err, updatedUser) {
                deferred.resolve(updatedUser);
            });
        });
        return deferred.promise;
    }

    function  Delete(id) {
        var deferred = q.defer();
        UserModel.remove({_id: id}, function(err, response) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;

    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function(err, user) {
            deferred.resolve(user);
        });

        return deferred.promise;

    }

};
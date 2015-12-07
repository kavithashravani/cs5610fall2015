var q = require("q");

module.exports = function(app, mongoose, db) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var userModel = mongoose.model("_UserModel", UserSchema);
    var api = {
        insertUser: insertUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUserName: findUserByUserName,
        updateUser: updateUser,
        followUser: followUser,
        unFollowUser: unFollowUser
    };
    return api;

    function insertUser(user) {
        var deferred = q.defer();

        userModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        userModel.findOne({UserName: username, Password: password}, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUserName(userName) {
        var deferred = q.defer();

        userModel.findOne({UserName: userName}, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(userName, user) {
        var deferred = q.defer();

        userModel.findOne({UserName: userName}, function(err, foundUser) {
            for(var index in user) {
                foundUser[index] = user[index];
            }
            foundUser.save(function(err, updatedUser) {
                deferred.resolve(updatedUser);
            });
        });
        return deferred.promise;
    }

    function deleteUser(userName) {
        var deferred = q.defer();

        userModel.remove({UserName: userName}, function(err, status) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(foodLogs);
            }
        });
        return deferred.promise;
    }

    function followUser(curUserName, followUserName) {
        var deferred = q.defer();

        userModel.findOne({UserName: curUserName}, function(err, foundUser) {
            foundUser.follows.push(followUserName);
            foundUser.save(function(err, response) {
                deferred.resolve(foundUser);
            });
        });
        return deferred.promise;
    }

    function unFollowUser(curUserName, unfollowUserName) {
        var deferred = q.defer();

        userModel.findOne({UserName: curUserName}, function(err, foundUser) {
            var followsUserList = foundUser.follows;
            var index;
            for(var i = 0; i < followsUserList.length; i++) {
                if(followsUserList[i] == unfollowUserName) {
                    index = i;
                }
            }
            foundUser.follows.splice(index, 1);
            foundUser.save(function(err, res) {
                deferred.resolve(foundUser);
            });
        });

        return deferred.promise;
    }
}
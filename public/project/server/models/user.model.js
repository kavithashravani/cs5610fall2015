var q = require("q");

module.exports = function(mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var userModel = mongoose.model("_UserModel", UserSchema);
    var api = {
        insertUser: insertUser,
        findUserByUserName: findUserByUserName,
        updateUser: updateUser
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

    function findUserByUserName(username, password) {
        var deferred = q.defer();

        userModel.find({UserName: username, Password: password}, function(err, user) {
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

        foodLog.delete("UserName");

        userModel.update({UserName: userName}, {$set: user}, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
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
}
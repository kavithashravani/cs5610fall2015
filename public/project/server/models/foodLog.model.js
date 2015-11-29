var q = require("q");

module.exports = function(mongoose, db) {
    var FoodLogSchema = require("./foodLog.schema.js")(mongoose);
    var foodLogModel = mongoose.model("FoodLogModel", FoodLogSchema);
    var api = {
        insertFoodLog: insertFoodLog,
        findFoodLogByUserName: findFoodLogByUserName,
        deleteFoodLog: deleteFoodLog,
        updateFoodLog: updateFoodLog
    };
    return api;

    function insertFoodLog(foodLog) {
        var deferred = q.defer();

        foodLogModel.create(foodLog, function(err, foodLog) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(foodLog);
            }
        });
        return deferred.promise;
    }

    function findFoodLogByUserName(username, date) {
        var deferred = q.defer();

        foodLogModel.find({UserName: username, Date: date}, function(err, foodLogs) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(foodLogs);
            }
        });
        return deferred.promise;
    }

    function updateFoodLog(id, foodLog) {
        var deferred = q.defer();

        foodLog.delete("food_ID");

        foodLogModel.update({food_ID: id}, {$set: foodLog}, function(err, foodLog) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(foodLogs);
            }
        });
        return deferred.promise;
    }

    function deleteFoodLog(id) {
        var deferred = q.defer();

        foodLogModel.remove({food_ID: id}, function(err, status) {
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
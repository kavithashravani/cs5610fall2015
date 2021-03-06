
module.exports = function(app, foodLogModel) {
    app.post("/api/foodLog",insertFoodLog);
    app.get("/api/foodLog/:userName/:date", findFoodLogByUserName);
    //app.update("/api/foodLog/:id/foodLog",updateFoodLog);
    app.delete("/api/foodLog/:userName/:id/:date", deleteFoodLogItem);

    function insertFoodLog(req, res) {
        foodLogModel
            .insertFoodLog(req.body)
            .then(function(foodLog) {
                res.json(foodLog);
            });
    }

    function findFoodLogByUserName(req, res) {
        foodLogModel
            .findFoodLogByUserName(req.params["userName"], req.params["date"])
            .then(function(foodLogItems) {
                res.json(foodLogItems);
            });
    }

    function deleteFoodLogItem(req, res) {
        var userName = req.params["userName"];
        var _date = req.params["date"];
        var foodId = req.params["id"];
        foodLogModel
            .deleteFoodLog(foodId, userName, _date)
            .then(function(foodLogItems) {
                res.json(foodLogItems);
            });
    }

};
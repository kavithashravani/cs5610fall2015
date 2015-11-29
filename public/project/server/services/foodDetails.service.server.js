module.exports = function(app, foodDetailsModel) {
    app.get("/api/foodDetails/:foodId", findDetailsById);

    function findDetailsById(req, res) {
        var foodId = req.params["foodId"];

        foodDetailsModel
            .findDetailsById(foodId)
            .then(function(foodDetails) {
                res.json(foodDetails);
            });
    }

};

module.exports = function(mongoose) {

    var foodLogSchema = mongoose.Schema({
        foodApi_ID: String,
        foodType: String,
        foodName: String,
        calories: String,
        fat:    String,
        carbohydrate: String,
        protein: String,
        Servings: String,
        Date: Date,
        UserName: String
    }, {collection: "cs5610.DietTracker.foodLog"});

    return foodLogSchema;
};

module.exports = function(mongoose) {

    var foodLogSchema = mongoose.Schema({
        food_ID: String,
        foodApi_ID: String,
        foodType: String,
        foodName: String,
        calories: Number,
        UserName: String,
        Servings: String,
        Date: Date
    }, {collection: "mongodb.DietTracker"});

    return foodLogSchema;
};
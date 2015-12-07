module.exports = function(mongoose) {
    var foodLogSchema = mongoose.Schema({
        foodApi_ID: String,
        foodName: String,
        CommentDate: Date,
        UserName: String,
        Comment: String
    }, {collection: "cs5610.DietTracker.comment"});

    return foodLogSchema;
};
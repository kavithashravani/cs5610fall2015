
module.exports = function(mongoose) {

    var userSchema = mongoose.Schema({
        UserName: String,
        FirstName: String,
        LastName: String,
        Email: String,
        Age: Number,
        Weight: Number,
        Password: String
    }, {collection: "mongodb.DietTracker.user"});

    return userSchema;
};
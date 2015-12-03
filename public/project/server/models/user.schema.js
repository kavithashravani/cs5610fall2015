
module.exports = function(mongoose) {

    var userSchema = mongoose.Schema({
        UserName: String,
        FirstName: String,
        LastName: String,
        Email: String,
        Age: Number,
        Weight: Number,
        Password: String
    }, {collection: "cs5610.DietTracker.user"});

    return userSchema;
};
module.exports = function(mongoose) {
    var userSchema = mongoose.Schema({
        id: Number,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }, {collection: "cs5610.assignment.user"});

    return userSchema;
}
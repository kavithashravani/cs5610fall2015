module.exports = function(app, mongoose, db, passport){

    /* searchModel and foodDetailsModel doesn't talk to mongoDB */
    var searchModel = require("./models/search.model.js")(app);
    require("./services/search.service.server.js")(app, searchModel);
    var foodDetailsModel = require("./models/foodDetails.model.js")(app);
    require("./services/foodDetails.service.server.js")(app, foodDetailsModel);

    //require("./models/foodLog.schema.js")(mongoose);
    var foodLogModel = require("./models/foodLog.model.js")(app, mongoose, db);
    require("./services/foodLog.service.server.js")(app, foodLogModel);

    //require("./models/user.schema.js")(mongoose)
    var userModel = require("./models/user.model.js")(app, mongoose, db);
    var userService = require("./services/user.service.server.js")(app, userModel, passport);

    var commentModel = require("./models/comment.model.js")(app, mongoose, db);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);

};
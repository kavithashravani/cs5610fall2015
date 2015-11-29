module.exports = function(app, mongoose, passport){

    var searchModel = require("./models/search.model.js")(app);
    require("./services/search.service.server.js")(app, searchModel);
    var foodDetailsModel = require("./models/foodDetails.model.js")(app);
    require("./services/foodDetails.service.server.js")(app, foodDetailsModel);

    require("./models/foodLog.schema.js")(mongoose);
    var foodLogModel = require("./models/foodLog.model.js")(mongoose);
    require("./services/foodLog.service.server.js")(app, foodLogModel);

    require("./models/user.schema.js")(mongoose)
    var userModel = require("./models/user.model.js")(mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, passport);

};
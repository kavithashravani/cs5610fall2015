module.exports = function(app, mongoose, db) {

    var userModel = require("./models/user.model.js")(app, mongoose, db);
    require("./services/user.service.js")(app, userModel);

    var formModel = require("./models/form.model.js")(app, mongoose, db);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);

};
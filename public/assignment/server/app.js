module.exports = function(app, mongoose) {

    var userModel = require("./models/user.model.js")(app, mongoose);
    require("./services/user.service.js")(app, userModel);

    var formModel = require("./models/form.model.js")(app, mongoose);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);

};
module.exports = function(app) {
    var searchModel = require("./models/search.model.js")(app);
    require("./services/search.service.server.js")(app, searchModel);
};
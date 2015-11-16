module.exports = function(app, userModel) {

    app.post('/api/assignment/user', function(req, res) {
            var user = req.body;
            res.json(userModel.Create(user));
    });

    app.get("/api/assignment/user", function(req, res) {
            //var username = req.params["username"];
            //var password = req.params["password"];
            var username = req.query.username;
            var password = req.query.password;
            if(username == null && password == null) {
                res.json(userModel.FindAll());
            }
            else if(username != null && password == null) {
                res.json(userModel.findUserByUsername(username));
            }
            else if(username != null && password != null) {
                res.json(userModel.findUserByCredentials(username, password));
             }
    });

    app.get(" /api/assignment/user/:id", function(req, res) {
            res.json(userModel.FindById(req.params.id));
    });

    app.put("/api/assignment/user/:id", function(req, res) {
            res.json(userModel.Update(req.params.id));
    });

    app.delete("/api/assignment/user/:id", function(req, res) {
            res.json(userModel.Delete(req.params.id));
    });

}
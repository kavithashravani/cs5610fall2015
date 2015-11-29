module.exports = function(app, userModel) {

    app.post('/api/assignment/user', createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        userModel.Create(user)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
            var username = req.query.username;
            var password = req.query.password;
            //var u = req.params["username"];
            //var p = req.params["password"];
            if(username == "undefined" && password == "undefined") {
                userModel.FindAll()
                    .then(function(users) {
                        res.json(users);
                    })
            }
            else if(username != "undefined" && password == "undefined") {
                userModel.findUserByUsername(username)
                    .then(function(user) {
                        res.json(user);
                    });
            }
            else if(username != "undefined" && password != "undefined") {
                userModel.findUserByCredentials(username, password)
                    .then(function(user) {
                        res.json(user);
                    });
             }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.FindById(userId)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        userModel.Update(userId, newUser)
            .then(function(updatedUser) {
                res.json(updatedUser);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.Delte(userId)
            .then(function(response) {
                res.json(response);
            });

    }
};
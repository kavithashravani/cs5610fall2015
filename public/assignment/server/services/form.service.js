module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", function(req, res) {
        res.json(formModel.FindFormsByUserId(req.params.userId));
    });

    app.get("/api/assignment/form/:formId", function(req, res) {
        res.json(formModel.findById(req.params.formId));
    });

    app.delete("/api/assignment/form/:formId", function(req, res) {
        res.json(formModel.Delete(req.params.formId));
    });

    app.post("/api/assignment/user/:userId/form", function(req, res) {
        res.json(formModel.CreateFormForUser(req.params["userId"], req.body));
    });

    app.put("/api/assignment/form/:formId", function(req, res) {
        res.json(formModel.Update(req.params.formId, req.body));
    });

};
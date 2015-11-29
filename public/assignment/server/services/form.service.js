module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);


    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        formModel.FindFormsByUserId(userId)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findById(formId)
            .then(function(form) {
                res.json(form);
            });
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        formModel.Delete(formId)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function createForm(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        formModel.Create(newForm)
            .then(function(form) {
                res.json(form);
            });
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        formModel.Update(formId, newForm)
            .then(function(forms) {
                res.json(forms);
            });
    }

};
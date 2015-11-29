module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFormFields(req, res) {
        var formId = req.params.formId;
        formModel.FindById(formId)
            .then(function(form) {
                res.json(form.fields);
            });
    }

    function findField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId
        formModel.FindFieldByFormIdFieldId(formId, fieldId)
            .then(function(field) {
                res.json(field);
            })
    }

    function deleteField(req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        formModel.deleteField(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        formModel.createField(formId, newField)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updateField = req.body;
        formModel.updateField(formId, fieldId, updateField)
            .then(function(fields) {
                res.json(fields);
            });
    }

};
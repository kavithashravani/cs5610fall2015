module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", function(req, res) {
        res.json(formModel.FindById(req.params.formId).fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(formModel.FindFieldByFormIdFieldId(req.params.formId, req.params.fieldId));
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(formModel.deleteField(req.params["formId"], req.params["fieldId"]));
    });

    app.post("/api/assignment/form/:formId/field", function(req, res) {
        res.json(formModel.createField(req.params.formId, req.body));
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(formModel.updateField(req.params.formId, req.params.fieldId, req.body));
    });
};
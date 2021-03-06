(function () {

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $routeParams, FieldService) {
        var userId = $routeParams["userId"];
        var formId = $routeParams["formId"];
        var currentUser = $rootScope.currentUser;
        var fieldModel = this;

        fieldModel.addField = addField;
        fieldModel.deleteField = deleteField;

            FieldService.getFieldsForForm(formId)
                .then(function(fields) {
                    fieldModel.fields = fields;
                    console.log("findfieldsforuseridandformid" + fieldModel.fields);
                });

        function addField(fieldType) {
            FieldService.createFieldForForm(formId, fieldType)
                .then(function(fields) {
                    fieldModel.fields = fields;
                });
        }

        function deleteField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function(fields) {
                    fieldModel.fields = fields;
                });
        }
    }

})();
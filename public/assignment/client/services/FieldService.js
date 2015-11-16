(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var fieldTypeObj = {
            "singleLineText": {
                "id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"
            },
            "paragraphTextField": {
                "id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"
            },
            "date": {
                "id": null, "label": "New Date Field", "type": "DATE"
            },
            "dropDown": {
                "id": null, "label": "New Dropdown", "type": "OPTIONS",
                "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]
            },
            "checkBoxes": {
                "id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]
            },
            "radioButtons": {
                "id": null, "label": "New Radio Buttons", "type": "RADIOS",
                "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]
            }
        }
        var fieldService = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }
        return fieldService;

        function createFieldForForm(formId, fieldType) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field", fieldTypeObj[fieldType])
                .success(function(fields) {
                    deferred.resolve(fields);
                })
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(fields) {
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(field) {
                    deferred.resolve(field);
                });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(fields) {
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field)
                .success(function(updatedField){
                    deferred.resolve(updatedField);
                });
            return deferred.promise;
        }
    }
})();
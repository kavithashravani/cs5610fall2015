(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var form_service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return form_service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var curForms = [];
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].userId == userId) {
                    curForm.push(forms[i]);
                }
            }
            callback(curForms);
        }

        function deleteFormById(formId, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].id == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var userId = null;
            for(var i = 0; i < forms.length; i++) {
                if(forms[i].id == formId) {
                    forms[i].name = newForm.name;
                    callback(forms[i]);
                }
            }
        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }

})();
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var formModel = this;
        formModel.addForm = addForm;
        //$scope.$location = $location;
        formModel.updateForm = updateForm;
        formModel.deleteForm = deleteForm;
        formModel.selectForm = selectForm;

        var curUserId = $rootScope.currentUser._id;


            FormService.findAllFormsForUser(curUserId)
                .then(function (forms) {
                    formModel.forms = forms;
                });


        function addForm() {
            var form = {title: formModel.form.title};
            FormService.createFormForUser(curUserId, form)
                .then(function(forms) {
                    console.log(forms);
                    formModel.forms.push(forms);
                    formModel.form = {};
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById(formModel.forms[index]._id)
                .then(function(forms) {
                    formModel.forms = forms;
            });
        }

        function updateForm() {
            if(formModel.selectedForm) {
                var newForm = {title: formModel.form.title};
                FormService.updateFormById(formModel.selectedForm._id, newForm)
                    .then(function(updatedForm) {
                       formModel.form = {};
                });
            }
        }

        function  selectForm(index) {
            formModel.form = formModel.forms[index];
            formModel.selectedForm = formModel.forms[index];
        }
    }

})();
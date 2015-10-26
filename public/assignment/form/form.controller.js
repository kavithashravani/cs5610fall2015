(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var curUserId = $rootScope.currentUser.id;
        FormService.findAllFormsForUser(curUserId, function(forms) {
            $scope.forms = forms;
        });

        function addForm() {
            var form = {name: $scope.form.name};
            FormService.createFormForUser($scope.curUserId, form, function(newForm) {
                        $scope.forms.push(newForm);
                        $scope.form = {};
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index].id, function(forms) {
               $scope.forms = forms;
            });
        }

        function updateForm() {
            if($scope.selectedForm) {
                var newForm = {name: $scope.form.name};
                FormService.updateFormById($scope.selectedForm.id, newForm, function(updatedForm) {
                    $scope.form = {};
                });
            }
        }

        function  selectForm(index) {
            $scope.form.name = $scope.forms[index].name;
            $scope.selectedForm = $scope.forms[index];
        }
    }

})();
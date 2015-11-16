var forms = require("../models/form.mock.json");
var uuid = require('node-uuid');

module.exports = function(app) {
    var formApi = {
        Create: Create,
        CreateFormForUser: CreateFormForUser,
        FindAll: FindAll,
        FindById: FindById,
        FindFormsByUserId: FindFormsByUserId,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        createField: createField,
        updateField: updateField,
        deleteField: deleteField
    }

    return formApi;

    function Create(form) {
        forms.push(form);
        return forms;
    }

    function CreateFormForUser(userId, form) {
        form.id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        return forms;
    }

    function FindAll() {
        return forms;
    }

    function FindById(id) {
        for(var i = 0; i< forms.length; i++) {
            if(forms[i].id == id) {
                return forms[i];
            }
        }
        return null;
    }

    function FindFormsByUserId(userId) {
        var userForms = [];
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].userId = userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function Update(id, newForm) {
        var form = FindById(id);
        for(var key in newForm) {
            form[key] = newForm[key];
        }
        return form;
    }

    function  Delete(id) {
        var index = -1;
         for(var i = 0; i< forms.length; i++) {
               if(forms[i].id == id) {
                    index = i;
          }
         }
         if(forms != -1) {
            forms.splice(index,1);
         }
         return forms;
    }

    function findFormByTitle(title) {
        for(var i = 0; i< forms.length; i++) {
            if(forms[i].title == title) {
                return forms[i];
            }
        }
        return null;
    }

    function createField(formId, field) {
        var form = FindById(formId);
        field.id = uuid.v1();
        form.fields.push(field);
        return form.fields;
    }

    function FindFieldByFormIdFieldId(formId, fieldId) {
        var form = FindById(formId);
        var fields = form.fields;
        for(var j=0; j < fields.length; j++) {
            if(fields[j].id == fieldId) {
                return fields[j];
            }
        }
        return null;
    }

    function updateField(formId, fieldId, updateField) {
        var field = FindFieldByFormIdFieldId(formId, fieldId);
        for(var i in field) {
            field[i] = updateField[i];
        }
        return field;
    }

    function deleteField(formId, fieldId) {
        var form = FindById(formId);
        var fields = form.fields;
        for(var j=0; j < fields.length; j++) {
            if(fields[j].id == fieldId) {
                fields.splice(j, 1);
            }
        }
        return fields;
    }

};
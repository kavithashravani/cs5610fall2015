var forms = require("../models/form.mock.json");
var uuid = require('node-uuid');
var q = require("q");
module.exports = function(app, mongoose, db) {
    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var FieldSchema = require("./field.schema.js")(mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);

    var formApi = {
        Create: Create,
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
        var deferred = q.defer();
        FormModel.create(form, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function CreateFormForUser(userId, form) {
        var deferred = q.defer();

        return deferred.promise;
        form.id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        return forms;
    }

    function FindAll() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
       // return forms;
    }

    function FindById(id) {
        var deferred = q.defer();
        FormModel.findOne({_id: id}, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function FindFormsByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function Update(id, newForm) {
        var deferred = q.defer();
        FormModel.findOne({_id: id}, function(err, foundForm) {
            for(var index in newForm) {
                foundForm[index] = newForm[index];
            }
            foundForm.save(function(err, updatedForm) {
                FormModel.find(function(err, forms) {
                    deferred.resolve(forms);
                });
            });
        });
        return deferred.promise;
    }

    function  Delete(id) {
        var deferred = q.defer();
        FormModel.remove({_id: id}, function(err, response) {
            if(err) {
                deferred.reject(err);
            }
            else {
               FormModel.find(function(err, forms) {
                   deferred.resolve(forms);
               });
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({title: title}, function(err, form) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function createField(formId, field) {
        var deferred = q.defer();
        var newField = new FieldModel(field);
        FormModel.findOne({_id: formId}, function(err, form) {
            console.log(form);
            form.fields.push(newField);
            form.save(function(err, res) {
                deferred.resolve(form.fields);
            });
        });
        return deferred.promise;
    }

    function FindFieldByFormIdFieldId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, form) {
            FieldModel.findOne({_id: fieldId}, function(err, field) {
                deferred.resolve(field);
            });
        });
        return deferred.promise;

    }

    function updateField(formId, fieldId, updateField) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, form) {
            var fields = form.fields;
            var field;
            for(var i = 0; i < fields.length; i++) {
                if(fields[i]._id == fieldId) {
                    field = fields[i];
                }
            }
            for(var index in updateField) {
                field[index] = updateField[index];
            }
            form.save(function(err, res) {
                deferred.resolve(form.fields);
            });
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId}, function(err, form) {
            console.log("Delete *** " + form.fields);
            var fields = form.fields;
            var fieldIndex;
            for(var i = 0; i < fields.length; i++) {
                if(fields[i]._id == fieldId) {
                    fieldIndex = i;
                }
            }
            form.fields.splice(fieldIndex, 1);
            form.save(function(err, res) {
                deferred.resolve(form.fields);
            });
        });
        return deferred.promise;
    }

};
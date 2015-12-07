var q = require("q");

module.exports = function(app, mongoose, db) {
    var CommentSchema = require("./comment.schema.js")(mongoose);
    var commentModel = mongoose.model("CommentModel", CommentSchema);
    var api = {
        insertComment: insertComment,
        findCommentByFoodId: findCommentByFoodId,
        updateComment: updateComment,
        deleteComment: deleteComment,
        findCommentsByUserName: findCommentsByUserName
    };
    return api;

    function insertComment(comment) {
        var deferred = q.defer();

        commentModel.create(comment, function(err, comment) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(comment);
            }
        });
        return deferred.promise;
    }

    function findCommentByFoodId(foodApiID) {
        var deferred = q.defer();

        commentModel.find({foodApi_ID: foodApiID}, function(err, comments) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(comments);
            }
        });
        return deferred.promise;
    }

    function findCommentsByUserName(userName) {
        var deferred = q.defer();

        commentModel.find({UserName: userName}, function(err, comments) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(comments);
            }
        });
        return deferred.promise;
    }

    function updateComment(id, comment) {
        var deferred = q.defer();

        commentModel.update({_id: id}, {$set: comment}, function(err, comment) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(comment);
            }
        });
        return deferred.promise;
    }

    function deleteComment(id, foodApiID) {
        var deferred = q.defer();

        commentModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            }
            else {
                commentModel
                    .find({foodApi_ID: foodApiID}, function(err, comments) {
                        if(err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(comments);
                        }
                    });
            }
        });
        return deferred.promise;
    }
};
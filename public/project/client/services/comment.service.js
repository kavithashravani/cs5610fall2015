(function() {
    angular
        .module("DietTrackerApp")
        .factory("CommentService", CommentService);

    function CommentService($http, $q) {
        var commentServiceApi = {
            insertComment: insertComment,
            updateComment: updateComment,
            deleteComment: deleteComment,
            findAllComments: findAllComments,
            findCommentsByUserName: findCommentsByUserName
        }

        return commentServiceApi;

        function insertComment(comment) {
            var deferred = $q.defer();
            $http.post("/api/comment", comment)
                .success(function(comments) {
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

       function updateComment(commentId, foodId, newComment) {
            var deferred = $q.defer();
            $http.put("/api/comment/"+foodId+"/"+commentId, newComment)
                .success(function(comments) {
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function deleteComment(commentId, foodId) {
            var deferred = $q.defer();
            $http.delete("/api/comment/"+foodId+"/"+commentId)
                .success(function(comments) {
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function findAllComments(foodId) {
            var deferred = $q.defer();
            $http.get("/api/comment/"+foodId)
                .success(function(comments) {
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function findCommentsByUserName(userName) {
            var deferred = $q.defer();
            $http.get("/api/comment/user/"+userName)
                .success(function(comments) {
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }
    }

})();
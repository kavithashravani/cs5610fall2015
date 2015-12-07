module.exports = function(app, commentModel) {
    app.post("/api/comment", insertComment);
    app.get("/api/comment/:foodId", findAllComments);
    app.put("/api/comment/:foodId/:commentId",updateComment);
    app.delete("/api/comment/:foodId/:commentId", deleteComment);
    app.get("/api/comment/user/:userName", findCommentsByUserName);

    function insertComment(req, res) {
        var comment = req.body;
        commentModel
            .insertComment(comment)
            .then(function(comments) {
                res.json(comments);
            });
    }

    function findAllComments(req, res) {
        var foodId = req.params["foodId"];
        commentModel
            .findCommentByFoodId(foodId)
            .then(function(comments) {
                res.json(comments);
            });
    }

    function updateComment(req, res) {
        var foodId = req.params["foodId"];
        var newComment = req.body;
        commentModel
            .updateComment(foodId, newComment)
            .then(function(comments) {
                res.json(comments);
            });
    }

    function deleteComment(req, res) {
        var foodId = req.params["foodId"];
        var commentId = req.params["commentId"];
        commentModel
            .deleteComment(commentId, foodId)
            .then(function(comments) {
                res.json(comments);
            });
    }

    function findCommentsByUserName(req, res) {
        var userName = req.params["userName"];
        commentModel
            .findCommentsByUserName(userName)
            .then(function(comments) {
                res.json(comments);
            });
    }

};
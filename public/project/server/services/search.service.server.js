module.exports = function(app, searchModel) {
    app.get("/api/search/:item", findItems);

   function findItems(req, res) {
        var searchItem = req.params["item"];
       //searchItem = searchItem.replace(/\s+/g, '%20');
       searchModel
            .findItems(searchItem)
            .then(function(searchResults) {
                res.json(searchResults);
            });
        //console.log(searchItem);


    }


};
(function() {
    angular
        .module("DietTrackerApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $q) {
        var searchServiceApi = {
            findItems: findItems
        };

        return searchServiceApi;

        function findItems(item) {
            var searchItem = item.split(/\s+/);
            searchItem.splice(3);
            return $q.all(searchItem.map(function(item) {
                    return $http.get("/api/search/" + item);
            }))
                .then(function(results) {
                    var allResults = {};
                    results.forEach(function (val, i) {
                        allResults[i] = val.data;
                    });
                    return allResults;
                });
        }
    }


 })();
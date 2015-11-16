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
            var deferred = $q.defer();
            $http.get("/api/search/"+item)
                .success(function(response) {
                    deferred.resolve(response)
                });
                return deferred.promise;
        }
    }


 })();
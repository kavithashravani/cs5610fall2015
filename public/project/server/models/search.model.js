var q = require("q");

module.exports = function(app) {

    var searchModelApi = {
        findItems: findItems

    };

    return searchModelApi;

    function findItems(searchItem) {



        var deferred = q.defer();

        // Dependencies and constants
        var rest              = require('restler'),
            crypto            = require('crypto'),
            apiKey           = 'e34fc0d373434bc8bb892bf9d82fa5e1',
            fatSecretRestUrl = 'http://platform.fatsecret.com/rest/server.api',
            sharedSecret     = '74f31d1a083d4ba4871609c0564cd603',
            date             = new Date;

        // Note that the keys are in alphabetical order
        var reqObj = {
            format: 'json',
            method: 'recipes.search',
            oauth_consumer_key: apiKey,
            oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(date.getTime() / 1000),
            oauth_version: '1.0',
            search_expression: searchItem // test query
        };

        // construct a param=value& string and uriEncode
        var paramsStr = '';
        for (var i in reqObj) {
            paramsStr += "&" + i + "=" + reqObj[i];
        }

        // yank off that first "&"
        paramsStr = paramsStr.substr(1);

        var sigBaseStr = "POST&"
            + encodeURIComponent(fatSecretRestUrl)
            + "&"
            + encodeURIComponent(paramsStr);

        // no  Access Token token (there's no user .. we're just calling foods.search)
        sharedSecret += "&";

        var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret).update(sigBaseStr).digest('base64');

        // Add oauth_signature to the request object
        reqObj.oauth_signature = hashedBaseStr;

        // Launch!
        rest.post(fatSecretRestUrl, {
            data: reqObj,
        }).on('complete', function(data, response) {
            //console.log(response);
            //console.log("DATA: " + data + "\n");
            deferred.resolve(data);
        });

        return deferred.promise;

    }

};
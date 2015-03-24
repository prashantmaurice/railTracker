var request = require('request');
var deferred = require('../common-utils/deferred');

function HttpClient() {}

HttpClient.prototype.main = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	return deferred.defer(function (callbacks) {
        function callback(err, resObject, result) {
            if (err || resObject.statusCode > 400) {
                callbacks.failure(err);
            } else {
                callbacks.success(result);
            }
        }
        args.push(callback);
        request.apply(null, args);
    });
};

HttpClient.prototype.getJSON = function(url) {
  var options = {
      url : url,
      method : 'GET',
      headers : {
          "Content-type" : "application/json"
      }
  };
  return this.main(options);
};

HttpClient.prototype.postJSON = function(url, params) {
    var options = {
        url : url,
        method : "POST",
        json : params
    };
    return this.main(options);
};

exports.HttpClient = HttpClient;
exports.getInstance = function() {
	return new HttpClient(); 
};

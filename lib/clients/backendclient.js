var httpClient = require('./httpclient.js').getInstance();
var cfg = require('config').backendServerConfig;

function BackendClient(httpClient, url) {
	this.backendUrl = url;
	this.httpClient = httpClient;
}

BackendClient.prototype.getcall = function(params) {
	var self = this;
    var url = self.backendUrl + '/getcall';
    return self.httpClient.getJSON(url);
};
BackendClient.prototype.getAppToDisplay = function(params) {
    var self = this;
    var url = self.backendUrl + '/getAppToDisplay';
    return self.httpClient.getJSON(url);
};
BackendClient.prototype.sendToMobile = function (params) {
    var self = this;
    var url = self.backendUrl + '/sendToMobile';
    return self.httpClient.postJSON(url, params);
};

exports.BackendClient = BackendClient;
exports.getInstance = function() {
	return new BackendClient(httpClient, cfg.url)
};
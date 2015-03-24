
//var DashboardAPI = require('../lib/dashboardAPI.js');
var fn = require('../lib/common-utils/functions');
var DatabaseAPI = require('../lib/databaseAPI.js');

function callAPI(req, res, apiMethod) {
    var params = {};
    if (req.route.method.toLowerCase() === 'get') { params = req.params; }
    if (req.route.method.toLowerCase() === 'post') { params.post = req.body; }

    apiMethod(params)
        .success(function (result) {
            res.send(result);
        })
        .failure(function (error) {
            console.logger.error(error);
            res.send(500, error);
        });
}

var Dashboard = function (app) {
    var databaseAPI = new DatabaseAPI();

    app.get('/cards/all', function (req, res) {
        databaseAPI.getAllCards(res);
    });

};

module.exports = function (app) {
    return new Dashboard(app);
};
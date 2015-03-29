var express = require('express');
var router = express.Router();

var deferred = require('../lib/common-utils/deferred');
var fn = require('../lib/common-utils/functions');
var repos = require('../lib/repo/repos');
var scraperAPI = new (require('../lib/ScraperAPI.js'))();

function callAPI(req, res, apiMethod) {
    var params = {};
    if (req.method.toLowerCase() === 'get') { params = req.params; }
    if (req.method.toLowerCase() === 'post') { params = req.params; params.post = req.body; }

    apiMethod(params)
        .success(function (result) {
            res.send(result);
        })
        .failure(function (error) {
            console.logger.error(error);
            res.status(500).send(error);
        });
}

router.get('/', function(req, res) {
    res.send({ status : "scraper working"});
});

router.get('/refreshnone', function (req, res) {
    callAPI(req, res, fn.bind(scraperAPI, 'scrapeFromErail'));
});


module.exports = router;
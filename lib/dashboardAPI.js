'use strict';
var deferred = require('./common-utils/deferred');
var fn = require('./common-utils/functions');

var repos = require('./repo/repos.js');
var underscore = require('underscore');

var httpClient = require('./clients/httpclient.js').getInstance();

function DashboardAPI() {}

DashboardAPI.prototype.getAllUsers = function (params) {
    return fn.defer(fn.bind(repos.wlUsersRepo, 'getAllUsers'))({});
};

DashboardAPI.prototype.getImpressions = function (params) {
    var d_mainImpressions = fn.defer(fn.bind(repos.wlImpressionsRepo, 'getImpressionsForClients'))({});
    var d_hookImpressions = fn.defer(fn.bind(repos.wlHookImpressionsRepo, 'getImpressions'))({});
    var d_users = fn.defer(fn.bind(repos.wlUsersRepo, 'getUsersForClient'))({});
    var d_users_hi = fn.defer(fn.bind(repos.wlUsersRepo, 'getUsersForType'))({});
    return deferred.combine({mainImp : d_mainImpressions, hookImp : d_hookImpressions, users : d_users, users_hi : d_users_hi}).pipe(function (result) {
        var _ = underscore;
        var finalResult = _.map(_.groupBy(_.union(result.mainImp, result.users), function (item) {return item.clientId;}), function(array, key) {return _.reduce(array, function (i, j) {return _.extend(i, j);}) });
        finalResult.push({hookImpressions : result.hookImp});
        finalResult.push(result.users_hi);
        return deferred.success(finalResult);
    });
};

module.exports = DashboardAPI;

/**
 * Created by Vijay Simha on 17-06-2014.
 */

var entityModels = require('./entity_models.js');

var WhitelabelImpressionsRepo = {
    entity : entityModels.WhitelabelImpressions,
    saveImpression : function(params, cb) {
        this.entity.create({
            campaignId : params.campaignId,
            clientId : params.clientId
        }).success(function(result) {
            cb(null, result);
        }).error(function(err) {
            cb(err);
        });
    },
    getImpressionsForClients : function (params, cb) {
        sequelize.query("select clientId, count(*) as impressions from whitelabel_impressions group by clientId;")
            .success(function(data) {
                cb(null, data);
            })
            .error(function (err) {
                cb(err);
            });
    }

};

module.exports = WhitelabelImpressionsRepo;
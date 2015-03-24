/**
 * Created by vijay on 19/09/14.
 */

var entityModels = require('./entity_models.js');

var WhitelabelHookImpressionsRepo = {
    entity : entityModels.WhitelabelHookImpressions,
    saveImpression : function(params, cb) {
        this.entity.create({
            campaignId : params.campaignId
        }).success(function(data) {
            cb(null, data.id);
        }).error(function(err) {
            cb(err);
        });
    },
    getImpressions : function(params, cb) {
        this.entity.count().complete(cb);
    }

};

module.exports = WhitelabelHookImpressionsRepo;
/**
 * Created by vijay on 17/09/14.
 */

var entityModels = require('./entity_models.js');

var WhitelabelImpressionsRepo = {
    entity : entityModels.WhitelabelCampaigns,
    getCampaignId : function(params, cb) {
        this.entity.find({
            where : {domain : params.domain}
        }).success(function(data) {
            cb(null, data.id);
        }).error(function(err) {
            cb(err);
        });
    }

};

module.exports = WhitelabelImpressionsRepo;
/**
 * Created by vijay on 18/09/14.
 */


var entityModels = require('./entity_models.js');

var WhitelabelMessagesRepo = {
    entity : entityModels.WhitelabelMessages,
    getMessage : function(params, cb) {
        sequelize.query('select message from whitelabel_client_messages where clientId = (select id from whitelabel_clients where clientName="'+params.clientName+'") and campaignId = (select id from whitelabel_campaigns where domain="'+params.campaignName+'")')
            .success(function(data) {
                cb(null, data[0].message);
            })
            .error(function(err) {
                cb(err);
            });
    }

};

module.exports = WhitelabelMessagesRepo;
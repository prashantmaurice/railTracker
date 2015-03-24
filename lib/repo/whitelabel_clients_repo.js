/**
 * Created by vijay on 17/09/14.
 */

var entityModels = require('./entity_models.js');

var WhitelabelClientsRepo = {
    entity : entityModels.WhitelabelClients,
    getClientId : function(params, cb) {
        this.entity.find({
            where : {clientName : params.clientName}
        }).success(function(data) {
            cb(null, data.id);
        }).error(function(err) {
            cb(err);
        });
    }

};

module.exports = WhitelabelClientsRepo;
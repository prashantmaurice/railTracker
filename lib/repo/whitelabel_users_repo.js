/**
 * Created by vijay on 18/09/14.
 */

var entityModels = require('./entity_models.js');

var WhitelabelUsersRepo = {
    entity : entityModels.WhitelabelUsers,
    storeUser : function(params, cb) {
        var self = this;
        sequelize.query('select a.id as campaignId,b.id as clientId from whitelabel_campaigns as a, whitelabel_clients as b where a.domain="' + params.campaignName + '" and b.clientName="' + params.clientName + '"').success(function (data) {
            data = data[0];
            if(data == null) {
                return cb('not found err');
            }
            self.entity.create({mobileNumber : params.mobileNumber, campaignId : data.campaignId, clientId : data.clientId, type : params.type})
                .success(function(data) {
                    cb(null, data);
                })
                .error(function(err) {
                    cb(err);
                });
        });
    },
    getAllUsers : function (params, cb) {
        this.entity.findAll().complete(cb);
    },
    getUsersForClient : function (params, cb) {
        sequelize.query("select clientId, count(*) as users from whitelabel_users group by clientId;")
            .success(function(data) {
                cb(null, data);
            })
            .error(function (err) {
                cb(err);
            });
    },
    getUsersForType : function(params, cb) {
        sequelize.query("select count(*) as users, type from whitelabel_users group by type")
            .success(function(data){
                cb(null, data);
            })
            .error(function(err) {
                cb(err);
            });
    }

};

module.exports = WhitelabelUsersRepo;
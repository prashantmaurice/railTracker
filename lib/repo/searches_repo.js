/**
 * Created by vijay on 19/09/14.
 */

var entityModels = require('./entity_models.js');

var SearchesRepo = {
    entity : entityModels.SearchesRepo,
    getAllSearches : function(cb) {
        this.entity.findAll().success(function(data) {
            cb(null, data);
        }).error(function(err) {
            cb(err);
        });
    }

};

module.exports = SearchesRepo;
var wlImpressionsRepo = require('./whitelabel_impressions_repo.js');
var wlCampaignRepo = require('./whitelabel_campaign_repo.js');
var wlClientRepo = require('./whitelabel_clients_repo.js');
var wlMessagesRepo = require('./whitelabel_messages_repo.js');
var wlUsersRepo = require('./whitelabel_users_repo.js');
var wlHookImpressionsRepo = require('./whitelabel_hookimp_repo.js');

var searchesRepo = require('./searches_repo.js');

var Repos = {
    wlImpressionsRepo : wlImpressionsRepo,
    wlCampaignRepo : wlCampaignRepo,
    wlClientRepo : wlClientRepo,
    wlMessagesRepo : wlMessagesRepo,
    wlUsersRepo : wlUsersRepo,
    wlHookImpressionsRepo : wlHookImpressionsRepo,

    searchesRepo    :   searchesRepo
};

module.exports = Repos;
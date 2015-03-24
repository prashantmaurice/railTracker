var Sequelize = require('sequelize');

var WhitelabelImpressions = sequelize.define('WhitelabelImpressions', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    campaignId : Sequelize.INTEGER,
    clientId : Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'whitelabel_impressions',
    timestamps: true
});

var WhitelabelCampaigns = sequelize.define('WhitelabelCampaigns', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    domain : Sequelize.STRING
}, {
    freezeTableName: true,
    tableName: 'whitelabel_campaigns',
    timestamps: true
});

var WhitelabelClients = sequelize.define('WhitelabelClients', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    clientName : Sequelize.STRING
}, {
    freezeTableName: true,
    tableName: 'whitelabel_clients',
    timestamps: true
});

var WhitelabelMessages = sequelize.define('WhitelabelMessages', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    clientId : Sequelize.INTEGER,
    campaignId : Sequelize.INTEGER,
    message : Sequelize.TEXT
}, {
    freezeTableName: true,
    tableName: 'whitelabel_client_messages',
    timestamps: true
});

var WhitelabelUsers = sequelize.define('WhitelabelUsers', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    clientId : Sequelize.INTEGER,
    campaignId : Sequelize.INTEGER,
    mobileNumber : Sequelize.STRING,
    type : Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'whitelabel_users',
    timestamps: true
});

var WhitelabelHookImpressions = sequelize.define('WhitelabelHookImpressions', {
    id : { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    campaignId : Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'whitelabel_hook_impressions',
    timestamps: true
});

var SearchesRepo = sequelize.define('SearchesRepo', {
    id :    { type : Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    from :  Sequelize.STRING,
    to  :   Sequelize.STRING
}, {
    freezeTableName: true,
    tableName: 'searches',
    timestamps: false
});




exports.WhitelabelImpressions = WhitelabelImpressions;
exports.WhitelabelCampaigns = WhitelabelCampaigns;
exports.WhitelabelClients = WhitelabelClients;
exports.WhitelabelMessages = WhitelabelMessages;
exports.WhitelabelUsers  = WhitelabelUsers;
exports.WhitelabelHookImpressions = WhitelabelHookImpressions;

exports.SearchesRepo = SearchesRepo;

// sequelize
//   .sync({ force: true })
//   .complete(function(err) {
//      if (!!err) {
//        console.log('An error occurred while creating the table:', err)
//      } else {
//        console.log('It worked!')
//      }
//   });
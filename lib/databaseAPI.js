'use strict';
var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host     : 'localhost',
        port     : 3306,
        user     : 'user',
        password : 'remindme123',
        database : 'remindme'
    }
);
var postResult = function(res,result){
    //restructuring
    var data = result.banks;

    //PRE ADDING DATA IN REWARDSCATEGORY MATCH FOR EASE
    for (var k=0; k<result.categorymatch.length;k++) {
        result.categorymatch[k].categories =[];
        for (var m=0; m<result.categories.length;m++) {
            if(result.categorymatch[k].category_id==result.categories[m].id){
                result.categorymatch[k].category=result.categories[m].category;
            }
        }
    }

    //INSERTING TYPES INTO BANKS
    for (var i=0; i<result.banks.length;i++) {
        result.banks[i].types = [];
        for (var j=0; j<result.types.length;j++) {
            if(result.types[j].bank_id==result.banks[i].id)
                result.banks[i].types.push(result.types[j]);
        }
        //INSERTING REWARDS INTO TYPES
        for (var j=0; j<result.banks[i].types.length;j++) {
            result.banks[i].types[j].rewards = [];
            for (var k=0; k<result.rewards.length;k++) {
                if (result.banks[i].types[j].id == result.rewards[k].type_id)
                    result.banks[i].types[j].rewards.push(result.rewards[k]);
            }
            //INSERTING CATEGORY_id INTO REWARDS
            for (var k=0; k<result.banks[i].types[j].rewards.length;k++) {
                result.banks[i].types[j].rewards[k].categories = [];
                for (var m=0; m<result.categorymatch.length;m++) {
                    if (result.categorymatch[m].reward_id == result.banks[i].types[j].rewards[k].id)
                        result.banks[i].types[j].rewards[k].categories.push(result.categorymatch[m].category);
                }
            }
        }
//        console.log("LOGGER:"+result.banks[j]);
    }

//    //INSERTING REWARDS INTO TYPES
//    for (var i=0; i<result.banks.length;i++) {
//        result.banks[i].types = [];
//        for (var j=0; j<result.types.length;j++) {
//            if(result.types[j].bank_id==result.banks[i].id)
//                result.banks[i].types.push(result.types[j]);
//        }
//        console.log("LOGGER:"+result.banks[j]);
//    }



    res.end(JSON.stringify(result));
}
function DatabaseAPI() {}
DatabaseAPI.prototype.getAllCards = function (res) {
//    connection.connect();

    var queryString = 'SELECT * FROM banks';
    var queryString2 = 'SELECT * FROM CardTypes';
    var queryString3 = 'SELECT * FROM rewards';
    var queryString4 = 'SELECT * FROM categories';
    var queryString5 = 'SELECT * FROM category_reward_match';
    var result = { default2 : 143 };
    var cards = [];
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        result.banks = rows;
        var cards = [];
        connection.query(queryString2, function(err2, rows2, fields2) {
            result.types = rows2;
            connection.query(queryString3, function(err2, rows3, fields2) {
                result.rewards = rows3;
                connection.query(queryString4, function(err2, rows4, fields2) {
                    result.categories = rows4;
                    connection.query(queryString5, function(err2, rows5, fields2) {
                        result.categorymatch = rows5;
                        postResult(res,result);
                    });
                });
            });
        });






//        for (var j in rows2) {
//            var data = {type :rows2[j].type};
//            allTypes.push(data);
//            console.log('Post logic: ', rows2[j].id);
//        };
//
//
//        for (var i in rows) {
//            var allTypes = [];
//            console.log(queryString2+rows[i].id);
//
//            console.log('Post Titles: ', rows[i].bank);
//            var data = {bank:rows[i].bank,data:allTypes};
//            cards.push(data);
////            result = rows;
////             temp={
////                bank : rows[i].bank
////            };
//
////            cards.push(temp);
//        };



    });
//    connection.end();
    return result;
};

module.exports = DatabaseAPI;

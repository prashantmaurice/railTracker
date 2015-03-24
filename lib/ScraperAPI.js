/**
 * Created by vijay on 19/09/14.
 */

'use strict';
var deferred = require('./common-utils/deferred');
var fn = require('./common-utils/functions');

var repos = require('./repo/repos.js');
var underscore = require('underscore');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var catMap = {
    "com.freecharge.android":"cat1",
    "com.olacabs.customer":"cat2"
};


function ScraperAPI() {}

ScraperAPI.prototype.startScraping = function (params) {

    return fn.defer(fn.bind(repos.searchesRepo, 'getAllSearches'))().pipe(function(data) {
        var searches=data;
        searches.forEach(function(searchDetails) {
            scrapeAvailability(searchDetails.from,searchDetails.to,function(err,appData){
                if(1==1) return;
                if(err) return;
//                console.log("Got details for ;"+JSON.stringify(appData));
                appData.coupons.forEach(function(eachcoupon){
                    console.log("Got details for ;"+JSON.stringify(eachcoupon));
                    var coupon = {
                        couponId  :    eachcoupon.couponId,
                        coupondata  :   eachcoupon
                    };
                    var dbOptions = {
                        package : eachcoupon.packageName,
                        appname : eachcoupon.appName,
                        data : JSON.stringify(coupon),
                        couponCode  :   eachcoupon.code
                    };
                    fn.bind(repos.appassistCouponsRepo, 'refreshCoupons')(dbOptions,function(error, result){
                        if(error) console.logger.error(error);
                        console.log("DB UPDATE DONE"+JSON.stringify(result));
                    });
                });
            });
        });
        return deferred.success("Started scraping process");
    });


};
ScraperAPI.prototype.scrapeFromErail = function(params) {
    return deferred.success({success : true});
};

ScraperAPI.prototype.getCouponsDetails = function(params) {
    var appName = params.appname;
    return fn.defer(scrapeAvailability)(appName, null);
};
ScraperAPI.prototype.getAllAppsDetails = function(params) {
    return fn.defer(fn.bind(repos.appassistAppsRepo, 'getAllDetails'))(params).pipe(function(data) {
        return deferred.success(data);
    });
};
function scrapeAvailability(from, to, cb){
    var url = "http://www.cleartrip.com/trains/calendar?from=Bangalore&to=Chennai&class=SL&dateRange=1";
    var options = {
        uri : url,
        method : "GET"
    };
    console.log('getting details for search :', from+"=="+to);
    request(options, function(err, body, response) {
        if(err || body.statusCode > 400) {
            console.log('err occurred in obtained cleartrip page for : ', from);
            cb(err);
        } else {
            console.log("successfully scraped data from cleartrip");
            var $ = cheerio.load(response);

            //for each train row
            var trainNums = [];
            $('td.train').each(function(i,elem){
                var withBrackets = $(this).find('p').html();
                var withoutBracs = withBrackets.replace(/\s+/, "").slice(1,-1);
                trainNums.push(withoutBracs);
                //for each day
                console.log($(this).html());
                console.log("=="+$(this).find($('.waitlist')).length);
                $(this).find('.waitlist').each(function(i,elem2){
                    console.log("WAITLIST:"+elem2.html());
                });
            });
//            console.log("TRAINUMS"+trainNums.toString());
//            console.log("DATA@:"+$('.chart').has('#1229501012015').find('#1229501012015').html());

            //get each trains data
            trainNums.forEach(function(trainNum){
                //form Id
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth()+1;
                var year = date.getFullYear();
                var id =  trainNum;
                if(day<10) id+="0"+day;
                else id+=day;
                if(month<10) id+="0"+month;
                else id+=month;
                id+=year;
//                console.log("ID:"+id.toString());

                //search
            });


//            $('1229501012015')
//
//            $('.offer-big').each(function(i, elem) {
//                coupons[i] = $(this).data('couponid');
//            });
////            var category = $("[itemprop='genre']").text();
//            var count = 0;
//            coupons.forEach(function(couponId) {
//                getCouponDetailsforId(couponId, function(error, coupon) {
//                    count++;
//                    if(!error) {
//                        coupon.packageName = searchData.packageName;
//                        coupon.appName = searchData.appName;
//                        finalDetails.push(coupon);
//                    } else {
//                        console.log('freak!! found an error', error);
//                    }
//                    if(count == coupons.length) {
//                        searchData.coupons = finalDetails;
//                        if(cb!=null)
//                            cb(null, searchData);
//                    }
//                });
//            });
        }
    });
}
function getCouponDetailsforId(id,cb){
    var options = {
        uri : "http://www.coupondunia.in/freecharge?coupon_id="+id+"#c"+id+"",
        method : "GET"
    };
    console.log('getting details for coupon id :', id);
    request(options, function(err, body, response) {
        if(err || body.statusCode > 400) {
            console.log('err occurred in obtained details in coupon id : ', id);
            cb(err);
        } else {
            var $ = cheerio.load(response);
            console.log("got data for code:"+id);
//            console.log("got data for code:");


            var coupon = {};
            coupon.couponId =  id;
            coupon.code = $('[data-couponid=' + id + '] .coupon-code').text();
            coupon.title = $('[data-couponid=' + id + '] .coupon-title').text();
            coupon.description = $('[data-couponid=' + id + '] .coupon-description').text();
            cb(null, coupon);
        }
    });
}


module.exports = ScraperAPI;

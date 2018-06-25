var TopPerformersWiseInventory = function() {};
var mongoose = require("mongoose");
var async = require('async');
var ObjectId = mongoose.Types.ObjectId;
var _ = require("underscore");
var fs = require("fs");
//var InventoryColl = require("../models/schemas").InventoryColl;
var topCustomersAggregation = require("../models/schemas").topCustomersAggregation;
var topCustomersWithoutDate = require("../models/schemas").topCustomersWithoutDate;

var config = require("../config/config");
/*
operatorWiseInventory.prototype.getOperatorWiseInventory = function (callback) {
    var retObj = {};
    async.parallel({
        operators: function (operatorsCallback) {
            InventoryColl.distinct("OperatorName").exec(function (err, operators) {
                operatorsCallback(err, operators);
            })
        },
        aggregatedData: function(agCallback) {
            operatorAggregation.find({}).exec(function (err, aggregatedData) {
                agCallback(err, aggregatedData);
            });
        }
    }, function(error, results){
        retObj.operators = results.operators;
        retObj.aggregatedData = results.aggregatedData;
        retObj.status = true;
        callback(retObj);
    });
}
*/


/*TopPerformersWiseInventory.prototype.getTopCustomersWiseInventory = function (callback) {
    var retObj = {};
    topCustomersAggregation.aggregate([ {$group:{
        _id:{ Mobile :"$_id.Mobile"},
        bookings: { $sum : "$bookings" },
        seats: {$sum : "$seats"},
        TicketAmount: {$sum : "$TicketAmount"}
                  
      }},
      //{$sort : {TicketAmount:-1}}
      {$limit: 500}
      
  ]).allowDiskUse(true).exec(
        function (err, TopPerformersWiseInventory) {
            if (err) {
                retObj.status = false;
                retObj.message = "Error While Getting Inventory "  +err;
                callback(retObj);
            } else if (TopPerformersWiseInventory) {
                console.log('TopPerformersWiseInventory')
                retObj.status = true;
                retObj.message = "Inventory Found";
                retObj.data = TopPerformersWiseInventory;
                callback(retObj);
            } else {
                retObj.status = false;
                retObj.message = "No Data was found";
                callback(retObj);
            }
        })
}
*/

TopPerformersWiseInventory.prototype.getTopCustomersWiseInventory = function (callback) {
    var retObj = {};
    topCustomersWithoutDate.find().limit(500).exec(
        function (err, TopPerformersWiseInventory) {
            if (err) {
                retObj.status = false;
                retObj.message = "Error While Getting Inventory "  +err;
                callback(retObj);
            } else if (TopPerformersWiseInventory) {
                console.log('TopPerformersWiseInventory')
                retObj.status = true;
                retObj.message = "Inventory Found";
                retObj.data = TopPerformersWiseInventory;
                callback(retObj);
            } else {
                retObj.status = false;
                retObj.message = "No Data was found";
                callback(retObj);
            }
        })
}

/*operatorWiseInventory.prototype.getOperatorBookings = function (operatorName, callback) {
    var retObj = {};
    console.log(operatorName);
    operatorAggregation.find({"_id.OperatorName": operatorName}).exec(
        function (err, operatorTransactions) {
            if (err) {
                retObj.status = false;
                retObj.message = "Error While Getting Inventory";
                callback(retObj);
            } else if (operatorTransactions) {
                retObj.status = true;
                retObj.message = "Transactions Found";
                retObj.data = operatorTransactions;
                callback(retObj);
            } else {
                retObj.status = false;
                retObj.message = "No Data was found";
                callback(retObj);
            }
        })
}*/


module.exports = new TopPerformersWiseInventory();

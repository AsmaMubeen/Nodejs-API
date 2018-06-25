var cancellationWiseInventory = function() {};
var mongoose = require("mongoose");
var async = require('async');
var ObjectId = mongoose.Types.ObjectId;
var _ = require("underscore");
var fs = require("fs");
//var InventoryColl = require("../models/schemas").InventoryColl;
var cancellationAggregation = require("../models/schemas").cancellationAggregation;

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


cancellationWiseInventory.prototype.getCancellationWiseInventory = function (callback) {
    var retObj = {};
    cancellationAggregation.aggregate([{$group: {_id: { CancellationDate: "$CancellationDate"},
                bookings:{$sum:"$count" },seats:{$sum:"$seats"},
                CancellationAmount: { $sum: "$TicketAmount"}}}],
        function (err, cancellationWiseInventory) {
            if (err) {
                retObj.status = false;
                retObj.message = "Error While Getting Inventory";
                callback(retObj);
            } else if (cancellationWiseInventory) {
                console.log('cancellationWiseInventory',cancellationWiseInventory)
                retObj.status = true;
                retObj.message = "Inventory Found";
                retObj.data = cancellationWiseInventory;
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

module.exports = new cancellationWiseInventory();
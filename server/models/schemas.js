var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var db = require("../config/config").DB;
/*var options = {
    // live
    //user: db.user,
    //pass: db.password,
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
  };
var connect = mongoose.connect(
    "mongodb://localhost/local",
    options
  );*/
  var connect = mongoose.connect("mongodb://localhost/local");
  var mongoConn = mongoose.connection;
  
  mongoConn.on("error", function(err) {
    console.log("Error while connecting to data base", err);
  });
  
  mongoConn.once("open", function(err) {
    console.log("Sucessfully connected to data base");
  });

  var cancellationAggregation = mongoose.Schema({
    _id: Object,
    count: Number,
    seats: Number,
    CancellationAmount: Number,
    CancellationDate: String
});

var topCustomersAggregation = mongoose.Schema({
  _id: [{Mobile: String, BookedDate: String}],
  bookings: Number,
  seats: Number,
  TicketAmount: Number,
  
});

var topCustomersWithoutDate = mongoose.Schema({
  _id: [{Mobile: String}],
  bookings: Number,
  seats: Number,
  TicketAmount: Number,
  
});

var  cancellationAggregation = connect.model("Cancellation", cancellationAggregation, "Cancellation");

var  topCustomersAggregation = connect.model("TopCustomersWithoutAgents", topCustomersAggregation, "TopCustomersWithoutAgents");

var  topCustomersWithoutDate = connect.model("CustomersWithoutAgentsnDate", topCustomersWithoutDate, "CustomersWithoutAgentsnDate");

module.exports = {
    
    cancellationAggregation:cancellationAggregation,
    topCustomersAggregation : topCustomersAggregation,
    topCustomersWithoutDate : topCustomersWithoutDate

    
};
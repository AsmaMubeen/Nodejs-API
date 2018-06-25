var express = require('express');
var OpenRouter = express.Router();
var AuthRouter = express.Router();
var app = express();
var helloWorld = require('./server/modules/helloWorld');
var cancellation = require('./server/modules/cancellation');
var topPerformers = require('./server/modules/TopPerformers');

app.get('/', function (req, res) {
    console.log("Got a GET request");
    res.send(helloWorld.print());
})


/*app.get('/cancellation', function (req, res) {
    console.log("Got a GET request for cancellation patterns");
    //res.send(helloWorld.print());
    res.json(cancellation.)

})*/

app.get("/cancellation", function(req, res) {
    cancellation.getCancellationWiseInventory(function(result) {
      res.json(result);
    });
  });

app.get("/top-performers", function(req, res) {
    topPerformers.getTopCustomersWiseInventory(function(result) {
      res.json(result);
    });
  });

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
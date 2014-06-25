var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send("App IWH - Test");
});

routes = require('routes/iwhs')(app);

var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;
mongoose.connect('mongodb://' + user + ':' + pass + '@ds031319.mongolab.com:31319/iwh-test', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});

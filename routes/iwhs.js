module.exports = function(app) {

  var IWHData = require('../models/iwhdata.js');

  //GET - Return all iwhs in the DB
  findAllIWHS = function(req, res) {
  	IWHData.find(function(err, iwhs) {
  		if(!err) {
  			res.send(iwhs);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a IWH with specified ID
  findIWHById = function(req, res) {
    IWHData.findById(req.param.id, function(err, iwh) {
      if(!err) {
        res.send(iwh);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new IWH in the DB
  addIWH = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var iwh = new IWHData({
      user:   req.body.user,
      label:  req.body.label,
      lat:    req.body.lat,
      lon:    req.body.lon
    });

    iwh.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(iwh);
  };

  //PUT - Update a register already exists
  updateIWH = function(req, res) {
    IWHData.findById(req.params.id, function(err, iwh) {
      iwh.user  = req.body.user;
      iwh.label = req.body.label;
      iwh.lat   = req.body.lat;
      iwh.lon   = req.body.lon;

      iwh.save(function(err) {
        if(!err) {
      console.log('Updated');
        } else {
      console.log('ERROR: ' + err);
        }

        res.send(iwh);
      });
    });
  };

  //DELETE - Delete a IWH with specified ID
  deleteIWH = function(req, res) {
    IWHData.findById(req.params.id, function(err, iwh) {
      iwh.remove(function(err) {
        if(!err) {
      console.log('Removed');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  };

  testCall = function(req, res) {
    res.send("Test de recuperación de datos -> " + req.params.id);
  };

  //Link routes and functions
  app.get('/iwhs', findAllIWHS);
  app.get('/iwh/:id', findIWHById);
  app.post('/iwh', addIWH);
  app.put('/iwh/:id', updateIWH);
  app.delete('/iwh/:id', deleteIWH);

  app.get('/iwh-test/:id', testCall);
}
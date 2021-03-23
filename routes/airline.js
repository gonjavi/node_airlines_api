const express = require('express');
let app = express();
let Airline = require('../models/airline');

app.get('/airlines', (req, res) => {
  Airline.find({})
    .exec((err, airlines) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      
      res.json({
        ok: true,
        airlines
      });
    });
});

app.get('/airline/:id', (req, res) => {
  let id = req.params.id;

  Airline.findById(id)
    .exec((err, airlineDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    } 

    if (!airlineDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The Airline does not exist'
        }
      });
    }

    res.json({
      ok: true,
      airline: airlineDB
    })
  });
});

app.post('/airlines', (req, res) => {
  let body = req.body;

  const airline = new Airline({
    name: body.name,
    country: body.country,
    number: body.number,
    depart_city: body.depart_city,
    arrive_city: body.arrive_city,
  });

  airline.save((err, airlineDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!airlineDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      airline: airlineDB
    });
  });

  
});

app.delete('/airline/:id', (req, res) => {
  let id = req.params.id;

  Airline.findByIdAndDelete(id, (err, airlineDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!airlineDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The Airline does not exist'
        }
      });
    }

    res.json({
      ok: true,
      message: 'The Airline was deleted'
    });
  });
});


module.exports = app;
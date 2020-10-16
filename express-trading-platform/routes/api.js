const { response } = require('express');
var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();


/* GET users listing. */
router.get('/search', function(req, res, next) {

    var result = {
        results: [],
        total: 0
    };

    res.send(result);

});


/* Search for company names api for autocomplete */
router.get('/search/:ticker', function(req, res, next) {

    companies = [];
    ticker = req.params.ticker;
    console.log("\napi call\n");
    
    fetch(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=8bb5d357e4616c9938090e9e3de7acefc38d224b`)
    .then(res => res.json())
    .then(data => processData(data))
    .then(data => res.send(data));

});


/* Get the details for the company */
router.get('/detail/:ticker', function(req, res, next) {

  details = {};
  ticker = req.params.ticker;
  console.log("\nrequesting company details\n");

  fetch(`https://api.tiingo.com/tiingo/daily/${ticker}?token=8bb5d357e4616c9938090e9e3de7acefc38d224b`)
  .then(res => res.json())
  .then(function(data) {
    details.results = [data];
    details.success = true;
    console.log(details)
    res.send(details)
  });

});


/* Get the details for the company */
router.get('/price/:ticker', function(req, res, next) {

  price = {};
  ticker = req.params.ticker;
  console.log("\nrequesting company price\n");

  fetch(`https://api.tiingo.com/iex/?tickers=${ticker}&token=8bb5d357e4616c9938090e9e3de7acefc38d224b`)
  .then(res => res.json())
  .then(function(data) {
    price.results = data;
    price.success = true;
    console.log(price)
    res.send(price)
  });
});

function processData(data) {

  var result = {
    results: [],
    total: 0
  };

  for (var i = 0; i < data.length; i++){
    console.log()
    if (data[i].name) {
      result.results.push({
        name: data[i].name,
        ticker: data[i].ticker
      })
    }
  }

  result.total = result.results.length;

  return result;

}

module.exports = router;

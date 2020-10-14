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

/* GET users listing. */
router.get('/search/:ticker', function(req, res, next) {

    companies = [];
    ticker = req.params.ticker;
    console.log("\napi call\n");
    
    fetch(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=8bb5d357e4616c9938090e9e3de7acefc38d224b`)
    .then(res => res.json())
    .then(data => processData(data))
    .then(data => res.send(data));

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

var express    = require('express');        
var app        = express();                
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');
var dotenv = require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        
// ROUTES FOR API
// =============================================================================
var router = express.Router();             
app.use(cors({origin: '*'}));

router.get('/mapApi', function(req, res) {
    res.send(process.env.MAP_API);
});


router.get('/tramstops', function(req, res) {
    var options = {
        url: 'https://api.tfgm.com/odata/Metrolinks?$top=500',
        headers: {
          'User-Agent': 'TramApp',
          'Ocp-Apim-Subscription-Key': 'a5d66354dc2642f681f9b24159f49999'
        }
      };

    request(options).pipe(res);
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Starting server: ' + port);

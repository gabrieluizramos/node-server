const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require( 'body-parser' );
const http = require('http');



app.use( express.static( path.join( __dirname, '/' ) ) );
app.use(cors());
app.use(bodyParser.json());

app.get('/api/get_site' , function( req , res ){

    var url = req.query.site.replace( /^(https?|ftp):\/\// , '' ).replace( '/' , '' );

   http.get({ host : url }, function (http_res) {
        var data = "";

        http_res.on("data", function (chunk) {
            
            data += chunk;
        });
        
        http_res.on("end", function () {
            res.send(data);
        });
    });
});

app.listen( 3000 );
var server = require("express");
var request = require('request');
//var request = require('request-promise');

app = server();
app.listen("3000");
console.log('listen on 3000');



app.get("/", function(req, res) {
    var host = 'http://randomvin.com/getvin.php?type=real';
    request(host, function(error, response, data) {
        if (!error && response.statusCode == 200) {
            res.send(data);
        } //end of status 200
    }); //end request
});


app.get("/:num", function(req, res) {
    var number = parseInt(req.params.num) || 1;
    var host = 'http://randomvin.com/getvin.php?type=real';
    var vins = "";
    var j = 0;
    for (var i = 0; i < number; i++) {
        //1.request-promise DEMO
        // request(host)
        //     .then(function(response) {
        //         vins += "\n" + response;
        //         j++;
        //         //console.log(vins);
        //         console.log(j);
        //         //res.send(vins);
        //     })

        //2.raw request DEMO
        request(host, function(error, response, data) {
            if (!error && response.statusCode == 200) {
                vins += "<br>" + data;
                j++;
                if (j == number) {
                    res.send(vins);
                }
            } //end of status 200
        }); //end request
    }

});


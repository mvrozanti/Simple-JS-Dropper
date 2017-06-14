//var http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, {
//        'Content-Type': 'text/plain; charset=UTF-8'
//    });
//    
//    res.end('Hello from POST-Imitator.\n');
//    
//}).listen(9080, "");

function freetexthost(append) {
    var http = require('http');
    var options = {
        host: 'freetexthost.com',
        port: 80,
        path: '/4m2daljefs'
    };

    function login() {
        http.get(options, function (resp) {
            resp.on('data', function (chunk) {
                console.log('Front page: ', chunk.toString().indexOf('form') > -1);
            });
        }).on("error", function (e) {
            console.log("Got error: " + e.message);
        });
    }
    login();

    options.method = 'POST';
    post_data = 'adminpass=1234&edit=+Edit+';
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    };

    save = function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            console.log('Finished adding changes');
        });
    };

    afterLogin = function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            var regex = />([^>]*?)<\/textarea>/;
            var result = str.match(regex);
            post_data = 'text=' + result[1] + append + '&days=&save=+Save+';
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            };
            var req2 = http.request(options, save);
            req2.write(post_data);
            req2.end();
        });
    };

    var req = http.request(options, afterLogin);
    req.write(post_data);
    req.end();
};

freetexthost('bilei');





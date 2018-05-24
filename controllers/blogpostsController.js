var _ = require('underscore');
var querystring = require('querystring');
var https = require('https');
var rss = require('rss');

/**
 * GET blogposts for TestGilde
 */
exports.get = function (req, res, next) {
    var pathBaseUrl = '';
    var queryParams = '';

    var options = {
        host: 'testgilde.atlassian.net',
        path: '/wiki/rest/api/content?type=blogpost&expand=space,version',
        method: 'GET',
        headers: {'Authorization': 'Basic YW5kcmVhcy5zY3plcGFuc2tpQHRlc3RnaWxkZS5kZTplOU9hdGZjYUlGZHZsejlNYWt5QUQxMzQ='}
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf-8');
        var responseStr = '';
    
        response.on('data', function(data) {
            responseStr += data;
        });
    
        response.on('end', function() {
            var blogpostsFull = JSON.parse(responseStr);
            var blogpostsBasic = {};

            var feed = new rss({
                title: 'TestGilde News'
            });
        
            for(var blogpost in blogpostsFull["results"]) {

                feed.item({
                    title: blogpostsFull["results"][blogpost]["space"]["name"]
                        + ", " + blogpostsFull["results"][blogpost]["version"]["by"]["displayName"]
                        + ': ' + blogpostsFull["results"][blogpost]["title"],
                    description: "",
                    url: blogpostsFull["results"][blogpost]["_links"]["tinyui"],
                    date: blogpostsFull["results"][blogpost]["version"]["when"]
                });
            }
            
            /* Publish RSS Feed for blogposts */
            res.set('Content-Type', 'text/xml');
            res.send(feed.xml());
        });
    });
    
    request.end();    
};
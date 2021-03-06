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
        path: '/wiki/rest/api/content?type=blogpost&expand=space,version,body.view',
        method: 'GET',
        headers: {'Authorization': 'Basic bWFnaWMubW9uaXRvckB0ZXN0Z2lsZGUuZGU6QkNac2NwR2RVbXhaT0hNZEF1bnU2QjVE'}
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
                    description: blogpostsFull["results"][blogpost]["body"]["view"]["value"],
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
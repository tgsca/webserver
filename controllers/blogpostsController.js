var _ = require('underscore');
var querystring = require('querystring');
var https = require('https');
var rss = require('rss');

/**
 * GET blogposts for TestGilde
 */
exports.get = function (req, res, next) {
    var options = {
        host: 'testgilde.atlassian.net',
        path: '/wiki/rest/api/content?type=blogpost',
        method: 'GET',
        headers: {'Authorization': 'Basic YW5kcmVhcy5zY3plcGFuc2tpQHRlc3RnaWxkZS5kZTplOU9hdGZjYUlGZHZsejlNYWt5QUQxMzQ='}
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf-8');
        var responseString = '';
    
        response.on('data', function(data) {
            responseString += data;
        });
    
        response.on('end', function() {
            var blogpostsFull = JSON.parse(responseString);
            var blogpostsBasic = {};
        
            var feed = new rss({
                title: 'TestGilde News',
                feed_url: 'http://10.0.1.80/testgildenews.xml'
            });
        
            for(var blogpost in blogpostsFull["results"]) {
                feed.item({
                    title: blogpostsFull["results"][blogpost]["title"],
                    description: blogpostsFull["results"][blogpost]["_expandable"]["space"],
                    url: blogpostsFull["results"][blogpost]["_links"]["tinyui"],
                    date: Date.now()
                });
            }
            
            /* Publish RSS Feed for blogposts */
            res.set('Content-Type', 'text/xml');
            res.send(feed.xml());
        });
    });
    
    request.end();    
};
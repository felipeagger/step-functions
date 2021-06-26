'use strict';

const https = require('https');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 * Example input:
 {
  "options": {
    "host": "jsonplaceholder.typicode.com",
    "port": 443,
    "path": "/users/",
    "path2": "1", <--- optional
    "method": "GET"
  }
}
 */
 
exports.handler = (event, context, callback) => {
    
    let path = event.options.path;
    
    if (event.options.path2) {
        path = event.options.path + event.options.path2;
    }
    
    let options = {
        host: event.options.host,
        port: 443,
        path: path,
        method: event.options.method,
    }

    const req = https.request(options, (res) => {
        let body = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            
            body = JSON.parse(body);
            
             const response = {
                statusCode: res.statusCode,
                body: body,
            };
            
            callback(null, response);
            
        });
    });
    

    req.end();
};


'use strict';
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;           // extract the request object
    console.log("request.uri before: "+request.uri)
    request.uri = request.uri.replace(/^\/[^\/]+\//,'/');  // modify the URI
    console.log("request.uri after: "+request.uri)
    return callback(null, request);                        // return control to CloudFront
};

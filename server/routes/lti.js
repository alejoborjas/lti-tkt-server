const lti = require('ims-lti');
const path = require('path');
const fs = require('fs');
const configJson = fs.readFileSync(path.join(__dirname, '..', '..', 'server-config.json'));
const config = JSON.parse(configJson);
const keys = config.ltiConsumerKeys;

const nonceStore = lti.Stores.MemoryStore();

const getSecret = (consumerKey, callback) => {
    const secret = keys[consumerKey];
    if (secret) {
        return callback(null, secret);
    }

    let err = new Error(`Unknown consumer ${consumerKey}`);
    err.status = 403;

    return callback(err);
};

module.exports = (app) => {
    app.post('/lti', (req, res, next) => {
        if (!req.body) {
            let err = new Error('Expected a body');
            err.status = 400;
            return next(err);
        }
        console.log(req.body);
        const consumerKey = req.body.oauth_consumer_key;
        if (!consumerKey) {
            let err = new Error('Expected a consumer');
            err.status = 422;
            return next(err);
        }

        getSecret(consumerKey, (err, consumerSecret) => {
            if (err) {
                return next(err);
            }

            const provider = new lti.Provider(consumerKey, consumerSecret, nonceStore, lti.HMAC_SHA1);

            provider.valid_request(req, (err, isValid) => {
                if (isValid) {
                    let keys = Object.keys(req.body).sort();
                    console.log('keys', keys);
                    let ltiParams = [];
                    for (let i = 0, length = keys.length; i < length; i++) {
                        ltiParams[keys[i]] = req.body[keys[i]];
                    }
                    console.log("This are are LTI params: " , ltiParams);
                    return res.redirect(301, 'http://localhost:3000/');
                } else {
                    return next(err);
                }
            });
        });
    });
};

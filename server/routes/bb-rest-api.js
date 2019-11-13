const axios = require('axios').default;
const path = require('path');
const fs = require('fs');
const configJson = fs.readFileSync(path.join(__dirname, '..', '..', 'server-config.json'));
const config = JSON.parse(configJson);

let token;
let tokenExpiry = new Date();

module.exports = (app) => {
    const getToken = (origin) => {
        const now = new Date();

        if (token && tokenExpiry && now < tokenExpiry) {
            return Promise.resolve(token);
        } else {
            token = undefined;
            tokenExpiry = new Date();
        }

        return axios
            .request({
                baseUrl: config.bbUrl,
                url: '/learn/api/public/v1/oauth2/token',
                method: 'post',
                auth: {
                    username: config.apiKey,
                    password: config.apiSecret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    grant_type: 'client_credentials'
                },
                data: {},
                responseType: 'json'
            })
            .then((response) => {
                tokenExpiry = new Date();
                if (response.data.expires_in) {
                    tokenExpiry = new Date(tokenExpiry.getTime() + response.data.expires_in);
                }
                token = response.data;
                return response.data;
            });
    };

    app.get('/api/users/:id', (req, res) => {
        const userId = req.params.id;

        return getToken().then((token) =>
            axios
                .request({
                    baseUrl: config.bbUrl,
                    url: `/learn/api/public/v1/users/${userId}`,
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    },
                    responseType: 'json'
                })
                .then(({ data }) => {
                    res.json(data);
                })
                .catch((err) => {
                    console.error('An error occurred while loading user:', JSON.stringify(err));
                    res.status(400).send(err);
                })
        );
    });

    app.get('/api/courses/:id', (req, res) => {
        const courseId = req.params.id;

        return getToken().then((token) =>
            axios
                .request({
                    baseUrl: config.bbUrl,
                    url: `/learn/api/public/v1/courses/${courseId}`,
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    },
                    responseType: 'json'
                })
                .then(({ data }) => {
                    res.json(data);
                })
                .catch((err) => {
                    console.error('An error occurred while loading user:', JSON.stringify(err));
                    res.status(400).send(err);
                })
        );
    });

    app.get('/api/courses/:id/users', (req, res) => {
        const courseId = req.params.id;

        return getToken().then((token) =>
            axios
                .request({
                    baseUrl: config.bbUrl,
                    url: `/learn/api/public/v1/courses/${courseId}/users`,
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    },
                    responseType: 'json'
                })
                .then(({ data }) => {
                    res.json(data);
                })
                .catch((err) => {
                    console.error('An error occurred while loading user:', JSON.stringify(err));
                    res.status(400).send(err);
                })
        );
    });
};

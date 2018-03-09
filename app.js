const Hapi = require('hapi');
const config = require('./config/config');
const path = require('path');
const routes = require('hapi-auto-routes');


const server = Hapi.Server({
    host: 'localhost',
    port: config.port
});

config.DB();

async function start() {
    try {
        await server.start();
        routes.bind(server).register({
            pattern: path.join(__dirname, '/routes/*.js'),
        });
    }
    catch (err) {
        console.log(`An Error Occurred`);
    }
    console.log(`The Server  is running on port no ` + server.info.uri);
}

start();

'use strict';

const Utils = require('../utils');

const internals = {};

// const LOG_IP_THROTTLE = 60000 * 10; // 10 minutes

// Adapted from https://stackoverflow.com/questions/27078285/simple-throttle-in-js#answer-27078401
// const throttle = function (func, limit) {

//     let waiting = false;

//     return function (...args) {

//         if (!waiting) {
//             func.apply(this, args);
//             waiting = true; // Prevent future invocations
//             setTimeout(() => {

//                 waiting = false; // Allow future invocations
//             }, limit);
//         }
//     };
// };

// const logIp = throttle(({ ip, log } = {}) => {

//     log(['info'], {
//         ip,
//         timestampEST: new Date().toLocaleString('us-EN', { timeZone: 'America/New_York' }),
//         loL: true
//     });
// }, LOG_IP_THROTTLE, true);

const logIp = ({ ip, log } = {}) => {

    log(['info'], {
        ip,
        timestampEST: new Date().toLocaleString('us-EN', { timeZone: 'America/New_York' }),
        loL: true
    });
};

// NOTE
// I just realized we want to 'memoize' the logs too so that's
// gonna take more effort than I can give at the moment.
// For now I'm gonna just log on every request — loL: true

module.exports = {
    type: 'onRequest',
    method: (request, h) => {

        const ip = Utils.getRealIp(request);

        logIp({
            log: request.server.log.bind(request.server),
            ip
        });

        return h.continue;
    }
};

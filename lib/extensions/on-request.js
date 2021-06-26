'use strict';

const internals = {};

const LOG_IP_DEBOUNCE = 40000; // 40 seconds

// Adapted from https://stackoverflow.com/questions/27078285/simple-throttle-in-js#answer-27078401
const throttle = function (func, limit) {

    let waiting = false;

    return function (...args) {

        if (!waiting) {
            func.apply(this, args);
            waiting = true; // Prevent future invocations
            setTimeout(() => {

                waiting = false; // Allow future invocations
            }, limit);
        }
    };
};

const logIp = throttle(({ ip, log } = {}) => {

    if (log) {
        log(['info'], {
            ip,
            timestampEST: new Date().toLocaleString('us-EN', { timeZone: 'America/New_York' })
        });
    }
    else {
        console.log('log isn\'t defined...');
    }

}, LOG_IP_DEBOUNCE, true);

module.exports = {
    type: 'onRequest',
    method: (request, h) => {

        let ip;

        if (request.headers['x-forwarded-for']) {
            ip = Array.from(
                new Set(
                    request.headers['x-forwarded-for'].split(', ')
                )
            );
        }
        else {
            ip = request.info.remoteAddress;
        }

        logIp({
            log: request.server.log.bind(request.server),
            ip
        });

        return h.continue;
    }
};

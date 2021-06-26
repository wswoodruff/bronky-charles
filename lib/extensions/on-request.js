'use strict';

const internals = {};

const LOG_IP_DEBOUNCE = 40000; // 40 seconds

// Adapted from https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
internals.debounce = function (func, wait = 500, immediate) {

    let timeout;

    return function (...args) {

        const later = () => {

            timeout = null;

            if (!immediate) {
                func(...args);
            }
        };

        // Note this needs to be set now before 'timeout' is set below.
        // 'timeout' could have been set by a previous iteration.
        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) {
            func(...args);
        }
    };
};

const logIp = internals.debounce(({ log, ip } = {}) => {

    console.log('ip', ip);

    if (log) {
        log(['info'], {
            ip,
            timestampEST: new Date().toLocaleString('us-EN', { timeZone: 'America/New_York' })
        });
    }
    else {
        console.log('log isn\'nt defined...');
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
            log: request.server.log,
            ip
        });

        return h.continue;
    }
};

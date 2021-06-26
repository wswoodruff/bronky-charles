'use strict';

module.exports = {
    type: 'onRequest',
    method: (request, h) => {

        console.log('ip', request.info.remoteAddress);

        return h.continue;
    },
    options: {} // Optional
};

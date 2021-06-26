'use strict';

module.exports = {
    type: 'onRequest',
    method: (request, h) => {

        let ip;

        if (request.headers['x-forwarded-for']) {
            ip = Array.from(
                request.headers['x-forwarded-for']
            );
        }
        else {
            ip = request.info.remoteAddress;
        }

        request.server.log(['info'], { ip });

        return h.continue;
    }
};

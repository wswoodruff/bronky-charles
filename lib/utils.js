'use strict';

exports.getRealIp = (request) => {

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

    return ip;
};

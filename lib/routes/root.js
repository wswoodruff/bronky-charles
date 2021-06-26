'use strict';

const Utils = require('../utils');

module.exports = {
    method: 'get',
    path: '/{bronksPoniousThomson*}',
    handler: (request, h) => {

        // loLL found it suckaaaaaa!
        const options = request.route.realm.pluginOptions;

        return request.render('bronky-charles', {
            title: options.title,
            imageSrc: options.imageSrc,
            redirectLink: options.redirectLink,
            yourIp: request.info.remoteAddress,
            yourRealIp: Utils.getRealIp(request)
        });
    }
};

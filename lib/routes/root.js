'use strict';

module.exports = {
    method: 'get',
    path: '/',
    handler: (request, h) => {

        // loLL found it suckaaaaaa!
        const options = request.route.realm.pluginOptions;

        return request.render('bronky-charles', {
            imageSrc: options.imageSrc,
            redirectLink: options.redirectLink,
            yourIp: request.info.remoteAddress
        });
    }
};

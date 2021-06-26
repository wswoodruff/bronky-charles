'use strict';

const Dotenv = require('dotenv');
const Confidence = require('@hapipal/confidence');
const Toys = require('@hapipal/toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $param: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            log: ['error', 'start', 'info'],
            request: ['error']
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {
                    developmentMode: {
                        $filter: { $env: 'NODE_ENV' },
                        $default: true,
                        production: false
                    },
                    title: process.env.PAGE_TITLE,
                    imageSrc: process.env.IMAGE_SRC,
                    redirectLink: process.env.REDIRECT_LINK
                }
            },
            {
                plugin: {
                    $filter: 'NODE_ENV',
                    $default: '@hapipal/hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});

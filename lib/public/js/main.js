'use strict';

console.log('Hello bronky!');

// Special thanks
console.log('Special thanks to fart.js for the farts! — http://jsfart.com');
console.log('Special thanks to CSShake for the shakes! — https://elrumordelaluz.github.io/csshake');

// 4 the devs
const PLAY_FART_SOUNDS = true;
const RUN_SHAKES = true;

// OPENING SCREEN SHOULD BE BIG WHITE TEXT
// GIMME A HIGH FIVE!!
// WITH BOTH HANDS HIGH FIVE HANDS
// THEN HE TURNS INTO DANCING BRONKY WITH YOUR IP ADDRESS

const utils = {};

utils.randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Init
const chosenFarts = [
    // 'toot', // There's no toot without tuppence
    // 'tuppence', // There's no tuppence without toot
    'ripper',
    'raspberry',
    'trumpet',
    'windy' // Ahhh, Chicago
];

const chosenShakes = [
    'shake-hard',
    'shake-crazy'
];

// Init the farts from fart.js
const { Fart, farts } = require('./fart');

const fart = new Fart({ volume: 100 });

window.Fart = Fart;
window.bronkyFart = fart;
window.farts = farts;

const playFart = (chosenFart) => {

    if (!PLAY_FART_SOUNDS) {
        return;
    }

    fart.play(chosenFart);
};

const bronky = document.getElementById('bronkyContent');

// Init Bronky's shakes from CSShakes
const initShakeClasses = [
    'shake-constant',
    'shake-slow'
    // 'shake-constant--hover'
    // 'shake-freeze'
    // 'shake-opacity'
];

if (RUN_SHAKES) {
    bronky.classList.add(...initShakeClasses);
}

const shakeBronky = (shake, duration) => {

    if (!RUN_SHAKES) {
        return;
    }

    bronky.classList.remove(...chosenShakes);

    bronky.classList.add(shake);

    setTimeout(() => {

        bronky.classList.remove(shake);
    }, duration || Math.random() * 3000 + 2000);
};

const bronkyFart = () => {

    const shakeFartSettings = {
        toot: {
            shakeName: 'shake-hard',
            duration: 1000
        },
        tuppence: {
            shakeName: 'shake-hard',
            duration: 1000
        },
        ripper: {
            shakeName: 'shake-hard',
            duration: 1500
        },
        raspberry: {
            shakeName: 'shake-crazy',
            duration: 2000
        },
        trumpet: {
            shakeName: 'shake-hard',
            duration: 1400
        },
        windy: {
            shakeName: 'shake-hard',
            duration: 5500
        }
    };

    const randomFart = utils.randomFromArray(chosenFarts);

    const { shakeName, duration } = shakeFartSettings[randomFart];

    playFart(randomFart);

    const AUDIO_LOAD_TIMEOUT = 800;
    setTimeout(() => {

        shakeBronky(shakeName, duration);
    }, AUDIO_LOAD_TIMEOUT);
};

// Position the ip address div

const isLocal = window.location.host.startsWith('localhost:');
const isBronky = window.location.host === 'bronkycharles.com';
const isBronkonious = window.location.host === 'bronkoniouscharleston.com';

const urIp = document.getElementById('urip');

urIp.style.top = '175px';

if (isLocal || isBronky) {
    urIp.style.left = '150px';
    urIp.style.transform = 'rotate(-45deg)';
}
else if (isBronkonious) {
    urIp.style.right = '150px';
    urIp.style.transform = 'rotate(45deg)';
}

// Init the webpage playing a fart in case that works.
// Normally the user has to interact with the document before
// a sound can be played.
// At least we'll shake bronky loL
bronkyFart();

setInterval(() => {

    bronkyFart();
}, 10000);

document.onclick = bronkyFart;

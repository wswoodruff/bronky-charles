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
utils.randomFromArrayExcept = (arr, ...except) => {

    const filtered = arr.filter((x) => x !== except);
    return filtered[Math.floor(Math.random() * filtered.length)];
};

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

let isFarting = false;

const shakeBronky = (shake, duration) => {

    if (!RUN_SHAKES) {
        return;
    }

    isFarting = true;

    bronky.classList.remove(...chosenShakes);

    bronky.classList.add(shake);

    // Add some vibration loLL

    window.navigator.vibrate(0);

    const vibrateRange = 1000;
    const restRange = 5;

    const actionDuration = duration || Math.random() * 3000 + 2000;

    const randomRange = (randomDuration, min) => {

        return Math.round(Math.random() * randomDuration + min);
    };

    // Take tally for the while loop until we've reached the actionDuration

    let tally = 0;

    // Note calls to window.navigator.vibrate can receive an array
    // of commands specified by [vibrate, rest, vibrate, rest, etc...]
    // So we'll build a randomized 'vibrationPattern' here to give each
    // fart some 'spice'
    const vibrationPattern = [];

    let tallyI = 0;
    while (tally <= actionDuration) {

        const timeEntry = tallyI % 2 === 0 ? randomRange(vibrateRange, 200) : randomRange(restRange, 200);

        tally += timeEntry;

        // Every even array item is a rest in ms
        // Every odd is a vibration in ms
        vibrationPattern.push(timeEntry);

        ++tallyI;
    }

    // Run it!
    window.navigator.vibrate(vibrationPattern);

    setTimeout(() => {

        bronky.classList.remove(shake);
        window.navigator.vibrate(0);
        isFarting = false;
    }, actionDuration);
};

const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

let isMobile = false;

if (mobileRegex.test(navigator.userAgent) ) {
    isMobile = true;
}

let lastFart = null;
let lastShake = null;

let forceFart = null;

const bronkyFart = () => {

    const shakeFartSettings = {
        toot: {
            shakeNameChoices: ['shake-little', 'shake-rotate'],
            duration: 1000
        },
        tuppence: {
            shakeNameChoices: ['shake-little', 'shake-rotate'],
            duration: 1000
        },
        ripper: {
            shakeNameChoices: ['shake-hard', 'shake-vertical'],
            duration: 1500
        },
        raspberry: {
            shakeNameChoices: ['shake-crazy', 'shake-rotate'],
            duration: 2000
        },
        trumpet: {
            shakeNameChoices: ['shake-hard', 'shake-crazy', 'shake-rotate'],
            duration: 1400
        },
        windy: {
            shakeNameChoices: ['shake-hard', 'shake-rotate'],
            duration: 5800
        }
    };

    const randomFart = forceFart ? forceFart : utils.randomFromArrayExcept(chosenFarts, lastFart) || 'raspberry';

    if (forceFart) {
        forceFart = null;
    }

    lastFart = randomFart;

    const { shakeNameChoices, duration } = shakeFartSettings[randomFart];

    playFart(randomFart);

    const AUDIO_LOAD_TIMEOUT = isMobile ? 200 : 400;
    setTimeout(() => {

        const randomShake = utils.randomFromArrayExcept([].concat(shakeNameChoices), lastShake) || 'shake-rotate';

        lastShake = randomShake;

        shakeBronky(
            randomShake,
            duration
        );
    }, AUDIO_LOAD_TIMEOUT);
};

const okStopTheFarts = document.getElementById('okStopTheFartsBtn');

if (isMobile) {
    console.log('isMobile', isMobile);
    okStopTheFarts.style.padding = '200px';
}

// Position the ip address div

const isLocal = window.location.host.startsWith('localhost:');
const isBronky = window.location.host === 'bronkycharles.com';
const isBronkonious = window.location.host === 'bronkoniouscharleston.com';

const urIp = document.getElementById('urip');

urIp.style.top = '150px';

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

    if (!isFarting) {
        bronkyFart();
    }
}, 10000);

document.onclick = () => {

    forceFart = 'trumpet';
    bronkyFart();
};

// Live chat

//

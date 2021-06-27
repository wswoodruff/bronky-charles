'use strict';

const { Fart, farts } = require('./fart');

console.log('Hello bronky!');

const fart = new Fart({ volume: 100 });

window.Fart = Fart;
window.fart = fart;
window.farts = farts;

// fart.play('windy');

// fart.play('tuppence');

console.log('Special thanks 2 http://jsfart.com');

const chosenFarts = [
    'toot', // There's no toot without tuppence
    'tuppence', // There's no toot without toot
    'ripper',
    'raspberry',
    'trumpet',
    'windy'
];

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

document.onclick = () => {

    fart.play(randomFromArray(chosenFarts));
};

fart.play(randomFromArray(chosenFarts));

// const fart = new Fart({
//     default_sound: farts.toot,
//     loop: false,
//     volume: 100
// });

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
/**
 *
 * fart.js
 * A javascript library for adding fart sounds to your web experience
 *
 *
 * @author 	Tel Smith
 * @tweet 	@74656c
 * @web 	http://jsfart.com/
 * @github 	https://github.com/74656c/fart.js/
 *
 * version 2.0.0
 *
 * Remove need for jQuery for actual plugin
 *
 *
 */

/**
 * Here are the main fart sounds.
 * fart name : fart file (minus extension)
 */

var farts = {
  toot: 'fart1',
  ripper: 'fart2',
  plop: 'fart3',
  squit: 'fart4',
  raspberry: 'fart5',
  squat: 'fart6',
  tuppence: 'fart7',
  liftoff: 'fart8',
  trumpet: 'fart9',
  fizzler: 'fart10',
  windy: 'fart11',
  eine: 'fart12',
  fartception: 'fart13',
  fartpoint1: 'fart14'
};
/**
* This is the Fart constructor.
*
* @class Fart
* @constructor
*
* @param {Object} options Default Sound, Loop and Volume
*/

function Fart(options) {
  this.sound = this.default_sound;
  this.fart_player = null;
  this.old_player = false;
  this.options = this.fartxtend({
    default_sound: farts.raspberry,
    loop: false,
    volume: 50 // 0 - 100

  }, options);
  this.init();
}

Fart.preloaded = false;
/**
 *
 * Mimic jQuery Extend. 			✓
 * Change name for Fart-based LOL. 	✓
 *
 */

Fart.prototype.fartxtend = function (options, defaults) {
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      options[key] = defaults[key];
    }
  }

  return options;
};
/**
* Init the player. Figure out if the old player should be loaded by checking if the audio element has the canPlayType() method
*
* @method init
*/


Fart.prototype.init = function () {
  this.fart_player = document.createElement("audio");

  if (typeof this.fart_player.canPlayType == 'undefined') {
    this.load_old_player();
  }

  this.preload();
};
/**
* If the browser is too old to load an AUDIO element, its probably ie7/8
*
* @method load_old_player
*/


Fart.prototype.load_old_player = function () {
  document.body.innerHTML += '<div style="display:none;"><object id="contentPlayer" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="100" height="100"><param name="volume" value="100%" /><param name="windowlessVideo" value="true"><param name="AnimationatStart" value="0" /><param name="autostart" value="1" /></object></div>';
  this.fart_player = document.getElementById('contentPlayer');
  this.fart_old_player = true;
};
/**
* Play the sound via the browser.
* If a valid $sound is passed, it will play, otherwise it will default to the defaut sound
*
* @method play
* @param {String} foo The name of the sound to play
* @param {String} foo A callback for once the sound has ended
*/


Fart.prototype.play = function (sound, callback) {
  var fart = sound ? farts[sound] ? farts[sound] : sound : this.options.default_sound;
  callback = callback || null;

  if (!this.fart_old_player) {
    var ext = this.fart_player.canPlayType('audio/mp3') ? '.mp3' : '.wav';
    this.fart_player.setAttribute('src', "http://jsfart.com/farts/" + fart + ext);
    this.fart_player.loop = this.options.loop;
    this.fart_player.volume = this.options.volume / 100;
    this.fart_player.play();
    $(this.fart_player).on("ended", function () {
      if (callback) {
        callback();
        $(this.fart_player).off("ended");
      }
    });
  } else {
    this.fart_player.URL = "/farts/" + fart + '.mp3';
  }
};
/**
* Stop the sound from playing
*
* @method stop
*/


Fart.prototype.stop = function () {
  this.fart_player.pause();
};
/**
* Remove the element from the DOM
*
* @method remove
*/


Fart.prototype.remove = function () {
  this.fart_player.remove();
};
/**
* Play a random fart from the list
*
* @method random
*/


Fart.prototype.random = function () {
  var keys = Object.keys(farts);
  var fart = keys[keys.length * Math.random() << 0];
  this.play(fart);
};
/**
* Try and preload the sounds. This was useful when the sound files where on a remote server
*
* @method preload
*/


Fart.prototype.preload = function () {
  var fart_player = this.fart_player;

  if (!this.fart_old_player && !Fart.preloaded) {
    Object.values(farts).forEach(function (val) {
      var ext = fart_player.canPlayType('audio/mp3') ? '.mp3' : '.wav';
      fart_player.setAttribute('src', "/farts/" + val + ext); // console.log('preload:',val);
    });
    Fart.preloaded = true;
  }
};

module.exports = {
  Fart: Fart,
  farts: farts
};

},{}],2:[function(require,module,exports){
'use strict';

var _require = require('./fart'),
    Fart = _require.Fart,
    farts = _require.farts;

console.log('Hello bronky!');
var fart = new Fart({
  volume: 100
});
window.Fart = Fart;
window.fart = fart;
window.farts = farts; // fart.play('windy');
// fart.play('tuppence');

console.log('Special thanks 2 http://jsfart.com');
var chosenFarts = ['toot', // There's no toot without tuppence
'tuppence', // There's no toot without toot
'ripper', 'raspberry', 'trumpet', 'windy'];

var randomFromArray = function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

document.onclick = function () {
  fart.play(randomFromArray(chosenFarts));
};

fart.play(randomFromArray(chosenFarts)); // const fart = new Fart({
//     default_sound: farts.toot,
//     loop: false,
//     volume: 100
// });

},{"./fart":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvcHVibGljL2pzL2ZhcnQuanMiLCJsaWIvcHVibGljL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxLQUFLLEdBQUc7QUFDYixFQUFBLElBQUksRUFBRSxPQURPO0FBRWIsRUFBQSxNQUFNLEVBQUUsT0FGSztBQUdiLEVBQUEsSUFBSSxFQUFFLE9BSE87QUFJYixFQUFBLEtBQUssRUFBRSxPQUpNO0FBS2IsRUFBQSxTQUFTLEVBQUUsT0FMRTtBQU1iLEVBQUEsS0FBSyxFQUFFLE9BTk07QUFPYixFQUFBLFFBQVEsRUFBRSxPQVBHO0FBUWIsRUFBQSxPQUFPLEVBQUUsT0FSSTtBQVNiLEVBQUEsT0FBTyxFQUFFLE9BVEk7QUFVYixFQUFBLE9BQU8sRUFBRSxRQVZJO0FBV2IsRUFBQSxLQUFLLEVBQUUsUUFYTTtBQVliLEVBQUEsSUFBSSxFQUFFLFFBWk87QUFhYixFQUFBLFdBQVcsRUFBRSxRQWJBO0FBY2IsRUFBQSxVQUFVLEVBQUU7QUFkQyxDQUFkO0FBaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBUyxJQUFULENBQWMsT0FBZCxFQUF1QjtBQUN0QixPQUFLLEtBQUwsR0FBYSxLQUFLLGFBQWxCO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsT0FBSyxPQUFMLEdBQWUsS0FBSyxTQUFMLENBQWU7QUFDN0IsSUFBQSxhQUFhLEVBQUcsS0FBSyxDQUFDLFNBRE87QUFFN0IsSUFBQSxJQUFJLEVBQUcsS0FGc0I7QUFHN0IsSUFBQSxNQUFN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WUFBUSxJQUFSO0FBQUEsSUFBYyxLQUFkLFlBQWMsS0FBZDs7QUFFQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFFQSxJQUFNLElBQUksR0FBRyxJQUFJLElBQUosQ0FBUztBQUFFLEVBQUEsTUFBTSxFQUFFO0FBQVYsQ0FBVCxDQUFiO0FBRUEsTUFBTSxDQUFDLElBQVAsR0FBYyxJQUFkO0FBQ0EsTUFBTSxDQUFDLElBQVAsR0FBYyxJQUFkO0FBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxLQUFmLEMsQ0FFQTtBQUVBOztBQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksb0NBQVo7QUFFQSxJQUFNLFdBQVcsR0FBRyxDQUNoQixNQURnQixFQUNSO0FBQ1IsVUFGZ0IsRUFFSjtBQUNaLFFBSGdCLEVBSWhCLFdBSmdCLEVBS2hCLFNBTGdCLEVBTWhCLE9BTmdCLENBQXBCOztBQVNBLElBQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWtCLENBQUMsR0FBRDtBQUFBLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsS0FBZ0IsR0FBRyxDQUFDLE1BQS9CLENBQUQsQ0FBWjtBQUFBLENBQXhCOztBQUVBLFFBQVEsQ0FBQyxPQUFULEdBQW1CLFlBQU07QUFFckIsRUFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLGVBQWUsQ0FBQyxXQUFELENBQXpCO0FBQ0gsQ0FIRDs7QUFLQSxJQUFJLENBQUMsSUFBTCxDQUFVLGVBQWUsQ0FBQyxXQUFELENBQXpCLEUsQ0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqXG4gKiBmYXJ0LmpzXG4gKiBBIGphdmFzY3JpcHQgbGlicmFyeSBmb3IgYWRkaW5nIGZhcnQgc291bmRzIHRvIHlvdXIgd2ViIGV4cGVyaWVuY2VcbiAqXG4gKlxuICogQGF1dGhvciBcdFRlbCBTbWl0aFxuICogQHR3ZWV0IFx0QDc0NjU2Y1xuICogQHdlYiBcdGh0dHA6Ly9qc2ZhcnQuY29tL1xuICogQGdpdGh1YiBcdGh0dHBzOi8vZ2l0aHViLmNvbS83NDY1NmMvZmFydC5qcy9cbiAqXG4gKiB2ZXJzaW9uIDIuMC4wXG4gKlxuICogUmVtb3ZlIG5lZWQgZm9yIGpRdWVyeSBmb3IgYWN0dWFsIHBsdWdpblxuICpcbiAqXG4gKi9cblxuXG4vKipcbiAqIEhlcmUgYXJlIHRoZSBtYWluIGZhcnQgc291bmRzLlxuICogZmFydCBuYW1lIDogZmFydCBmaWxlIChtaW51cyBleHRlbnNpb24pXG4gKi9cblxuY29uc3QgZmFydHMgPSB7XG5cdHRvb3Q6ICdmYXJ0MScsXG5cdHJpcHBlcjogJ2ZhcnQyJyxcblx0cGxvcDogJ2ZhcnQzJyxcblx0c3F1aXQ6ICdmYXJ0NCcsXG5cdHJhc3BiZXJyeTogJ2ZhcnQ1Jyxcblx0c3F1YXQ6ICdmYXJ0NicsXG5cdHR1cHBlbmNlOiAnZmFydDcnLFxuXHRsaWZ0b2ZmOiAnZmFydDgnLFxuXHR0cnVtcGV0OiAnZmFydDknLFxuXHRmaXp6bGVyOiAnZmFydDEwJyxcblx0d2luZHk6ICdmYXJ0MTEnLFxuXHRlaW5lOiAnZmFydDEyJyxcblx0ZmFydGNlcHRpb246ICdmYXJ0MTMnLFxuXHRmYXJ0cG9pbnQxOiAnZmFydDE0J1xufTtcblxuLyoqXG4qIFRoaXMgaXMgdGhlIEZhcnQgY29uc3RydWN0b3IuXG4qXG4qIEBjbGFzcyBGYXJ0XG4qIEBjb25zdHJ1Y3RvclxuKlxuKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBEZWZhdWx0IFNvdW5kLCBMb29wIGFuZCBWb2x1bWVcbiovXG5mdW5jdGlvbiBGYXJ0KG9wdGlvbnMpIHtcblx0dGhpcy5zb3VuZCA9IHRoaXMuZGVmYXVsdF9zb3VuZDtcblx0dGhpcy5mYXJ0X3BsYXllciA9IG51bGw7XG5cdHRoaXMub2xkX3BsYXllciA9IGZhbHNlO1xuXHR0aGlzLm9wdGlvbnMgPSB0aGlzLmZhcnR4dGVuZCh7XG5cdFx0ZGVmYXVsdF9zb3VuZCA6IGZhcnRzLnJhc3BiZXJyeSxcblx0XHRsb29wIDogZmFsc2UsXG5cdFx0dm9sdW1lIDogNTBcdC8vIDAgLSAxMDBcblx0fSwgb3B0aW9ucyk7XG5cdHRoaXMuaW5pdCgpO1xufVxuRmFydC5wcmVsb2FkZWQgPSBmYWxzZTtcblxuLyoqXG4gKlxuICogTWltaWMgalF1ZXJ5IEV4dGVuZC4gXHRcdFx04pyTXG4gKiBDaGFuZ2UgbmFtZSBmb3IgRmFydC1iYXNlZCBMT0wuIFx04pyTXG4gKlxuICovXG5GYXJ0LnByb3RvdHlwZS5mYXJ0eHRlbmQgPSBmdW5jdGlvbihvcHRpb25zLCBkZWZhdWx0cykge1xuICAgIGZvcih2YXIga2V5IGluIGRlZmF1bHRzKXtcbiAgICAgICAgaWYoZGVmYXVsdHMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgIFx0b3B0aW9uc1trZXldID0gZGVmYXVsdHNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5cbi8qKlxuKiBJbml0IHRoZSBwbGF5ZXIuIEZpZ3VyZSBvdXQgaWYgdGhlIG9sZCBwbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBjaGVja2luZyBpZiB0aGUgYXVkaW8gZWxlbWVudCBoYXMgdGhlIGNhblBsYXlUeXBlKCkgbWV0aG9kXG4qXG4qIEBtZXRob2QgaW5pdFxuKi9cbkZhcnQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLmZhcnRfcGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xuXHRpZiAoIHR5cGVvZiAodGhpcy5mYXJ0X3BsYXllci5jYW5QbGF5VHlwZSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLmxvYWRfb2xkX3BsYXllcigpO1xuXHR9XG5cdHRoaXMucHJlbG9hZCgpO1xufTtcblxuLyoqXG4qIElmIHRoZSBicm93c2VyIGlzIHRvbyBvbGQgdG8gbG9hZCBhbiBBVURJTyBlbGVtZW50LCBpdHMgcHJvYmFibHkgaWU3LzhcbipcbiogQG1ldGhvZCBsb2FkX29sZF9wbGF5ZXJcbiovXG5GYXJ0LnByb3RvdHlwZS5sb2FkX29sZF9wbGF5ZXIgPSBmdW5jdGlvbigpIHtcblx0ZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PG9iamVjdCBpZD1cImNvbnRlbnRQbGF5ZXJcIiBjbGFzc2lkPVwiQ0xTSUQ6NkJGNTJBNTItMzk0QS0xMWQzLUIxNTMtMDBDMDRGNzlGQUE2XCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIj48cGFyYW0gbmFtZT1cInZvbHVtZVwiIHZhbHVlPVwiMTAwJVwiIC8+PHBhcmFtIG5hbWU9XCJ3aW5kb3dsZXNzVmlkZW9cIiB2YWx1ZT1cInRydWVcIj48cGFyYW0gbmFtZT1cIkFuaW1hdGlvbmF0U3RhcnRcIiB2YWx1ZT1cIjBcIiAvPjxwYXJhbSBuYW1lPVwiYXV0b3N0YXJ0XCIgdmFsdWU9XCIxXCIgLz48L29iamVjdD48L2Rpdj4nO1xuXHR0aGlzLmZhcnRfcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRQbGF5ZXInKTtcblx0dGhpcy5mYXJ0X29sZF9wbGF5ZXIgPSB0cnVlO1xufTtcblxuLyoqXG4qIFBsYXkgdGhlIHNvdW5kIHZpYSB0aGUgYnJvd3Nlci5cbiogSWYgYSB2YWxpZCAkc291bmQgaXMgcGFzc2VkLCBpdCB3aWxsIHBsYXksIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gdGhlIGRlZmF1dCBzb3VuZFxuKlxuKiBAbWV0aG9kIHBsYXlcbiogQHBhcmFtIHtTdHJpbmd9IGZvbyBUaGUgbmFtZSBvZiB0aGUgc291bmQgdG8gcGxheVxuKiBAcGFyYW0ge1N0cmluZ30gZm9vIEEgY2FsbGJhY2sgZm9yIG9uY2UgdGhlIHNvdW5kIGhhcyBlbmRlZFxuKi9cbkZhcnQucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbihzb3VuZCwgY2FsbGJhY2spIHtcblx0dmFyIGZhcnQgPSAoc291bmQpID8gKGZhcnRzW3NvdW5kXSkgPyBmYXJ0c1tzb3VuZF0gOiBzb3VuZDogdGhpcy5vcHRpb25zLmRlZmF1bHRfc291bmQ7XG5cdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbnVsbDtcblx0aWYgKCF0aGlzLmZhcnRfb2xkX3BsYXllcikge1xuXHRcdHZhciBleHQgPSAodGhpcy5mYXJ0X3BsYXllci5jYW5QbGF5VHlwZSgnYXVkaW8vbXAzJykpID8gJy5tcDMnIDogJy53YXYnO1xuXHRcdHRoaXMuZmFydF9wbGF5ZXIuc2V0QXR0cmlidXRlKCdzcmMnLCBcImh0dHA6Ly9qc2ZhcnQuY29tL2ZhcnRzL1wiICsgZmFydCArIGV4dCk7XG5cdFx0dGhpcy5mYXJ0X3BsYXllci5sb29wID0gdGhpcy5vcHRpb25zLmxvb3A7XG5cdFx0dGhpcy5mYXJ0X3BsYXllci52b2x1bWUgPSAodGhpcy5vcHRpb25zLnZvbHVtZSAvIDEwMCk7XG5cdFx0dGhpcy5mYXJ0X3BsYXllci5wbGF5KCk7XG5cdFx0JCh0aGlzLmZhcnRfcGxheWVyKS5vbihcImVuZGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdCQodGhpcy5mYXJ0X3BsYXllcikub2ZmKFwiZW5kZWRcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5mYXJ0X3BsYXllci5VUkwgPSBcIi9mYXJ0cy9cIiArIGZhcnQgKyAnLm1wMyc7XG5cdH1cbn07XG5cbi8qKlxuKiBTdG9wIHRoZSBzb3VuZCBmcm9tIHBsYXlpbmdcbipcbiogQG1ldGhvZCBzdG9wXG4qL1xuRmFydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmZhcnRfcGxheWVyLnBhdXNlKCk7XG59O1xuXG4vKipcbiogUmVtb3ZlIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTVxuKlxuKiBAbWV0aG9kIHJlbW92ZVxuKi9cbkZhcnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmZhcnRfcGxheWVyLnJlbW92ZSgpO1xufTtcblxuLyoqXG4qIFBsYXkgYSByYW5kb20gZmFydCBmcm9tIHRoZSBsaXN0XG4qXG4qIEBtZXRob2QgcmFuZG9tXG4qL1xuRmFydC5wcm90b3R5cGUucmFuZG9tID0gZnVuY3Rpb24oKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMoZmFydHMpO1xuXHR2YXIgZmFydCA9IGtleXNba2V5cy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpIDw8IDBdO1xuXHR0aGlzLnBsYXkoZmFydCk7XG59O1xuXG4vKipcbiogVHJ5IGFuZCBwcmVsb2FkIHRoZSBzb3VuZHMuIFRoaXMgd2FzIHVzZWZ1bCB3aGVuIHRoZSBzb3VuZCBmaWxlcyB3aGVyZSBvbiBhIHJlbW90ZSBzZXJ2ZXJcbipcbiogQG1ldGhvZCBwcmVsb2FkXG4qL1xuRmFydC5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgZmFydF9wbGF5ZXIgPSB0aGlzLmZhcnRfcGxheWVyO1xuXHRpZiAoIXRoaXMuZmFydF9vbGRfcGxheWVyICYmICFGYXJ0LnByZWxvYWRlZCkge1xuXG5cdFx0T2JqZWN0LnZhbHVlcyhmYXJ0cykuZm9yRWFjaCgodmFsKSA9PiB7XG5cblx0XHRcdHZhciBleHQgPSAoZmFydF9wbGF5ZXIuY2FuUGxheVR5cGUoJ2F1ZGlvL21wMycpKSA/ICcubXAzJyA6ICcud2F2Jztcblx0XHRcdGZhcnRfcGxheWVyLnNldEF0dHJpYnV0ZSgnc3JjJywgXCIvZmFydHMvXCIgKyB2YWwgKyBleHQpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ3ByZWxvYWQ6Jyx2YWwpO1xuXHRcdH0pO1xuXHRcdEZhcnQucHJlbG9hZGVkID0gdHJ1ZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IEZhcnQsIGZhcnRzIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgRmFydCwgZmFydHMgfSA9IHJlcXVpcmUoJy4vZmFydCcpO1xuXG5jb25zb2xlLmxvZygnSGVsbG8gYnJvbmt5IScpO1xuXG5jb25zdCBmYXJ0ID0gbmV3IEZhcnQoeyB2b2x1bWU6IDEwMCB9KTtcblxud2luZG93LkZhcnQgPSBGYXJ0O1xud2luZG93LmZhcnQgPSBmYXJ0O1xud2luZG93LmZhcnRzID0gZmFydHM7XG5cbi8vIGZhcnQucGxheSgnd2luZHknKTtcblxuLy8gZmFydC5wbGF5KCd0dXBwZW5jZScpO1xuXG5jb25zb2xlLmxvZygnU3BlY2lhbCB0aGFua3MgMiBodHRwOi8vanNmYXJ0LmNvbScpO1xuXG5jb25zdCBjaG9zZW5GYXJ0cyA9IFtcbiAgICAndG9vdCcsIC8vIFRoZXJlJ3Mgbm8gdG9vdCB3aXRob3V0IHR1cHBlbmNlXG4gICAgJ3R1cHBlbmNlJywgLy8gVGhlcmUncyBubyB0b290IHdpdGhvdXQgdG9vdFxuICAgICdyaXBwZXInLFxuICAgICdyYXNwYmVycnknLFxuICAgICd0cnVtcGV0JyxcbiAgICAnd2luZHknXG5dO1xuXG5jb25zdCByYW5kb21Gcm9tQXJyYXkgPSAoYXJyKSA9PiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuXG5kb2N1bWVudC5vbmNsaWNrID0gKCkgPT4ge1xuXG4gICAgZmFydC5wbGF5KHJhbmRvbUZyb21BcnJheShjaG9zZW5GYXJ0cykpO1xufTtcblxuZmFydC5wbGF5KHJhbmRvbUZyb21BcnJheShjaG9zZW5GYXJ0cykpO1xuXG4vLyBjb25zdCBmYXJ0ID0gbmV3IEZhcnQoe1xuLy8gICAgIGRlZmF1bHRfc291bmQ6IGZhcnRzLnRvb3QsXG4vLyAgICAgbG9vcDogZmFsc2UsXG4vLyAgICAgdm9sdW1lOiAxMDBcbi8vIH0pO1xuIl19

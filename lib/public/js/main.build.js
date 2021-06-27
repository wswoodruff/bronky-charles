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
}); // fart.play('windy');

fart.play('tuppence'); // const fart = new Fart({
//     default_sound: farts.toot,
//     loop: false,
//     volume: 100
// });

},{"./fart":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvcHVibGljL2pzL2ZhcnQuanMiLCJsaWIvcHVibGljL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxLQUFLLEdBQUc7QUFDYixFQUFBLElBQUksRUFBRSxPQURPO0FBRWIsRUFBQSxNQUFNLEVBQUUsT0FGSztBQUdiLEVBQUEsSUFBSSxFQUFFLE9BSE87QUFJYixFQUFBLEtBQUssRUFBRSxPQUpNO0FBS2IsRUFBQSxTQUFTLEVBQUUsT0FMRTtBQU1iLEVBQUEsS0FBSyxFQUFFLE9BTk07QUFPYixFQUFBLFFBQVEsRUFBRSxPQVBHO0FBUWIsRUFBQSxPQUFPLEVBQUUsT0FSSTtBQVNiLEVBQUEsT0FBTyxFQUFFLE9BVEk7QUFVYixFQUFBLE9BQU8sRUFBRSxRQVZJO0FBV2IsRUFBQSxLQUFLLEVBQUUsUUFYTTtBQVliLEVBQUEsSUFBSSxFQUFFLFFBWk87QUFhYixFQUFBLFdBQVcsRUFBRSxRQWJBO0FBY2IsRUFBQSxVQUFVLEVBQUU7QUFkQyxDQUFkO0FBaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBUyxJQUFULENBQWMsT0FBZCxFQUF1QjtBQUN0QixPQUFLLEtBQUwsR0FBYSxLQUFLLGFBQWxCO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsT0FBSyxPQUFMLEdBQWUsS0FBSyxTQUFMLENBQWU7QUFDN0IsSUFBQSxhQUFhLEVBQUcsS0FBSyxDQUFDLFNBRE87QUFFN0IsSUFBQSxJQUFJLEVBQUcsS0FGc0I7QUFHN0IsSUFBQSxNQUFN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WUFBUSxJQUFSO0FBQUEsSUFBYyxLQUFkLFlBQWMsS0FBZDs7QUFFQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFFQSxJQUFNLElBQUksR0FBRyxJQUFJLElBQUosQ0FBUztBQUFFLEVBQUEsTUFBTSxFQUFFO0FBQVYsQ0FBVCxDQUFiLEMsQ0FFQTs7QUFFQSxJQUFJLENBQUMsSUFBTCxDQUFVLFVBQVYsRSxDQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICpcbiAqIGZhcnQuanNcbiAqIEEgamF2YXNjcmlwdCBsaWJyYXJ5IGZvciBhZGRpbmcgZmFydCBzb3VuZHMgdG8geW91ciB3ZWIgZXhwZXJpZW5jZVxuICpcbiAqXG4gKiBAYXV0aG9yIFx0VGVsIFNtaXRoXG4gKiBAdHdlZXQgXHRANzQ2NTZjXG4gKiBAd2ViIFx0aHR0cDovL2pzZmFydC5jb20vXG4gKiBAZ2l0aHViIFx0aHR0cHM6Ly9naXRodWIuY29tLzc0NjU2Yy9mYXJ0LmpzL1xuICpcbiAqIHZlcnNpb24gMi4wLjBcbiAqXG4gKiBSZW1vdmUgbmVlZCBmb3IgalF1ZXJ5IGZvciBhY3R1YWwgcGx1Z2luXG4gKlxuICpcbiAqL1xuXG5cbi8qKlxuICogSGVyZSBhcmUgdGhlIG1haW4gZmFydCBzb3VuZHMuXG4gKiBmYXJ0IG5hbWUgOiBmYXJ0IGZpbGUgKG1pbnVzIGV4dGVuc2lvbilcbiAqL1xuXG5jb25zdCBmYXJ0cyA9IHtcblx0dG9vdDogJ2ZhcnQxJyxcblx0cmlwcGVyOiAnZmFydDInLFxuXHRwbG9wOiAnZmFydDMnLFxuXHRzcXVpdDogJ2ZhcnQ0Jyxcblx0cmFzcGJlcnJ5OiAnZmFydDUnLFxuXHRzcXVhdDogJ2ZhcnQ2Jyxcblx0dHVwcGVuY2U6ICdmYXJ0NycsXG5cdGxpZnRvZmY6ICdmYXJ0OCcsXG5cdHRydW1wZXQ6ICdmYXJ0OScsXG5cdGZpenpsZXI6ICdmYXJ0MTAnLFxuXHR3aW5keTogJ2ZhcnQxMScsXG5cdGVpbmU6ICdmYXJ0MTInLFxuXHRmYXJ0Y2VwdGlvbjogJ2ZhcnQxMycsXG5cdGZhcnRwb2ludDE6ICdmYXJ0MTQnXG59O1xuXG4vKipcbiogVGhpcyBpcyB0aGUgRmFydCBjb25zdHJ1Y3Rvci5cbipcbiogQGNsYXNzIEZhcnRcbiogQGNvbnN0cnVjdG9yXG4qXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIERlZmF1bHQgU291bmQsIExvb3AgYW5kIFZvbHVtZVxuKi9cbmZ1bmN0aW9uIEZhcnQob3B0aW9ucykge1xuXHR0aGlzLnNvdW5kID0gdGhpcy5kZWZhdWx0X3NvdW5kO1xuXHR0aGlzLmZhcnRfcGxheWVyID0gbnVsbDtcblx0dGhpcy5vbGRfcGxheWVyID0gZmFsc2U7XG5cdHRoaXMub3B0aW9ucyA9IHRoaXMuZmFydHh0ZW5kKHtcblx0XHRkZWZhdWx0X3NvdW5kIDogZmFydHMucmFzcGJlcnJ5LFxuXHRcdGxvb3AgOiBmYWxzZSxcblx0XHR2b2x1bWUgOiA1MFx0Ly8gMCAtIDEwMFxuXHR9LCBvcHRpb25zKTtcblx0dGhpcy5pbml0KCk7XG59XG5GYXJ0LnByZWxvYWRlZCA9IGZhbHNlO1xuXG4vKipcbiAqXG4gKiBNaW1pYyBqUXVlcnkgRXh0ZW5kLiBcdFx0XHTinJNcbiAqIENoYW5nZSBuYW1lIGZvciBGYXJ0LWJhc2VkIExPTC4gXHTinJNcbiAqXG4gKi9cbkZhcnQucHJvdG90eXBlLmZhcnR4dGVuZCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGRlZmF1bHRzKSB7XG4gICAgZm9yKHZhciBrZXkgaW4gZGVmYXVsdHMpe1xuICAgICAgICBpZihkZWZhdWx0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgXHRvcHRpb25zW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufTtcblxuLyoqXG4qIEluaXQgdGhlIHBsYXllci4gRmlndXJlIG91dCBpZiB0aGUgb2xkIHBsYXllciBzaG91bGQgYmUgbG9hZGVkIGJ5IGNoZWNraW5nIGlmIHRoZSBhdWRpbyBlbGVtZW50IGhhcyB0aGUgY2FuUGxheVR5cGUoKSBtZXRob2RcbipcbiogQG1ldGhvZCBpbml0XG4qL1xuRmFydC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdHRoaXMuZmFydF9wbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG5cdGlmICggdHlwZW9mICh0aGlzLmZhcnRfcGxheWVyLmNhblBsYXlUeXBlKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdHRoaXMubG9hZF9vbGRfcGxheWVyKCk7XG5cdH1cblx0dGhpcy5wcmVsb2FkKCk7XG59O1xuXG4vKipcbiogSWYgdGhlIGJyb3dzZXIgaXMgdG9vIG9sZCB0byBsb2FkIGFuIEFVRElPIGVsZW1lbnQsIGl0cyBwcm9iYWJseSBpZTcvOFxuKlxuKiBAbWV0aG9kIGxvYWRfb2xkX3BsYXllclxuKi9cbkZhcnQucHJvdG90eXBlLmxvYWRfb2xkX3BsYXllciA9IGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5ib2R5LmlubmVySFRNTCArPSAnPGRpdiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48b2JqZWN0IGlkPVwiY29udGVudFBsYXllclwiIGNsYXNzaWQ9XCJDTFNJRDo2QkY1MkE1Mi0zOTRBLTExZDMtQjE1My0wMEMwNEY3OUZBQTZcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiPjxwYXJhbSBuYW1lPVwidm9sdW1lXCIgdmFsdWU9XCIxMDAlXCIgLz48cGFyYW0gbmFtZT1cIndpbmRvd2xlc3NWaWRlb1wiIHZhbHVlPVwidHJ1ZVwiPjxwYXJhbSBuYW1lPVwiQW5pbWF0aW9uYXRTdGFydFwiIHZhbHVlPVwiMFwiIC8+PHBhcmFtIG5hbWU9XCJhdXRvc3RhcnRcIiB2YWx1ZT1cIjFcIiAvPjwvb2JqZWN0PjwvZGl2Pic7XG5cdHRoaXMuZmFydF9wbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudFBsYXllcicpO1xuXHR0aGlzLmZhcnRfb2xkX3BsYXllciA9IHRydWU7XG59O1xuXG4vKipcbiogUGxheSB0aGUgc291bmQgdmlhIHRoZSBicm93c2VyLlxuKiBJZiBhIHZhbGlkICRzb3VuZCBpcyBwYXNzZWQsIGl0IHdpbGwgcGxheSwgb3RoZXJ3aXNlIGl0IHdpbGwgZGVmYXVsdCB0byB0aGUgZGVmYXV0IHNvdW5kXG4qXG4qIEBtZXRob2QgcGxheVxuKiBAcGFyYW0ge1N0cmluZ30gZm9vIFRoZSBuYW1lIG9mIHRoZSBzb3VuZCB0byBwbGF5XG4qIEBwYXJhbSB7U3RyaW5nfSBmb28gQSBjYWxsYmFjayBmb3Igb25jZSB0aGUgc291bmQgaGFzIGVuZGVkXG4qL1xuRmFydC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKHNvdW5kLCBjYWxsYmFjaykge1xuXHR2YXIgZmFydCA9IChzb3VuZCkgPyAoZmFydHNbc291bmRdKSA/IGZhcnRzW3NvdW5kXSA6IHNvdW5kOiB0aGlzLm9wdGlvbnMuZGVmYXVsdF9zb3VuZDtcblx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBudWxsO1xuXHRpZiAoIXRoaXMuZmFydF9vbGRfcGxheWVyKSB7XG5cdFx0dmFyIGV4dCA9ICh0aGlzLmZhcnRfcGxheWVyLmNhblBsYXlUeXBlKCdhdWRpby9tcDMnKSkgPyAnLm1wMycgOiAnLndhdic7XG5cdFx0dGhpcy5mYXJ0X3BsYXllci5zZXRBdHRyaWJ1dGUoJ3NyYycsIFwiaHR0cDovL2pzZmFydC5jb20vZmFydHMvXCIgKyBmYXJ0ICsgZXh0KTtcblx0XHR0aGlzLmZhcnRfcGxheWVyLmxvb3AgPSB0aGlzLm9wdGlvbnMubG9vcDtcblx0XHR0aGlzLmZhcnRfcGxheWVyLnZvbHVtZSA9ICh0aGlzLm9wdGlvbnMudm9sdW1lIC8gMTAwKTtcblx0XHR0aGlzLmZhcnRfcGxheWVyLnBsYXkoKTtcblx0XHQkKHRoaXMuZmFydF9wbGF5ZXIpLm9uKFwiZW5kZWRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0JCh0aGlzLmZhcnRfcGxheWVyKS5vZmYoXCJlbmRlZFwiKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmZhcnRfcGxheWVyLlVSTCA9IFwiL2ZhcnRzL1wiICsgZmFydCArICcubXAzJztcblx0fVxufTtcblxuLyoqXG4qIFN0b3AgdGhlIHNvdW5kIGZyb20gcGxheWluZ1xuKlxuKiBAbWV0aG9kIHN0b3BcbiovXG5GYXJ0LnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZmFydF9wbGF5ZXIucGF1c2UoKTtcbn07XG5cbi8qKlxuKiBSZW1vdmUgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4qXG4qIEBtZXRob2QgcmVtb3ZlXG4qL1xuRmFydC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZmFydF9wbGF5ZXIucmVtb3ZlKCk7XG59O1xuXG4vKipcbiogUGxheSBhIHJhbmRvbSBmYXJ0IGZyb20gdGhlIGxpc3RcbipcbiogQG1ldGhvZCByYW5kb21cbiovXG5GYXJ0LnByb3RvdHlwZS5yYW5kb20gPSBmdW5jdGlvbigpIHtcblx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhmYXJ0cyk7XG5cdHZhciBmYXJ0ID0ga2V5c1trZXlzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkgPDwgMF07XG5cdHRoaXMucGxheShmYXJ0KTtcbn07XG5cbi8qKlxuKiBUcnkgYW5kIHByZWxvYWQgdGhlIHNvdW5kcy4gVGhpcyB3YXMgdXNlZnVsIHdoZW4gdGhlIHNvdW5kIGZpbGVzIHdoZXJlIG9uIGEgcmVtb3RlIHNlcnZlclxuKlxuKiBAbWV0aG9kIHByZWxvYWRcbiovXG5GYXJ0LnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24oKSB7XG5cdHZhciBmYXJ0X3BsYXllciA9IHRoaXMuZmFydF9wbGF5ZXI7XG5cdGlmICghdGhpcy5mYXJ0X29sZF9wbGF5ZXIgJiYgIUZhcnQucHJlbG9hZGVkKSB7XG5cblx0XHRPYmplY3QudmFsdWVzKGZhcnRzKS5mb3JFYWNoKCh2YWwpID0+IHtcblxuXHRcdFx0dmFyIGV4dCA9IChmYXJ0X3BsYXllci5jYW5QbGF5VHlwZSgnYXVkaW8vbXAzJykpID8gJy5tcDMnIDogJy53YXYnO1xuXHRcdFx0ZmFydF9wbGF5ZXIuc2V0QXR0cmlidXRlKCdzcmMnLCBcIi9mYXJ0cy9cIiArIHZhbCArIGV4dCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZygncHJlbG9hZDonLHZhbCk7XG5cdFx0fSk7XG5cdFx0RmFydC5wcmVsb2FkZWQgPSB0cnVlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgRmFydCwgZmFydHMgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBGYXJ0LCBmYXJ0cyB9ID0gcmVxdWlyZSgnLi9mYXJ0Jyk7XG5cbmNvbnNvbGUubG9nKCdIZWxsbyBicm9ua3khJyk7XG5cbmNvbnN0IGZhcnQgPSBuZXcgRmFydCh7IHZvbHVtZTogMTAwIH0pO1xuXG4vLyBmYXJ0LnBsYXkoJ3dpbmR5Jyk7XG5cbmZhcnQucGxheSgndHVwcGVuY2UnKTtcblxuLy8gY29uc3QgZmFydCA9IG5ldyBGYXJ0KHtcbi8vICAgICBkZWZhdWx0X3NvdW5kOiBmYXJ0cy50b290LFxuLy8gICAgIGxvb3A6IGZhbHNlLFxuLy8gICAgIHZvbHVtZTogMTAwXG4vLyB9KTtcbiJdfQ==

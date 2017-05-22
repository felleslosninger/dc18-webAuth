(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _test = require('./test/test');

var _test2 = _interopRequireDefault(_test);

var _header = require('./sections/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _test2.default)();
(0, _header2.default)();

},{"./sections/header":2,"./test/test":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuEvents = function menuEvents() {
  var $ = jQuery.noConflict();

  var $menuContainer = $('.h-Menu_Container');
  var $mobileMenuBtn = $('.h-Menu_Trigger-mobile');
  var $subMenuBtn = $('.h-Menu_Trigger');
  $mobileMenuBtn.on('click', function (event) {
    event.preventDefault();
    $mobileMenuBtn.toggleClass('active');
    $menuContainer.toggleClass('h-Menu_Container-open');
  });
  $subMenuBtn.on('click', function (event) {
    event.preventDefault();
    var $selectedMenu = $(event.currentTarget).parent('.h-Menu');
    if ($selectedMenu.hasClass('h-Menu-open')) {
      // menu is open
      $selectedMenu.removeClass('h-Menu-open'); // close it
    } else {
      $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
      $selectedMenu.addClass('h-Menu-open'); // open selected menu
    }
  });
  $(document).on('click', function (event) {
    if (!document.getElementById('js-menues').contains(event.target)) {
      if (!$(event.currentTarget).hasClass('h-Menu_Trigger-mobile')) {
        $('.h-Menu').removeClass('h-Menu-open');
      }
    }
  });
};

exports.default = menuEvents;

},{}],3:[function(require,module,exports){
'use strict';

var test = function test() {
  console.log('test function');
};

module.exports = test;

},{}]},{},[1]);

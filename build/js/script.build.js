(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _header = require('./sections/header');

var _header2 = _interopRequireDefault(_header);

var _tab = require('./sections/tab');

var _tab2 = _interopRequireDefault(_tab);

var _countrySelector = require('./sections/country-selector');

var _countrySelector2 = _interopRequireDefault(_countrySelector);

var _disabledLinks = require('./sections/disabled-links');

var _disabledLinks2 = _interopRequireDefault(_disabledLinks);

var _accordion = require('./sections/accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _minidMenu = require('./sections/minid-menu');

var _minidMenu2 = _interopRequireDefault(_minidMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _header2.default)();
(0, _tab2.default)();
(0, _countrySelector2.default)();
(0, _disabledLinks2.default)();
(0, _accordion2.default)();
(0, _minidMenu2.default)();

},{"./sections/accordion":2,"./sections/country-selector":3,"./sections/disabled-links":4,"./sections/header":5,"./sections/minid-menu":6,"./sections/tab":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var accordion = function accordion() {

  var $ = jQuery.noConflict();

  $('.la-List_Element').on('click', function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var $list = $(document.getElementById($target.attr('aria-controls')));
    // addAnimation class used to prevent animation on page load. Safe to add now:
    $target.find('.fa-angle-down').addClass('addAnimation');
    // There are two animations. They must run simultaneously:
    if ($list.hasClass('open')) {
      // about to close, aria attribute is updated and this triggers arrow animation
      $target.attr('aria-expanded', 'false');
    } else {
      // about to open, aria attribute is updated and this triggers arrow animation
      $target.attr('aria-expanded', 'true');
    }
    // List open / close with animation
    $list.slideToggle(300, function () {
      $list.toggleClass('open');
    });
  });
};

exports.default = accordion;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchList = function () {
	function SearchList() {
		_classCallCheck(this, SearchList);

		var $ = jQuery.noConflict();

		this.inputField = $('input[type=text]');
		this.countrycode = $('input[type=hidden]');
		this.inputList = $('#js-country-list');
		this.trigger = $('#js-trigger');
		this.errorHandler = $('#js-country');
		this.listElements = this.inputList.find('li');
		this.current = 0;
	}

	_createClass(SearchList, [{
		key: 'addEvents',
		value: function addEvents() {

			var $ = jQuery.noConflict();
			var self = this;

			$('form').submit(function (e) {
				if (self.countrycode.val().length === 0) {
					e.preventDefault();
					self.checkInput(self.inputField.val());
				}
			});

			self.inputField.on('keydown', function (e) {
				self.errorHandler.removeClass('error');
				if (e.keyCode === 9) {
					return true;
				}
				if (!self.inputList.hasClass('open')) {
					self.openMenu();
				}
			});

			self.inputField.on('keyup click input', function (e) {

				if (e.keyCode === 27) {
					// Escape, close inputList if open
					e.preventDefault();
					if (self.inputList.hasClass('open')) {
						self.closeMenu();
					}
					return true;
				} else if (e.keyCode === 38) {
					// Up arrow, go to last element in list if list open
					e.preventDefault();
					if (self.inputList.hasClass('open')) {
						$.each(self.listElements, function (j) {
							if ($(this).is(':visible')) {
								$(this).find('> a').focus();
								self.current = j;
							}
						});
					}
					return true;
				} else if (e.keyCode === 40) {
					// Down arrow, go to first element in list if list open
					e.preventDefault();
					if (self.inputList.hasClass('open')) {
						var found = false;
						$.each(self.listElements, function (i) {
							if ($(this).is(':visible') && !found) {
								$(this).find('> a').focus();
								found = true;
								self.current = i;
							}
						});
					}
					return true;
				}
				if (this.value.length > 0) {
					self.listElements.filter(function () {
						var listElm = $(this).find('a').html().toLowerCase();
						var typedText = self.inputField.val().toLowerCase();
						if (listElm.indexOf(typedText) === 0) {
							$(this).show();
							return true;
						} else {
							$(this).hide();
							return false;
						}
					});
				} else {
					self.listElements.show();
				}
			});

			self.trigger.on('click', function (e) {
				e.preventDefault();
				if (!self.inputList.hasClass('open')) {
					self.openMenu();
				} else {
					self.closeMenu();
				}
			});

			self.inputList.find('a').on('click', function (e) {
				e.preventDefault();
				self.inputField.val($(this).html());
				self.countrycode.val($(this).attr('data-id'));
				self.closeMenu();
			});

			self.inputList.find('a').on('keydown', function (e) {
				if (e.keyCode === 38) {
					e.preventDefault();
					var newCurrent = -1;
					var toFocus = null;
					$.each(self.listElements, function (i) {
						if ($(this).is(':visible') && i < self.current) {
							newCurrent = i;
							toFocus = $(this);
						}
					});
					if (newCurrent === -1) {
						$.each(self.listElements, function (j) {
							if ($(this).is(':visible')) {
								$(this).find('> a').focus();
								self.current = j;
							}
						});
					} else {
						if (toFocus !== null) {
							toFocus.find('> a').focus();
							self.current = newCurrent;
						}
					}
				} else if (e.keyCode === 40) {
					e.preventDefault();
					var _newCurrent = -1;
					var _toFocus = null;
					var found = false;
					$.each(self.listElements, function (i) {
						if ($(this).is(':visible') && i > self.current && !found) {
							_newCurrent = i;
							_toFocus = $(this);
							found = true;
						}
					});
					if (_newCurrent === -1) {
						// start from top
						self.current = 0;
						found = false;
						$.each(self.listElements, function (i) {
							if ($(this).is(':visible') && !found) {
								$(this).find('> a').focus();
								found = true;
								self.current = i;
							}
						});
					} else {
						_toFocus.find('> a').focus();
						self.current = _newCurrent;
					}
				} else if (e.keyCode === 9) {
					e.preventDefault();
					self.inputField.val($(this).html());
					self.closeMenu();
					$('.button-holder').find('> .submit').focus();
				}
			});

			$(document).on('click', function (e) {
				if (!document.getElementById('js-country').contains(e.target) && !document.getElementById('js-country-list').contains(e.target)) {
					self.closeMenu();
				}
			});

			$("form").submit(function (e) {
				if (self.countrycode.val().length === 0) {
					e.preventDefault();
					self.checkInput(self.inputField.val());
				}
			});
		}
	}, {
		key: 'openMenu',
		value: function openMenu() {
			var $ = jQuery.noConflict();

			this.updateAria(true);
			this.inputList.slideDown(200, function () {
				$(this).addClass('open');
			});
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			var $ = jQuery.noConflict();

			this.updateAria(false);
			this.inputList.slideUp(200, function () {
				$(this).removeClass('open');
			});
		}
	}, {
		key: 'checkInput',
		value: function checkInput(name) {
			var $ = jQuery.noConflict();
			var self = this;
			var countryId = null;
			$.each(self.listElements, function (i) {
				if (countryId === null) {
					var countryElm = $(this).find('> a');
					if (countryElm.html().toLowerCase() === name.trim().toLowerCase()) {
						countryId = countryElm.attr('data-id');
						self.countrycode.val(countryId);
						return true;
					}
				}
			});
			if (countryId === null) {
				this.errorHandler.addClass('error');
			}
		}
	}, {
		key: 'updateAria',
		value: function updateAria(state) {
			this.inputField.attr('aria-expanded', state);
			this.trigger.attr('aria-expanded', state);
		}
	}]);

	return SearchList;
}();

;

var countrySelector = function countrySelector() {

	var $ = jQuery.noConflict();

	if ($('#js-country-list').length > 0) {
		var searchCtrl = new SearchList();
		searchCtrl.addEvents();
	}
};

exports.default = countrySelector;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var disabledLinks = function disabledLinks() {
  var $ = jQuery.noConflict();

  $('a.disabled').on('click', function (e) {
    e.preventDefault();
  });
};

exports.default = disabledLinks;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuEvents = function menuEvents() {
  var $ = jQuery.noConflict();

  var $menuContainer = $('.h-Menu_Container');
  var $mobileMenuBtn = $('.h-Menu_Trigger-mobile');
  var $subMenuBtn = $('.h-Menu_Trigger');
  var $lastElement = $('.js-last');

  $mobileMenuBtn.on('click', function (event) {
    event.preventDefault();
    $mobileMenuBtn.toggleClass('active');
    $menuContainer.toggleClass('h-Menu_Container-open');
  });

  $subMenuBtn.on('click', function (event) {
    event.preventDefault();
    var $currentTrigger = $(event.currentTarget);
    var $selectedMenu = $currentTrigger.parent('.h-Menu');
    if ($selectedMenu.hasClass('h-Menu-open')) {
      // menu is open
      $selectedMenu.removeClass('h-Menu-open'); // close it
      $currentTrigger.attr('aria-expanded', 'false');
    } else {
      $('.h-Menu-open').find('.h-Menu_Trigger').attr('aria-expanded', 'false');
      $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
      $selectedMenu.addClass('h-Menu-open'); // open selected menu
      $currentTrigger.attr('aria-expanded', 'true');
    }
  });

  $subMenuBtn.on('keydown', function (event) {
    if (event.keyCode === 9 && event.shiftKey) {
      // Shift+tab, go to last element in list if list open
      event.preventDefault();
      if ($(event.currentTarget).parent('.h-Menu').hasClass('h-Menu-open')) {
        $lastElement.focus();
      }
    }
  });

  $lastElement.on('keydown', function (event) {
    if (event.keyCode === 9 && !event.shiftKey) {
      // Tab, go to menu trigger
      event.preventDefault();
      $('.h-Menu-open').find('.h-Menu_Trigger').focus();
    }
  });

  $(document).on('click', function (event) {
    if (!document.getElementById('js-menues').contains(event.target)) {
      if (!$(event.currentTarget).hasClass('h-Menu_Trigger-mobile')) {
        $('.h-Menu_Trigger').attr('aria-expanded', 'false');
        $('.h-Menu').removeClass('h-Menu-open');
      }
    }
  });
};

exports.default = menuEvents;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var minidMenu = function minidMenu() {
  var $ = jQuery.noConflict();

  var $miMenu = $('.mi-Menu');
  if ($miMenu.length === 0) {
    // Current page has no minID menu, no need to add event handlers
    return;
  }

  var $miMenuTrigger = $('.mi-Menu_Trigger');
  var $lastMenuElement = $miMenu.find('.js-last');

  $miMenuTrigger.on('click', function (e) {
    e.preventDefault();
    $miMenu.toggleClass('mi-Menu-open');
    if ($miMenu.hasClass('mi-Menu-open')) {
      $miMenuTrigger.attr('aria-expanded', 'true');
    } else {
      $miMenuTrigger.attr('aria-expanded', 'false');
    }
  });

  $miMenuTrigger.on('keydown', function (e) {
    if (e.keyCode === 9 && e.shiftKey) {
      // Shift+tab, go to last element in list if list open
      e.preventDefault();
      if ($miMenu.hasClass('mi-Menu-open')) {
        $lastMenuElement.focus();
      }
    }
  });

  $lastMenuElement.on('keydown', function (e) {
    if (e.keyCode === 9 && !e.shiftKey) {
      // Tab, go to menu trigger
      e.preventDefault();
      $miMenuTrigger.focus();
    }
  });

  $(document).on('click', function (event) {
    if (!document.getElementById('js-mi-menu').contains(event.target)) {
      $miMenuTrigger.attr('aria-expanded', 'false');
      $miMenu.removeClass('mi-Menu-open');
    }
  });
};

exports.default = minidMenu;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuEvents = function menuEvents() {
  var $ = jQuery.noConflict();

  $('.tb-Header a').on('click', function (event) {
    event.preventDefault();

    var $el = $(event.currentTarget);
    var $target = $el.data('target');
    $el.addClass('active').siblings().removeClass('active').end().closest('.tb-Container').find('.tb-Tab').hide().end().find('[data-id=' + $target + ']').show();
  });

  $('.tb-Header a').on('mouseout', function (event) {
    var $el = $(event.currentTarget);
    $el.blur();
    console.log('here');
  });
};

exports.default = menuEvents;

},{}]},{},[1]);

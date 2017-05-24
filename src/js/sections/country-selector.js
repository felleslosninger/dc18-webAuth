class SearchList {

  constructor() {
    const $ = jQuery.noConflict();

  	this.inputField = $("input[type=text]");
  	this.countrycode = $("input[type=hidden]");
  	this.inputList = $("#js-country-list");
  	this.trigger = $("#js-trigger");
  	this.listElements = this.inputList.find("li");
  	this.current = 0;
  }

	addEvents() {

    const $ = jQuery.noConflict();
		let self = this;

		$("form").submit(function(e){
			if (self.countrycode.val().length === 0) {
				e.preventDefault();
				self.checkInput(self.inputField.val());
			}
		});

		self.inputField.on("keydown", function() {
			if (!self.inputList.hasClass("open")) {
				self.openMenu();
			}
		});

		self.inputField.on("keyup click input", function(e) {

			if (e.keyCode === 27) { // Escape, close inputList if open
				e.preventDefault();
				if (self.inputList.hasClass("open")) {
					self.closeMenu();
				}
				return true;
			}
			else if (e.keyCode === 38) { // Up arrow, go to last element in list if list open
				e.preventDefault();
				if (self.inputList.hasClass("open")) {
					$.each(self.listElements, function(j) {
						if ($(this).is(":visible")) {
							$(this).find("> a").focus();
							self.current = j;
						}
					});
				}
				return true;
			}
			else if (e.keyCode === 40) { // Down arrow, go to first element in list if list open
				e.preventDefault();
				if (self.inputList.hasClass("open")) {
					let found = false;
					$.each(self.listElements, function(i) {
						if ($(this).is(":visible") && !found) {
							$(this).find("> a").focus();
							found = true;
							self.current = i;
						}
					});
				}
				return true;
			}
			if (this.value.length > 0) {
				self.listElements.filter(function() {
					let listElm = $(this).find("a").html().toLowerCase();
					let typedText =self.inputField.val().toLowerCase();
					if (listElm.indexOf(typedText) === 0) {
						$(this).show();
						return true;
					}
					else {
						$(this).hide();
						return false;
					}
				});
			}
			else {
				self.listElements.show();
			}
		});

		self.trigger.on("click", function(e) {
			e.preventDefault();
			if (!self.inputList.hasClass("open")) {
				self.openMenu();
			}
			else {
				self.closeMenu();
			}
		});

		self.inputList.find("a").on("click", function(e) {
			e.preventDefault();
			self.inputField.val($(this).html());
			self.countrycode.val($(this).attr("data-id"));
			self.closeMenu();
		});

		self.inputList.find("a").on("keydown", function(e) {
			if (e.keyCode === 38) {
				e.preventDefault();
				let newCurrent = -1;
				let toFocus = null;
				$.each(self.listElements, function(i) {
					if ($(this).is(":visible") && i < self.current) {
						newCurrent = i;
						toFocus = $(this);
					}
				});
				if (newCurrent === -1) {
					$.each(self.listElements, function(j) {
						if ($(this).is(":visible")) {
							$(this).find("> a").focus();
							self.current = j;
						}
					});
				}
				else {
					if (toFocus !== null) {
						toFocus.find("> a").focus();
						self.current = newCurrent;
					}
				}
			}
			else if (e.keyCode === 40) {
				e.preventDefault();
				let newCurrent = -1;
				let toFocus = null;
				let found = false;
				$.each(self.listElements, function(i) {
					if ($(this).is(":visible") && i > self.current && !found) {
						newCurrent = i;
						toFocus = $(this);
						found = true;
					}
				});
				if (newCurrent === -1) {
					// start from top
					self.current = 0;
					found = false;
					$.each(self.listElements, function(i) {
						if ($(this).is(":visible") && !found) {
							$(this).find("> a").focus();
							found = true;
							self.current = i;
						}
					});

				}
				else {
					toFocus.find("> a").focus();
					self.current = newCurrent;
				}
			}
			else if (e.keyCode === 9) {
				e.preventDefault();
				self.inputField.val($(this).html());
				self.closeMenu();
				$(".button-holder").find("> .submit").focus();
			}
		});
	}

	openMenu() {
    const $ = jQuery.noConflict();

		this.inputList.slideDown(200, function() {
			$(this).addClass("open");
		});
	}

	closeMenu() {
    const $ = jQuery.noConflict();

		this.inputList.slideUp(200, function() {
			$(this).removeClass("open");
		});
	}

	checkInput(name) {
    const $ = jQuery.noConflict();
		let self = this;
		let countryId = null;
		$.each(self.listElements, function(i) {
			if (countryId === null) {
				let countryElm = $(this).find("> a");
				if (countryElm.html().toLowerCase() === name.trim().toLowerCase()) {
					countryId = countryElm.attr("data-id");
					self.countrycode.val(countryId);
					return true;
				}
			}
		});
	}
};



const countrySelector = () => {

  const $ = jQuery.noConflict();

	if ($("#js-country-list").length > 0) {
		let searchCtrl = new SearchList();
		searchCtrl.addEvents();
	}
};

export default countrySelector;

//
//  Responsive Elements
//  Copyright (c) 2013 Kumail Hunaid
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

var ResponsiveElements = {
	elementsAttributeName: 'data-respond',
	maxRefreshRate: 5,
	defaults: {
		//  Minimum width to add a breakpoint
		min: 100,
		// Maximum width to add a breakpoint
		max: 900,
		// Step amount to skip breakpoints
		step: 50
	},
	init: function() {
		var self = this;
		$(function() {
			self.el = {
				window: $(window),
				responsiveElements: $('[' + self.elementsAttributeName + ']')
			};

			self.events();
		});
	},

	addElement: function(element) {
		this.el.responsiveElements = this.el.responsiveElements.add(element);
	},

	removeElement: function(element) {
		this.el.responsiveElements = this.el.responsiveElements.not(element);
	},

	parseOptions: function(optionsString) {
		// data-respond="{"min": 100, "max": 900, "step": 50, "watch": true}"
		if (!optionsString) return false;

		this._optionsCache = this._optionsCache || {};
		if (this._optionsCache[optionsString]) return this._optionsCache[optionsString];

		var optionsObject = JSON.parse(optionsString);

		for (var key in optionsObject) {
			var value = optionsObject[key];

			if (value.toString().slice(-2) === 'px') {
				value = value.replace('px', '');
			}

			if (!isNaN(value)) {
				value = parseInt(value, 10);
			}

			optionsObject[key] = value;
		}

		this._optionsCache[optionsString] = optionsObject;

		return optionsObject;
	},
	generateBreakpointsOnAllElements: function() {
		var self = ResponsiveElements;
		self.el.responsiveElements.each(function(i, _el) {
			self.generateBreakpointsOnElement($(_el));
		});
	},
	generateBreakpointsOnElement: function(_el) {
		var optionsString = _el.attr(this.elementsAttributeName),
			options = this.parseOptions(optionsString) || this.defaults,
			breakpoints = this.generateBreakpoints(_el.width(), options);

		this.cleanUpBreakpoints(_el);
		_el.addClass(breakpoints.join(' '));
	},
	generateBreakpoints: function(width, options) {
		var min = options.min,
			max = options.max,
			step = options.step,
			i = step > min ? step : ~~(min / step) * step,
			classes = [];

		while (i <= max) {
			if (i < width) classes.push('v-gt' + i);
			if (i > width) classes.push('v-lt' + i);
			if (i == width) classes.push('v-lt' + i);

			i += step;
		}

		return classes;
	},
	parseBreakpointClasses: function(breakpointsString) {
		var classes = breakpointsString.split(/\s+/),
			breakpointClasses = [];

		$(classes).each(function(i, className) {
			if (className.match(/^v-gt\d+|v-lt\d+$/)) breakpointClasses.push(className);
		});

		return breakpointClasses;
	},
	cleanUpBreakpoints: function(_el) {
		var classesToCleanup = this.parseBreakpointClasses(_el.attr('class') || '');
		_el.removeClass(classesToCleanup.join(' '));
	},
	events: function() {
		this.generateBreakpointsOnAllElements();

		this.el.window.bind('resize', this.utils.debounce(
			this.generateBreakpointsOnAllElements, this.maxRefreshRate));
	},
	utils: {
		// Debounce is part of Underscore.js 1.5.2 http://underscorejs.org
		// (c) 2009-2013 Jeremy Ashkenas. Distributed under the MIT license.
		debounce: function(func, wait, immediate) {
			// Returns a function, that, as long as it continues to be invoked,
			// will not be triggered. The function will be called after it stops
			// being called for N milliseconds. If `immediate` is passed,
			// trigger the function on the leading edge, instead of the trailing.
			var result;
			var timeout = null;
			return function() {
				var context = this,
					args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) result = func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) result = func.apply(context, args);
				return result;
			};
		}
	}
};

ResponsiveElements.init();

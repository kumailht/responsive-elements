var assert = buster.assert || assert;

buster.testCase("Test breakpoints generation", {
	testBreakpointGeneration: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(420, {
			start: 300,
			end: 500,
			interval: 50
		});
		var expected = ["v-gt300", "v-gt350", "v-gt400", "v-lt450", "v-lt500"];
		assert.equals(breakpoints, expected);
	},
	outOfBoundBreakpoint: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(920, {
			start: 300,
			end: 500,
			interval: 50
		});
		var expected = ["v-gt300", "v-gt350", "v-gt400", "v-gt450", "v-gt500"];
		assert.equals(breakpoints, expected);
	},
	outOfBoundBreakpoint2: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(120, {
			start: 300,
			end: 500,
			interval: 50
		});
		var expected = ["v-lt300", "v-lt350", "v-lt400", "v-lt450", "v-lt500"];
		assert.equals(breakpoints, expected);
	},
	invalidInterval: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(120, {
			start: 300,
			end: 500,
			interval: 1000
		});
		var expected = [];
		assert.equals(breakpoints, expected);
	},
	invalidStart: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(200, {
			start: 1000,
			end: 500,
			interval: 50
		});
		var expected = [];
		assert.equals(breakpoints, expected);
	},
});

buster.testCase("Test breakpoint classes parsing", {
	testBreakpointClassesParsing: function() {
		var parsed_classes = ResponsiveElements.parseBreakpointClasses(
			'v-lt238 v-gt390 ewjfewqh weuhltwioa qwuigtwio gtweih lthiew 3829');
		var expected = ['v-lt238', 'v-gt390'];

		assert.equals(parsed_classes, expected);
	}
});


buster.testCase("Test option parsing", {
	testOptionsParsing: function() {
		var options = ResponsiveElements.parseOptions('{"start": 100, "end": 900, "interval": 50}');
		var expected = {
			start: 100,
			end: 900,
			interval: 50
		};

		assert.equals(options, expected);
	},
	testOptionsParsingWithStringValues: function() {
		var options = ResponsiveElements.parseOptions('{"start": "100px", "end": "900px", "interval": "50px"}');
		var expected = {
			start: 100,
			end: 900,
			interval: 50
		};

		assert.equals(options, expected);
	},
	testOptionsParsingWithInvalidJSON: function() {
		assert.exception(function() {
			ResponsiveElements.parseOptions('{start');
		}, {name: 'SyntaxError'});
	}
});

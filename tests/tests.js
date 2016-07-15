var assert = buster.assert || assert;

buster.testCase("Test breakpoints generation", {
	testBreakpointGeneration: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(420, {
			min: 300,
			max: 500,
			step: 50
		});
		var expected = ["v-gt300", "v-gt350", "v-gt400", "v-lt450", "v-lt500"];
		assert.equals(breakpoints, expected);
	},
	outOfBoundBreakpoint: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(920, {
			min: 300,
			max: 500,
			step: 50
		});
		var expected = ["v-gt300", "v-gt350", "v-gt400", "v-gt450", "v-gt500"];
		assert.equals(breakpoints, expected);
	},
	outOfBoundBreakpoint2: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(120, {
			min: 300,
			max: 500,
			step: 50
		});
		var expected = ["v-lt300", "v-lt350", "v-lt400", "v-lt450", "v-lt500"];
		assert.equals(breakpoints, expected);
	},
	invalidInterval: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(120, {
			min: 300,
			max: 500,
			step: 1000
		});
		var expected = [];
		assert.equals(breakpoints, expected);
	},
	invalidStart: function() {
		var breakpoints = ResponsiveElements.generateBreakpoints(200, {
			min: 1000,
			max: 500,
			step: 50
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
		var options = ResponsiveElements.parseOptions('{"min": 100, "max": 900, "step": 50}');
		var expected = {
			min: 100,
			max: 900,
			step: 50
		};

		assert.equals(options, expected);
	},
	testOptionsParsingWithStringValues: function() {
		var options = ResponsiveElements.parseOptions('{"min": "100px", "max": "900px", "step": "50px"}');
		var expected = {
			min: 100,
			max: 900,
			step: 50
		};

		assert.equals(options, expected);
	},
	testOptionsParsingWithInvalidJSON: function() {
		assert.exception(function() {
			ResponsiveElements.parseOptions('{min');
		}, {name: 'SyntaxError'});
	}
});

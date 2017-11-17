const assert = require('assert');
const test = require('@nlib/test');
const humanReadable = require('..');

test('@nlib/humanReadable', (test) => {

	test('readme examples', (test) => {
		test('humanReadable(2048, {base: 1024}) → \'2.0K\'', () => {
			assert.equal(humanReadable(2048, {base: 1024}), '2.0K');
		});
		test('humanReadable(2000, {digits: 3}) → \'2.0K\'', () => {
			assert.equal(humanReadable(2000, {digits: 3}), '2.000K');
		});
		test('humanReadable(2000, {prefix: [, \'Kilo\']}) → \'2.0Kilo\'', () => {
			assert.equal(humanReadable(2000, {prefix: ['', 'Kilo']}), '2.0Kilo');
		});
		test('humanReadable(0.02, {negativePrefix: [, \'milli\']}) → \'20milli\'', () => {
			assert.equal(humanReadable(0.02, {negativePrefix: ['', 'milli']}), '20milli');
		});
	});

	test('SI/round/1', (test) => {
		[
			[Math.pow(10, -11), '10p'],
			[Math.pow(10, -8), '10n'],
			[0.00001, '10μ'],
			[0.1, '100m'],
			[0, '0'],
			[1, '1'],
			[2, '2'],
			[999, '999'],
			[1000, '1.0K'],
			[999940, '999.9K'],
			[999950, '1.0M'],
			[1040000, '1.0M'],
			[1050000, '1.1M'],
			[999940000, '999.9M'],
			[999951000, '1.0G'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}) -> ${expected}`, () => {
				const actual = humanReadable(size);
				assert.equal(actual, expected);
			});
		});
	});

	test('SI/floor/1', (test) => {
		[
			[0, '0'],
			[1, '1'],
			[2, '2'],
			[999, '999'],
			[1000, '1.0K'],
			[999999, '999.9K'],
			[1000000, '1.0M'],
			[999999999, '999.9M'],
			[1000000000, '1.0G'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}, {round: Math.floor}) -> ${expected}`, () => {
				const actual = humanReadable(size, {round: Math.floor});
				assert.equal(actual, expected);
			});
		});
	});

	test('SI/floor/2', (test) => {
		[
			[0, '0'],
			[1, '1'],
			[2, '2'],
			[999, '999'],
			[1000, '1.00K'],
			[999999, '999.99K'],
			[1000000, '1.00M'],
			[999999999, '999.99M'],
			[1000000000, '1.00G'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}, {round: Math.floor, digits: 2}) -> ${expected}`, () => {
				const actual = humanReadable(size, {round: Math.floor, digits: 2});
				assert.equal(actual, expected);
			});
		});
	});

	test('1024/floor/1', (test) => {
		[
			[0, '0'],
			[1, '1'],
			[2, '2'],
			[Math.pow(2, 10) - 1, '1023'],
			[Math.pow(2, 10), '1.0K'],
			[Math.pow(2, 20), '1.0M'],
			[Math.pow(2, 30), '1.0G'],
			[Math.pow(2, 40), '1.0T'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}, {base: 1024}) -> ${expected}`, () => {
				const actual = humanReadable(size, {base: 1024});
				assert.equal(actual, expected);
			});
		});
	});

	test('😀🤣😎🤔/floor/1', (test) => {
		[
			[5 * Math.pow(10000, 0), '5'],
			[5 * Math.pow(10000, 1), '5.0😀'],
			[5 * Math.pow(10000, 2), '5.0🤣'],
			[5 * Math.pow(10000, 3), '5.0😎'],
			[5 * Math.pow(10000, 4), '5.0🤔'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}, {base: 10000, prefix: [...' 😀🤣😎🤔']}) -> ${expected}`, () => {
				const actual = humanReadable(size, {
					base: 10000,
					prefix: [...' 😀🤣😎🤔'],
				});
				assert.equal(actual, expected);
			});
		});
	});

	test('1⃣2⃣3⃣/floor/1', (test) => {
		[
			[0.5, '51⃣'],
			[0.05, '52⃣'],
			[0.005, '53⃣'],
		]
		.forEach(([size, expected]) => {
			test(`humanReadable(${size}, {base: 10000, negativePrefix: [, '1⃣', '2⃣', '3⃣']}) -> ${expected}`, () => {
				const actual = humanReadable(size, {
					base: 10,
					negativePrefix: ['', '1⃣', '2⃣', '3⃣'],
				});
				assert.equal(actual, expected);
			});
		});
	});

});

const assert = require('assert');
const console = require('console');
const humanReadable = require('../..');
const tests = require('../tests');

for (const [entries, options] of tests) {
	for (const [number, expected] of entries) {
		assert.equal(humanReadable(number, options), expected);
	}
}

console.log('passed: humanReadable');

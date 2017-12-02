const assert = require('assert');
const console = require('console');
const {HumanReadable} = require('../..');
const tests = require('../tests');

for (const [entries, options] of tests) {
	const customConverter = new HumanReadable(options);
	for (const [number, expected] of entries) {
		assert.equal(customConverter(number), expected);
	}
}

console.log('passed: HumanReadable');

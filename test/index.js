const assert = require('assert');
const console = require('console');
const humanReadable = require('..');
const tests = require('./tests');

console.log('humanReadable');

for (const [entries, options] of tests) {
	for (const [number, expected] of entries) {
		assert.equal(humanReadable(number, options), expected);
	}
}

console.log('done');
console.log('humanReadable.HumanReadable');

for (const [entries, options] of tests) {
	const customConverter = new humanReadable.HumanReadable(options);
	for (const [number, expected] of entries) {
		assert.equal(customConverter(number), expected);
	}
}

console.log('done');

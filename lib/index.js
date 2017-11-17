function humanReadable(
	size,
	{
		round = humanReadable.round,
		base = humanReadable.base,
		digits = humanReadable.digits,
		prefix = humanReadable.prefix,
		negativePrefix = humanReadable.negativePrefix,
	} = {}
) {
	if (0 <= size && size % 1 === 0 && size < base) {
		return `${size}`;
	}
	const power = Math.log(size) / Math.log(base);
	const offset = Math.pow(10, digits);
	let integerPart = Math.floor(power);
	let decimalPart = round(Math.pow(base, power - integerPart) * offset) / offset;
	while (base <= decimalPart) {
		integerPart++;
		decimalPart /= base;
	}
	if (integerPart < 0) {
		digits = 0;
		prefix = negativePrefix;
		integerPart = -integerPart;
	}
	return `${decimalPart.toFixed(digits)}${prefix[integerPart]}`;
}

humanReadable.round = Math.round;
humanReadable.base = 1000;
humanReadable.digits = 1;
humanReadable.prefix = ' KMGTPEZY';
humanReadable.negativePrefix = ' mμnpfazy';

module.exports = humanReadable;

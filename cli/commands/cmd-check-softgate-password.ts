import * as qsys from "../qtools/qsys";

const password = process.argv[2];
const hash = process.argv[3];

if (!password || !hash) {
	console.error("Please provide both a password and a hash as arguments.");
	process.exit(1);
}

const isValid = qsys.checkSoftgatePassword(password, hash);
console.log(isValid ? "valid" : "invalid");
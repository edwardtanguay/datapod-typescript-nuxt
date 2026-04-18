import * as qsys from "../qtools/qsys";

const password = process.argv[2];

if (!password) {
	console.error("Please provide a password as an argument.");
	process.exit(1);
}

const hash = qsys.createSoftgateHash(password);
console.log(hash);
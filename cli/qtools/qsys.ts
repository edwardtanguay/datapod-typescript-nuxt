import * as qfil from "./qfil";
import * as qstr from "./qstr";


export const createSoftgateHash = (password: string): string => {
	return Buffer.from(password).toString("hex").split("").reverse().join("");
};

export const checkSoftgatePassword = (password: string, hash: string): boolean => {
	try {
		const reversedHex = hash.split("").reverse().join("");
		const decryptedPassword = Buffer.from(reversedHex, "hex").toString();
		return decryptedPassword === password;
	} catch (e) {
		return false;
	}
};



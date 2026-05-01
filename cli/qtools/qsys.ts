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

// make findImagePathAndFileNameWithIdCode(importPathAndFileName: string, imageIdCode: string): string
// it should look for "importPathAndFileName/images/" + imageIdCode + ".png"
// if not found, look for "importPathAndFileName/images/content/" + imageIdCode + ".png"
// if not found, look for "importPathAndFileName/images/" + imageIdCode + ".jpg"
// if not found, look for "importPathAndFileName/images/content/" + imageIdCode + ".jpg"
// if not found, return ""

export const findImagePathAndFileNameWithIdCode = (importPathAndFileName: string, imageIdCode: string): string => {
	const possibleExtensions = ["png", "jpg", "gif"];
	for (const extension of possibleExtensions) {
		const pathAndFileName = `${importPathAndFileName}\\${imageIdCode}.${extension}`;
		if (qfil.fileExists(pathAndFileName)) {
			return pathAndFileName;
		}
	}
	return "";
};



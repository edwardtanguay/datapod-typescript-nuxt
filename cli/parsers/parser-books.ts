import { DpodFile } from "../dpod/dpod-file";
import { DpodItems } from "../dpod/dpod-items";
import * as qdev from "../qtools/qdev";

export const parseBooks = () => {
	const dpodFile = new DpodFile("~~/data/books.dp.txt");
	const dpodItems = new DpodItems(dpodFile);

	// qdev.clearDebug(); // Don't clear if others are parsing too? 
	// Actually, parser-users.ts has clearDebug(). 
	// If parse-data.ts calls both, the second one will clear the first one's output if we use clearDebug().
	// But let's look at parse-data.ts again.

	dpodItems.debugHtml();
};

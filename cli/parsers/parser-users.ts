import { DpodFile } from "../dpod/dpod-file";
import { DpodItems } from "../dpod/dpod-items";
import * as qdev from "../qtools/qdev";

export const parseUsers = () => {
	const dpodFile = new DpodFile("~~/data/users.dp.txt");
	const dpodItems = new DpodItems(dpodFile);

	qdev.clearDebug();
	dpodItems.debugHtml();
};

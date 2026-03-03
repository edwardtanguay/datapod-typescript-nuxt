import { DpodFile } from "../classes/DpodFile";
import { DpodItems } from "../classes/DpodItems";
import * as qdev from "../qtools/qdev";

export const parseUsers = () => {
	const dpodFile = new DpodFile("~~/data/users.dp.txt");
	const dpodItems = new DpodItems(dpodFile);

	qdev.clearDebug();
	dpodItems.debugHtml();
};

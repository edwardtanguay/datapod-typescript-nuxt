import { DpodFile } from "../classes/DpodFile";
import * as qdev from "../qtools/qdev";

export const parseUsers = () => {
	const dpodFile = new DpodFile("~~/data/users.dp.txt");

	qdev.clearDebug();
	qdev.addToDebugHtml(dpodFile.debugHtml());
};

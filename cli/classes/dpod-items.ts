import * as qdev from "../qtools/qdev";

import { DpodFile } from "./dpod-file";
import { DpodSchema } from "./dpod-schema";

export class DpodItems {

	public dpodFile: DpodFile;
	public dpodSchema: DpodSchema = new DpodSchema();

	constructor(dpodFile: DpodFile) {
		this.dpodFile = dpodFile;
	}

	public debugHtml() {
		let html = qdev.getDebugWrapperHtml("DpodItems Object", this.dpodFile.debugHtml());
		qdev.addToDebugHtml(html);
	}
}

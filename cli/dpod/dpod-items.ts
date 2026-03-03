import * as qdev from "../qtools/qdev";

import { DpodFile } from "./dpod-file";
import { DpodSchema } from "./dpod-schema";

export class DpodItems {

	public dpodFile: DpodFile;
	public dpodSchema: DpodSchema = new DpodSchema();
	public idCode: string = "";

	constructor(dpodFile: DpodFile) {
		this.dpodFile = dpodFile;
		this.idCode = this.dpodFile.idCode;
	}

	public debugHtml() {
		let html = qdev.getDebugWrapperHtml("DpodItems Object", this.dpodFile.debugHtml());
		qdev.addToDebugHtml(html);
	}
}

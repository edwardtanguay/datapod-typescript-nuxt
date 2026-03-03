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
		const label = this.dpodFile.dpodMarkedLineBlocks[0]?.label || "";
		const title = `DpodItems Object${label ? ': <span class="value">' + label + "</span>" : ""}`;
		let html = qdev.getDebugWrapperHtml(title, this.dpodFile.debugHtml());
		qdev.addToDebugHtml(html);
	}
}

import * as qdev from "../qtools/qdev";

import { DpodFile } from "./DpodFile";

export class DpodItems {

	public dpodFile: DpodFile;

	constructor(dpodFile: DpodFile) {
		this.dpodFile = dpodFile;
	}

	public debugHtml() {
		let html = qdev.getDebugWrapperHtml("DpodItems Object", this.dpodFile.debugHtml());
		qdev.addToDebugHtml(html);
	}
}

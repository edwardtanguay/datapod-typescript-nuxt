
import { DpodFile } from "./dpod-file";

export class DpodItems {

	public dpodFile: DpodFile;
	public idCode: string = "";

	constructor(dpodFile: DpodFile) {
		this.dpodFile = dpodFile;
		this.idCode = this.dpodFile.idCode;
	}

	public debugHtml(): string {
		const label = this.dpodFile.dpodMarkedLineBlocks[0]?.label || "";
		const html = this.dpodFile.debugHtml();
		return html;
	}
}

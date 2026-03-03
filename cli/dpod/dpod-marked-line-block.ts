import * as qcli from "../qtools/qcli";
import * as qdev from "../qtools/qdev";
import { DpodLineBlock } from "./dpod-line-block";

export class DpodMarkedLineBlock {
	public lines: string[] = [];
	public marker: string = "";
	public label: string = "";

	constructor(dpodLineBlock: DpodLineBlock) {
		this.lines = dpodLineBlock.lines;
		this.parseFirstLine(this.lines[0]);
	}

	private parseFirstLine(line: string) {
		const match = line.match(/^([^a-zA-Z0-9\s]+)\s*(.*)$/);
		if (match) {
			this.marker = match[1];
			this.label = match[2];
		}
	}

	public debug() {
		qcli.message(`DPOD MARKED LINE BLOCK: ${this.marker} ${this.label}`, "info");
		this.lines.forEach((line) => {
			qcli.message(line, "info");
		});
	}

	public debugHtml(): string {
		const title = `DPOD MARKED LINE BLOCK: ${this.marker} ${this.label}`;
		return qdev.getDebugBoxHtml(title, this.lines, "dpodMarkedLineBlock");
	}
}

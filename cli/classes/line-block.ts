import * as qstr from "../qtools/qstr";
import * as qcli from "../qtools/qcli";
import * as qdev from "../qtools/qdev";

export class LineBlock {
	public lines: string[] = [];

	constructor(line = "") {
		if (!qstr.isEmpty(line)) {
			this.lines.push(line);
		}
	}

	public addLine(line: string) {
		this.lines.push(line);
	}

	public debug() {
		qcli.message("LINE BLOCK", "info");
		this.lines.forEach((line) => {
			qcli.message(line, "info");
		});
	}

	public debugHtml(): string {
		return qdev.getDebugBoxHtml("LINE BLOCK", this.lines, "lineBlock");
	}
}

import * as qstr from "../qtools/qstr";
import * as qcli from "../qtools/qcli";
import * as qdev from "../qtools/qdev";

export class DpodLineBlock {
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
		qcli.message("DPOD LINE BLOCK", "info");
		this.lines.forEach((line) => {
			qcli.message(line, "info");
		});
	}

	public debugHtml(): string {
		return qdev.getDebugBoxHtml("DPOD LINE BLOCK", this.lines, "dpodLineBlock");
	}
}

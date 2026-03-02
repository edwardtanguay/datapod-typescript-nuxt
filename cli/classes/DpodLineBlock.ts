import * as qstr from "../qtools/qstr";
import * as qcli from "../qtools/qcli";

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
		let html = `<fieldset class="dpodLineBlock">`;
		html += `<legend>DPOD LINE BLOCK</legend>`;
		this.lines.forEach((line) => {
			html += `<div class="line">${line}</div>`;
		});
		html += `</fieldset>`;
		return html;
	}
}

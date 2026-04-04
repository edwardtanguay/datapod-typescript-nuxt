import * as qstr from "../qtools/qstr";
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

	public debugHtml(title = "DPOD LINE BLOCK"): string {
		return qdev.getDebugBoxHtml(title, this.lines, "dpodLineBlock");
	}

	static parse(lines: string[]): DpodLineBlock[] {
		let dpodLineBlock = new DpodLineBlock();
		let isRecordingDpodLineBlock = false;
		let isInsideMultilineBlock = false;
		const dpodLineBlocks: DpodLineBlock[] = [];

		for (const line of lines) {
			// don't let a blank line inside a multiline block end the item
			if (isInsideMultilineBlock && qstr.isEmpty(line)) {
				dpodLineBlock.addLine(line);
				continue;
			}

			// ignore multiline begin and end markers
			if (line.endsWith("[[") || line.endsWith("]]")) {
				if (line.endsWith("[[")) {
					isInsideMultilineBlock = true;
				}
				if (line === "]]") {
					isInsideMultilineBlock = false;
				}
				dpodLineBlock.addLine(line);
				continue;
			}

			// ignore empty lines in file
			if (!isRecordingDpodLineBlock && qstr.isEmpty(line)) {
				continue;
			}

			// we need to start recording a line block again
			if (!isRecordingDpodLineBlock && !qstr.isEmpty(line)) {
				dpodLineBlock = new DpodLineBlock();
				isRecordingDpodLineBlock = true;
			}

			// we are recording a line block and we need to add the current line
			if (isRecordingDpodLineBlock && !qstr.isEmpty(line)) {
				dpodLineBlock.addLine(line);
			}

			// we need to finish recording a line block
			if (isRecordingDpodLineBlock && qstr.isEmpty(line)) {
				dpodLineBlocks.push(dpodLineBlock);
				isRecordingDpodLineBlock = false;
			}
		}

		// record last one
		if (isRecordingDpodLineBlock) {
			dpodLineBlocks.push(dpodLineBlock);
		}

		return dpodLineBlocks;
	}
}

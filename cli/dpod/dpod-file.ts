import * as qfil from "../qtools/qfil";
import * as qstr from "../qtools/qstr";
import * as qdev from "../qtools/qdev";
import { LineBlock } from "../general-parsing/line-block";

export class DpodFile {
	private pathAndFileName: string;
	private lines: string[] = [];
	public lineBlocks: LineBlock[] = [];

	constructor(pathAndFileName: string) {
		this.pathAndFileName = pathAndFileName;
		this.lines = qfil.getLinesFromFile(this.pathAndFileName);
		this.createLineBlocks();
	}

	private createLineBlocks() {
		let lineBlock = new LineBlock();
		let isRecordingLineBlock = false;
		let isInsideMultilineBlock = false;
		for (const line of this.lines) {
			// don't let a blank line inside a multiline block end the item
			if (isInsideMultilineBlock && qstr.isEmpty(line)) {
				lineBlock.addLine(line);
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
				lineBlock.addLine(line);
				continue;
			}

			// ignore empty lines in file
			if (!isRecordingLineBlock && qstr.isEmpty(line)) {
				continue;
			}

			// we need to start recording a line block again
			if (!isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock = new LineBlock();
				isRecordingLineBlock = true;
			}

			// we are recording a line block and we need to add the current line
			if (isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock.addLine(line);
			}

			// we need to finish recording a line block
			if (isRecordingLineBlock && qstr.isEmpty(line)) {
				this.lineBlocks.push(lineBlock);
				isRecordingLineBlock = false;
			}
		}

		// record last one
		if (isRecordingLineBlock) {
			this.lineBlocks.push(lineBlock);
		}
	}

	public debug() {
		console.log("pathAndFileName: " + this.pathAndFileName);
		console.log("lines: " + this.lines.length);
		this.lineBlocks.forEach((lineBlock) => {
			lineBlock.debug();
		});
	}

	public debugHtml(): string {
		let html = `<div class="dpodFile">`;
		html += qdev.getDebugBoxHtml("FILE INFO", [
			`Path: ${this.pathAndFileName}`,
			`Lines: ${this.lines.length}`
		], "fileInfo");

		let lineBlocksHtml = "";
		this.lineBlocks.forEach((lineBlock) => {
			lineBlocksHtml += lineBlock.debugHtml();
		});

		html += qdev.getDebugWrapperHtml(`Line Blocks (${this.lineBlocks.length})`, lineBlocksHtml);
		html += `</div>`;
		return html;
	}
}

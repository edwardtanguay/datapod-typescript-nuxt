import * as qfil from "../qtools/qfil";
import * as qstr from "../qtools/qstr";
import * as qdev from "../qtools/qdev";
import { DpodLineBlock } from "./dpod-line-block";
import { DpodMarkedLineBlock } from "./dpod-marked-line-block";

export class DpodFile {
	private pathAndFileName: string;
	private lines: string[] = [];
	public dpodLineBlocks: DpodLineBlock[] = [];
	public dpodMarkedLineBlocks: DpodMarkedLineBlock[] = [];

	constructor(pathAndFileName: string) {
		this.pathAndFileName = pathAndFileName;
		this.lines = qfil.getLinesFromFile(this.pathAndFileName);
		this.createDpodLineBlocks();
		this.createDpodMarkedLineBlocks();
	}

	private createDpodLineBlocks() {
		let dpodLineBlock = new DpodLineBlock();
		let isRecordingDpodLineBlock = false;
		let isInsideMultilineBlock = false;
		for (const line of this.lines) {
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
				this.dpodLineBlocks.push(dpodLineBlock);
				isRecordingDpodLineBlock = false;
			}
		}

		// record last one
		if (isRecordingDpodLineBlock) {
			this.dpodLineBlocks.push(dpodLineBlock);
		}
	}

	private createDpodMarkedLineBlocks() {
		this.dpodLineBlocks.forEach((dpodLineBlock) => {
			const dpodMarkedLineBlock = new DpodMarkedLineBlock(dpodLineBlock);
			this.dpodMarkedLineBlocks.push(dpodMarkedLineBlock);
		});
	}

	public debug() {
		console.log("pathAndFileName: " + this.pathAndFileName);
		console.log("lines: " + this.lines.length);
		this.dpodLineBlocks.forEach((dpodLineBlock) => {
			dpodLineBlock.debug();
		});
		this.dpodMarkedLineBlocks.forEach((dpodMarkedLineBlock) => {
			dpodMarkedLineBlock.debug();
		});
	}

	public debugHtml(): string {
		let html = `<div class="dpodFile">`;
		html += qdev.getDebugBoxHtml("FILE INFO", [
			`Path: ${this.pathAndFileName}`,
			`Lines: ${this.lines.length}`
		], "fileInfo");

		let dpodLineBlocksHtml = "";
		this.dpodLineBlocks.forEach((dpodLineBlock) => {
			dpodLineBlocksHtml += dpodLineBlock.debugHtml();
		});

		let dpodMarkedLineBlocksHtml = "";
		this.dpodMarkedLineBlocks.forEach((dpodMarkedLineBlock) => {
			dpodMarkedLineBlocksHtml += dpodMarkedLineBlock.debugHtml();
		});

		html += qdev.getDebugWrapperHtml(`Dpod Line Blocks (${this.dpodLineBlocks.length})`, dpodLineBlocksHtml);
		html += qdev.getDebugWrapperHtml(`Dpod Marked Line Blocks (${this.dpodMarkedLineBlocks.length})`, dpodMarkedLineBlocksHtml);
		html += `</div>`;
		return html;
	}
}

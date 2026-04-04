import * as qdev from "../qtools/qdev";
import { DpodMarkedLineBlock } from "./dpod-marked-line-block";

export class DpodKeyStringValueBlock {
	public fields: Map<string, string> = new Map();

	constructor(dpodMarkedLineBlock: DpodMarkedLineBlock) {
		this.parse(dpodMarkedLineBlock);
	}

	private parse(dpodMarkedLineBlock: DpodMarkedLineBlock) {
		if (dpodMarkedLineBlock.marker !== "==") {
			return;
		}
		let isInsideMultilineBlock = false;
		let currentMultilineKey = "";
		let currentMultilineValueLines: string[] = [];

		for (const line of dpodMarkedLineBlock.lines) {
			if (isInsideMultilineBlock) {
				if (line === "]]") {
					isInsideMultilineBlock = false;
					this.fields.set(currentMultilineKey, currentMultilineValueLines.join("\n").trim());
					currentMultilineKey = "";
					currentMultilineValueLines = [];
				} else {
					currentMultilineValueLines.push(line);
				}
				continue;
			}

			if (line.endsWith("[[")) {
				const parts = line.split("::");
				if (parts.length >= 2) {
					currentMultilineKey = parts[0].trim();
					isInsideMultilineBlock = true;
				}
				continue;
			}

			const firstColonIndex = line.indexOf("::");
			if (firstColonIndex !== -1) {
				const key = line.substring(0, firstColonIndex).trim();
				const value = line.substring(firstColonIndex + 2).trim();
				this.fields.set(key, value);
			}
		}
	}

	public debugHtml(): string {
		return qdev.getDebugBoxKeyValueHtml("DPOD KEY STRING VALUE BLOCK", this.fields, "dpodKeyStringValueBlock");
	}
}

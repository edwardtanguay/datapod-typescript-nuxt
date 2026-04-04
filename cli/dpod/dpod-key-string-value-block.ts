import * as qstr from "../qtools/qstr";
import * as qdev from "../qtools/qdev";
import { DpodMarkedLineBlock } from "./dpod-marked-line-block";

export class DpodKeyStringValueBlock {
	public fields: Map<string, string> = new Map();
	public label: string = "";

	constructor(dpodMarkedLineBlock: DpodMarkedLineBlock, fieldIdCodes: string[] = []) {
		this.label = dpodMarkedLineBlock.label;
		this.parse(dpodMarkedLineBlock, fieldIdCodes);
	}

	public getLines(): string[] {
		const lines: string[] = [];
		lines.push(`==${this.label}`);
		this.fields.forEach((value, key) => {
			if (value.includes("\n")) {
				lines.push(`${key}::[[`);
				lines.push(...value.split("\n"));
				lines.push("]]");
			} else {
				lines.push(`${key}::${value}`);
			}
		});
		return lines;
	}

	private parse(dpodMarkedLineBlock: DpodMarkedLineBlock, fieldIdCodes: string[] = []) {
		this.fields.set("dpodId", "");
		this.fields.set("dpodWhenCreated", "");

		// initialize all fields as blank
		for (const key of fieldIdCodes) {
			this.fields.set(key, "");
		}

		if (dpodMarkedLineBlock.marker !== "==") {
			return;
		}
		let isInsideMultilineBlock = false;
		let currentMultilineKey = "";
		let currentMultilineValueLines: string[] = [];

		let positionalFieldIndex = 0;

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
				const firstColonIndex = line.indexOf("::");
				if (firstColonIndex !== -1) {
					currentMultilineKey = line.substring(0, firstColonIndex).trim();
					isInsideMultilineBlock = true;
				} else {
					// positional multiline
					if (positionalFieldIndex < fieldIdCodes.length) {
						currentMultilineKey = fieldIdCodes[positionalFieldIndex];
						positionalFieldIndex++;
						isInsideMultilineBlock = true;
					}
				}
				continue;
			}

			const firstColonIndex = line.indexOf("::");
			if (firstColonIndex !== -1) {
				const key = line.substring(0, firstColonIndex).trim();
				const value = line.substring(firstColonIndex + 2).trim();
				this.fields.set(key, value);
			} else {
				// positional field
				if (positionalFieldIndex < fieldIdCodes.length) {
					const key = fieldIdCodes[positionalFieldIndex];
					this.fields.set(key, line.trim());
					positionalFieldIndex++;
				}
			}
		}

		if (qstr.isEmpty(this.fields.get("dpodId") || "")) {
			this.fields.set("dpodId", qstr.generateSuuid());
		}
		if (qstr.isEmpty(this.fields.get("dpodWhenCreated") || "")) {
			this.fields.set("dpodWhenCreated", qstr.getNowDateTimeString());
		}
	}

	public debugHtml(): string {
		return qdev.getDebugBoxKeyValueHtml("DPOD KEY STRING VALUE BLOCK", this.fields, "dpodKeyStringValueBlock");
	}
}

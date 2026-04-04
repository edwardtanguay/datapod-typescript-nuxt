import { DpodLineBlock } from "../dpod-line-block";
import * as qdev from "../../qtools/qdev";
import * as qstr from "../../qtools/qstr";
import { DpodSchemaType } from "../../types";
import { DpodType } from "../dpod-types/dpod-type";
import { DpodTypeLine } from "../dpod-types/dpod-type-line";
import { DpodTypeParagraph } from "../dpod-types/dpod-type-paragraph";
import { DpodTypeWholeNumber } from "../dpod-types/dpod-type-whole-number";
import { DpodTypeDate } from "../dpod-types/dpod-type-date";
import { DpodTypeDateTime } from "../dpod-types/dpod-type-date-time";
import { DpodTypeEmail } from "../dpod-types/dpod-type-email";
import { DpodTypeIdCode } from "../dpod-types/dpod-type-id-code";


export class DpodSchema {
	public idCode: string = '';
	private dpodLineBlock: DpodLineBlock;
	private firstLine: string = '';
	public schemaType: DpodSchemaType = "dpod_items";
	public fileCountType: string = "single";
	private dpodTypes = new Map<string, DpodType>();

	constructor(dpodLineBlock: DpodLineBlock) {
		this.dpodLineBlock = dpodLineBlock;
		this.firstLine = this.dpodLineBlock.lines[0];
		this.determineIdCode();
		this.determineSchemaType();
		this.determineDpodTypes();
		this.determineVariables();
	}

	private determineDpodTypes() {
		for (let i = 1; i < this.dpodLineBlock.lines.length; i++) {
			const line = this.dpodLineBlock.lines[i].trim();
			if (line && !line.includes("=")) { // skip variable lines
				const parts = line.split(";");
				const fieldLabel = parts[0].trim();
				const typeIdCode = parts.length > 1 ? parts[1].trim() : "line";
				const fieldIdCode = qstr.forceCamelNotation(fieldLabel);

				let dpodType: DpodType;
				switch (typeIdCode) {
					case "line": dpodType = new DpodTypeLine(); break;
					case "paragraph": dpodType = new DpodTypeParagraph(); break;
					case "wholeNumber": dpodType = new DpodTypeWholeNumber(); break;
					case "date": dpodType = new DpodTypeDate(); break;
					case "dateTime": dpodType = new DpodTypeDateTime(); break;
					case "email": dpodType = new DpodTypeEmail(); break;
					case "idcode": dpodType = new DpodTypeIdCode(); break;
					default: dpodType = new DpodTypeLine(); break;
				}

				dpodType.fieldIdCode = fieldIdCode;
				dpodType.fieldLabel = fieldLabel;
				this.dpodTypes.set(fieldIdCode, dpodType);
			}
		}
	}

	private determineVariables() {
		this.determineFileCountType();
	}

	private determineFileCountType() {
		const fileCountTypeLine = this.dpodLineBlock.lines.find((line) => line.startsWith("FILE_COUNT_TYPE="));
		if (fileCountTypeLine) {
			this.fileCountType = fileCountTypeLine.substring("FILE_COUNT_TYPE=".length);
		}
	}

	private determineIdCode() {
		const parts = this.firstLine.split(" ");
		if (parts.length > 1) {
			const secondPart = this.firstLine.substring(parts[0].length).trim();
			this.idCode = qstr.forceCamelNotation(secondPart);
		} else {
			this.idCode = qstr.forceCamelNotation(this.firstLine);
		}
	}

	private determineSchemaType(): void {
		if (this.firstLine.startsWith("**ITEMS**")) {
			this.schemaType = "items"
		} else if (this.firstLine.startsWith("**DOCUMENT**")) {
			this.schemaType = "document"
		} else {
			this.schemaType = "dpod_items"
		}
	}

	public debugHtml(): string {
		const fields = new Map<string, string>();
		fields.set("ID-Code", this.idCode);
		fields.set("Schema Type", this.schemaType);
		fields.set("File Count Type", this.fileCountType);

		let dpodTypesHtml = "";
		for (const [, dpodType] of this.dpodTypes) {
			dpodTypesHtml += dpodType.debugHtml();
		}

		let html = qdev.getDebugBoxKeyValueHtml('Basic Info', fields, "schemaInfo");
		html += qdev.getDebugWrapperHtml("Dpod Types", dpodTypesHtml);

		return qdev.getDebugWrapperHtml(`Schema: "${this.idCode}"`, html);
	}


}

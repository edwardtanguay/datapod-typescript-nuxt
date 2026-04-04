import * as qfil from "../qtools/qfil";
import * as qdev from "../qtools/qdev";
import { DpodLineBlock } from "./dpod-line-block";
import { DpodSchema } from "./dpod-schemas/dpod-schema";
import { HelperSchemaFactory } from "./dpod-schemas/helper-schema-factory";

export class DpodSchemaFile {
	private pathAndFileName: string;
	private lines: string[] = [];
	private dpodLineBlocks: DpodLineBlock[] = [];

	constructor(pathAndFileName: string) {
		this.pathAndFileName = pathAndFileName;
		this.lines = qfil.getLinesFromFile(this.pathAndFileName);
		this.dpodLineBlocks = DpodLineBlock.parse(this.lines);
	}

	public getCopyOfDpodSchemas(): Map<string, DpodSchema> {
		return HelperSchemaFactory.parse(this.dpodLineBlocks);
	}

	public debugHtml(): string {
		let html = `<div class="dpodFile">`;
		const basicInfoFields = new Map<string, string>();
		basicInfoFields.set("Path", this.pathAndFileName);
		basicInfoFields.set("Lines", String(this.lines.length));
		let basicInfoAndLineBlocksHtml = qdev.getDebugBoxKeyValueHtml("basic info", basicInfoFields, "schemaFile");

		let dpodLineBlocksContentHtml = "";
		this.dpodLineBlocks.forEach((dpodLineBlock) => {
			dpodLineBlocksContentHtml += dpodLineBlock.debugHtml('line block');
		});

		basicInfoAndLineBlocksHtml += qdev.getDebugWrapperHtml(`line blocks (${this.dpodLineBlocks.length})`, dpodLineBlocksContentHtml);

		html += qdev.getDebugBoxSimpleHtml(`SCHEMA.DATAPOD`, [basicInfoAndLineBlocksHtml]);

		html += `</div>`;
		return html;
	}
}

import { DataEntity } from "./data-entity";
import { DpodSchema } from "../dpod-schemas/dpod-schema";
import { DpodFile } from "../dpod-file";
import { DpodItems } from "../dpod-items";
import * as qdev from "../../qtools/qdev";
import * as qstr from "../../qtools/qstr";
import * as qfil from "../../qtools/qfil";

export class DataEntityDpodItems extends DataEntity {
    private dpodItems: DpodItems | null = null;
	public dataSourcePathAndFileName: string = "";
    constructor(idCode: string, dpodSchema: DpodSchema) {
        super(idCode, dpodSchema);
    }
	public parse(): void {
		this.dataSourcePathAndFileName = `~~/data/${qstr.forceKebabNotation(this.idCode)}.dp.txt`;
		this.forceDataSourceFileToExist();
		const dpodFile = new DpodFile(this.dataSourcePathAndFileName, this.dpodSchema.getFieldIdCodes());
		this.dpodItems = new DpodItems(dpodFile);
		this.saveBackToDataFile();
		this.saveToJsonFile();
	}

	private saveBackToDataFile(): void {
		const lines: string[] = [];
		const schemaLines = this.dpodSchema?.getLines() || [];
		lines.push(...schemaLines);
		lines.push("");

		if (this.dpodItems) {
			this.dpodItems.dpodFile.dpodKeyStringValueBlocks.forEach((block) => {
				lines.push(...block.getLines());
				lines.push("");
			});
		}
		qfil.saveLinesToFile(this.dataSourcePathAndFileName, lines);
	}

	private saveToJsonFile(): void {
		const objects: any[] = [];
		if (this.dpodItems) {
			this.dpodItems.dpodFile.dpodKeyStringValueBlocks.forEach((block) => {
				const obj: any = {};
				block.fields.forEach((value, key) => {
					obj[key] = value;
				});
				objects.push(obj);
			});
		}
		const directoryPath = "~~/data-parsed";
		if (!qfil.directoryExists(directoryPath)) {
			qfil.createDirectory(directoryPath);
		}
		const jsonFileName = `${directoryPath}/${qstr.forceKebabNotation(this.idCode)}.json`;
		qfil.saveArrayOfObjectsToJsonFile(objects, jsonFileName);
	}

	private forceDataSourceFileToExist(): void {
		if (!qfil.fileExists(this.dataSourcePathAndFileName)) {
			const schemaLines = this.dpodSchema?.getLines() || [];
			qfil.saveLinesToFile(this.dataSourcePathAndFileName, schemaLines);
		}
	}

	public debugHtml(): string {
		const fields = new Map<string, string>();
		fields.set("Id-Code", this.idCode);
		fields.set("Datasource file", this.dataSourcePathAndFileName);
		fields.set("Lines in datasource file", this.dpodItems?.dpodFile.lines.length.toString() || "");
		let innerHtml = qdev.getDebugBoxKeyValueHtml("basic info", fields, "dataEntityDpodItems");

		if (this.dpodItems) {
			innerHtml += qdev.getDebugWrapperHtml(`dpod items (${this.dpodItems.dpodFile.dpodLineBlocks.length})`, this.dpodItems.debugHtml());
		}

		return qdev.getDebugWrapperHtml(`DPOD ITEMS: <span class="value">${this.idCode}</span>`, innerHtml);
	}
}
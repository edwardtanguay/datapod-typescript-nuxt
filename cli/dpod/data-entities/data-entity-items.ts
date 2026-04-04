import { DataEntity } from "./data-entity";
import { DpodSchema } from "../dpod-schemas/dpod-schema";
import * as qdev from "../../qtools/qdev";
import * as qstr from "../../qtools/qstr";

export class DataEntityItems extends DataEntity {
	public dataSourcePathAndFileName: string = "";
	public dataSourceDirectoryName: string = ""; // for multi-file data entities
    constructor(idCode: string, dpodSchema: DpodSchema) {
        super(idCode, dpodSchema);
    }
	public parse(): void {
		this.dataSourcePathAndFileName = `~~/data/${qstr.forceKebabNotation(this.idCode)}.txt`;
		this.dataSourceDirectoryName = `~~/data/${qstr.forceKebabNotation(this.idCode)}`;
	}

	private displayDataSource(): string {
		if(this.dpodSchema.fileCountType === "single") {
			return this.dataSourcePathAndFileName;
		}else {
			return this.dataSourceDirectoryName + "/*.txt";
		}	
	}

	public debugHtml(): string {
		const fields = new Map<string, string>();
		fields.set("Id-Code", this.idCode);
		fields.set("Datasource", this.displayDataSource());
		let innerHtml = qdev.getDebugBoxKeyValueHtml("basic info", fields, "dataEntityItems");

		return qdev.getDebugWrapperHtml(`ITEMS: <span class="value">${this.idCode}</span>`, innerHtml);
	}
}
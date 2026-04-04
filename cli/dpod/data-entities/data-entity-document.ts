import { DataEntity } from "./data-entity";
import { DpodSchema } from "../dpod-schemas/dpod-schema";
import * as qdev from "../../qtools/qdev";
import * as qstr from "../../qtools/qstr";

export class DataEntityDocument extends DataEntity {
	public dataSourcePathAndFileName: string = "";
    constructor(idCode: string, dpodSchema: DpodSchema) {
        super(idCode, dpodSchema);
    }
	public parse(): void {
		this.dataSourcePathAndFileName = `~~/data/${qstr.forceKebabNotation(this.idCode)}.txt`;
	}

	public debugHtml(): string {
		const fields = new Map<string, string>();
		fields.set("Id-Code", this.idCode);
		fields.set("Datasource", this.dataSourcePathAndFileName);
		let innerHtml = qdev.getDebugBoxKeyValueHtml("basic info", fields, "dataEntityDocument");

		return qdev.getDebugWrapperHtml(`DOCUMENT: <span class="value">${this.idCode}</span>`, innerHtml);
	}
}
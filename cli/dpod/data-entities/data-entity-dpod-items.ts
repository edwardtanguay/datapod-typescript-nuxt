import { DataEntity } from "./data-entity";
import { DpodSchema } from "../dpod-schemas/dpod-schema";
import { DpodFile } from "../dpod-file";
import { DpodItems } from "../dpod-items";
import * as qdev from "../../qtools/qdev";
import * as qstr from "../../qtools/qstr";

export class DataEntityDpodItems extends DataEntity {
    private dpodItems: DpodItems | null = null;
	public dataSourcePathAndFileName: string = "";
    constructor(idCode: string, dpodSchema: DpodSchema) {
        super(idCode, dpodSchema);
    }
	public parse(): void {
		this.dataSourcePathAndFileName = `~~/data/${qstr.forceKebabNotation(this.idCode)}.dp.txt`;
		const dpodFile = new DpodFile(this.dataSourcePathAndFileName);
		this.dpodItems = new DpodItems(dpodFile);
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
import { DpodSchema } from "../dpod-schemas/dpod-schema";
import * as qdev from "../../qtools/qdev";

export abstract class DataEntity {
	protected idCode: string;
    protected dpodSchema: DpodSchema;

    constructor(idCode: string, dpodSchema: DpodSchema) {
        this.idCode = idCode;
        this.dpodSchema = dpodSchema;
    }

	public abstract parse(): void;

	public debugHtml(): string {
		let html = `<div class="dataEntityDpodItems">`;
		html += qdev.getDebugBoxSimpleHtml("DATA ENTITY", [], "dataEntityDpodItems");
		html += `</div>`;
		return html;
	}
}
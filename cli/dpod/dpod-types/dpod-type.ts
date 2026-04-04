import * as qdev from "../../qtools/qdev";

export class DpodType {
	public fieldIdCode: string = '';
	public typeIdCode: string = '';
	public fieldLabel: string = '';


	public debugHtml(): string {
		const fields = new Map<string, string>();
		fields.set("Field Label", this.fieldLabel);
		fields.set("Field ID-Code", this.fieldIdCode);
		fields.set("Type ID-Code", this.typeIdCode);

		return qdev.getDebugBoxKeyValueHtml(`Dpod Type: "${this.fieldLabel}"`, fields, "dpodType");
	}
}

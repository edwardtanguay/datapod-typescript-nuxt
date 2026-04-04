export class DynamicFileLine {
	public text: string;
	public trimmedText: string;
	public indentLevel: number;

	constructor(text: string) {
		this.text = text;
		this.trimmedText = text.trim();
		this.indentLevel = (text.match(/^\t+/) || [''])[0].length;
	}

}
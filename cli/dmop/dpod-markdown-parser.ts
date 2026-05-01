import { DmopLine } from "./dmop-line";

export class DpodMarkdownParser {
	private dpodLine: DmopLine;
	private text: string;
	private parseVars: Map<string, string>;

	constructor(line: string, parseVars: Map<string, string>) {
		this.dpodLine = new DmopLine(line, "", "");
		this.parseVars = parseVars;
		this.text = this.dpodLine.displayAsHtml();
	}

	public parse(): string {
		return this.text;
	}
}
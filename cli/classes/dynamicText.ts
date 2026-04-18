import * as qfil from "../qtools/qfil";

export class DynamicText {
	private textTemplateIdCode: string = "";
	private textTemplatePathAndFileName: string = "";
	private variables: Map<string, string> = new Map();

	constructor(textTemplateIdCode: string, variables: Map<string, string> = new Map(), fullPath: string = "") {
		this.textTemplateIdCode = textTemplateIdCode;
		this.variables = variables;
		this.textTemplatePathAndFileName = fullPath ? fullPath : `~~/cli/text-templates/text-template-${textTemplateIdCode}.txt`;
	}

	public getText(): string {
		return this.getLines().join("\n");
	}

	public getLines(): string[] {
		let lines = qfil.getLinesFromFile(this.textTemplatePathAndFileName);
		lines = lines.map((line) => {
			this.variables.forEach((value, key) => {
				line = line.split(`@@${key}`).join(value);
			});
			return line;
		});
		return lines;
	}
}

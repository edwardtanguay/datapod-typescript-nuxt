import * as qfil from "../qtools/qfil";
import { DynamicFileLine } from "./dynamicFileLine";
import { DynamicText } from "./dynamicText";

const DF_MARKER = "DFMARKER::";
const DF_LINE = "DFLINE::";

export class DynamicFile {
	private textTemplateIdCode: string = "";
	private pathAndFileName: string = "";
	private textTemplatePathAndFileName: string = "";
	private dynamicFileLines: DynamicFileLine[] = [];

	private constructor() {}

	private initialize() {
		const lines = qfil.getLinesFromFile(this.pathAndFileName);
		this.dynamicFileLines = lines.map(line => new DynamicFileLine(line));
	}

	private getMarker(marker: string): string {
		return `${DF_MARKER}${marker}`;
	}

	private getLineTag(idCode: string): string {
		return `${DF_LINE}${idCode}`;
	}

	private getCodeBlockBeginTag(idCode: string): string {
		return `DFCODEBLOCK-BEGIN::${idCode}`;
	}

	private getCodeBlockEndTag(idCode: string): string {
		return `DFCODEBLOCK-END::${idCode}`;
	}

	private generateCodeBlockLines(linesOrDynamicText: string[] | DynamicText, idCode: string, indentLevel: number): DynamicFileLine[] {
		const tabs = "\t".repeat(indentLevel);
		const blockLines: DynamicFileLine[] = [];
		let lines: string[] = [];
		if (linesOrDynamicText instanceof DynamicText) {
			lines = linesOrDynamicText.getLines();
		} else {
			lines = linesOrDynamicText;
		}

		// remove empty lines at end
		while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
			lines.pop();
		}

		blockLines.push(new DynamicFileLine(`${tabs}// ${this.getCodeBlockBeginTag(idCode)}`));
		for (const lineText of lines) {
			blockLines.push(new DynamicFileLine(`${tabs}${lineText}`));
		}
		blockLines.push(new DynamicFileLine(`${tabs}// ${this.getCodeBlockEndTag(idCode)}`));
		return blockLines;
	}

	public addCodeBlockAfterMarker(marker: string, linesOrDynamicText: string[] | DynamicText, idCode: string) {
		const fullMarker = this.getMarker(marker);
		const index = this.dynamicFileLines.findIndex(line => line.text.includes(fullMarker));
		if (index !== -1) {
			const indentLevel = this.dynamicFileLines[index].indentLevel;
			const blockLines = this.generateCodeBlockLines(linesOrDynamicText, idCode, indentLevel);
			this.dynamicFileLines.splice(index + 1, 0, ...blockLines);
		}
	}

	public addCodeBlockBeforeMarker(marker: string, linesOrDynamicText: string[] | DynamicText, idCode: string) {
		const fullMarker = this.getMarker(marker);
		const index = this.dynamicFileLines.findIndex(line => line.text.includes(fullMarker));
		if (index !== -1) {
			const indentLevel = this.dynamicFileLines[index].indentLevel;
			const blockLines = this.generateCodeBlockLines(linesOrDynamicText, idCode, indentLevel);
			this.dynamicFileLines.splice(index, 0, ...blockLines);
		}
	}

	public deleteCodeBlockWithMarker(idCode: string) {
		const beginTag = this.getCodeBlockBeginTag(idCode);
		const endTag = this.getCodeBlockEndTag(idCode);
		const beginIndex = this.dynamicFileLines.findIndex(line => line.text.includes(beginTag));
		const endIndex = this.dynamicFileLines.findIndex(line => line.text.includes(endTag));
		if (beginIndex !== -1 && endIndex !== -1 && beginIndex < endIndex) {
			this.dynamicFileLines.splice(beginIndex, endIndex - beginIndex + 1);
		}
	}

	public deleteAllCodeBlocksWithMarker(idCode: string) {
		while (true) {
			const beginTag = this.getCodeBlockBeginTag(idCode);
			const endTag = this.getCodeBlockEndTag(idCode);
			const beginIndex = this.dynamicFileLines.findIndex(line => line.text.includes(beginTag));
			const endIndex = this.dynamicFileLines.findIndex(line => line.text.includes(endTag));
			if (beginIndex !== -1 && endIndex !== -1 && beginIndex < endIndex) {
				this.dynamicFileLines.splice(beginIndex, endIndex - beginIndex + 1);
			} else {
				break;
			}
		}
	}

	public addLineAfterMarker(marker: string, lineText: string, idCode: string) {
		const fullMarker = this.getMarker(marker);
		const index = this.dynamicFileLines.findIndex(line => line.text.includes(fullMarker));
		if (index !== -1) {
			const indentLevel = this.dynamicFileLines[index].indentLevel;
			const fullLineText = `${lineText} // ${this.getLineTag(idCode)}`;
			const indentedLineText = "\t".repeat(indentLevel) + fullLineText;
			this.dynamicFileLines.splice(index + 1, 0, new DynamicFileLine(indentedLineText));
		}
	}

	public addLineBeforeMarker(marker: string, lineText: string, idCode: string) {
		const fullMarker = this.getMarker(marker);
		const index = this.dynamicFileLines.findIndex(line => line.text.includes(fullMarker));
		if (index !== -1) {
			const indentLevel = this.dynamicFileLines[index].indentLevel;
			const fullLineText = `${lineText} // ${this.getLineTag(idCode)}`;
			const indentedLineText = "\t".repeat(indentLevel) + fullLineText;
			this.dynamicFileLines.splice(index, 0, new DynamicFileLine(indentedLineText));
		}
	}

	public deleteLineWithMarker(marker: string) {
		const fullLineTag = this.getLineTag(marker);
		const index = this.dynamicFileLines.findIndex(line => line.text.includes(fullLineTag));
		if (index !== -1) {
			this.dynamicFileLines.splice(index, 1);
		}
	}

	public deleteAllLinesWithMarker(marker: string) {
		const fullLineTag = this.getLineTag(marker);
		this.dynamicFileLines = this.dynamicFileLines.filter(line => !line.text.includes(fullLineTag));
	}

	public saveToFile() {
		const lines = this.dynamicFileLines.map(line => line.text);
		qfil.saveLinesToFile(this.pathAndFileName, lines);
	}

	static createFromTemplate(textTemplateIdCode: string, pathAndFileName: string, variables: Map<string, string> = new Map<string, string>()): DynamicFile {
		const df = new DynamicFile();
		df.textTemplateIdCode = textTemplateIdCode;
		df.pathAndFileName = pathAndFileName;
		df.textTemplatePathAndFileName = `~~/cli/text-templates/text-template-${df.textTemplateIdCode}.txt`;
		let lines = qfil.getLinesFromFile(df.textTemplatePathAndFileName);
		lines = lines.map((line) => {
			variables.forEach((value, key) => {
				line = line.split(`@@${key}`).join(value);
			});
			return line;
		});
		qfil.saveLinesToFile(df.pathAndFileName, lines);
		df.initialize();
		return df;
	}

	static createFromFile(pathAndFileName: string): DynamicFile {
		const df = new DynamicFile();
		df.pathAndFileName = pathAndFileName;
		df.initialize();
		return df;
	}
}
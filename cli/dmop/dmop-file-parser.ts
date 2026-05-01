import * as qdev from "../qtools/qdev";
import * as qfil from "../qtools/qfil";
import * as qstr from "../qtools/qstr";
import { DynamicText } from "../classes/dynamicText";
import { DmopLine } from "./dmop-line";

export class DmopFileParser {
	private htmlContent: string = "";
	private directoryName: string;
	private importPathAndFileName: string;
	private templatePathAndFileName: string;
	private yamlConfigPathAndFileName: string;
	private dmopPathAndFileName: string;
	private sourceDirectoryPath: string;
	private title: string = "";
	private exportPaths: string[] = [];
	private dpodLines: DmopLine[] = [];
	private lines: string[] = [];

	constructor(directoryName: string, importPathAndFileName: string, dmopDirectoryName: string) {
		this.directoryName = directoryName;
		this.importPathAndFileName = importPathAndFileName;
		this.sourceDirectoryPath = `${dmopDirectoryName}/${directoryName}`;
		this.yamlConfigPathAndFileName = `${this.sourceDirectoryPath}/config.yaml`;
		this.templatePathAndFileName = `${this.sourceDirectoryPath}/template.html`;
		this.dmopPathAndFileName = `${this.sourceDirectoryPath}/${directoryName}.dmop.txt`;
		this.processConfigVars();
		this.defineExportPaths();
		this.defineLines();
	}

	private defineLines() {
		this.lines = qfil.getLinesFromFile(this.dmopPathAndFileName);
		this.lines = qstr.trimLinesOfEndBlanks(this.lines);
	}

	// regardless if they defined an export path, define one locally for debugging (in the output directory)
	private defineExportPaths() {
		const outputDirectory = 'C:/edward/projects/datapods/datapod-typescript-nuxt/output/dmops';
		this.exportPaths.push(`${outputDirectory}/${this.directoryName}`);
	}

	private processConfigVars() {
		const _configVars = qfil.getVariablesFromYamlPathAndFileName(this.yamlConfigPathAndFileName);
		this.title = _configVars.get("title") || "";
		const exportPath = _configVars.get("export_path");
		if (exportPath) {
			this.exportPaths.push(exportPath);
		}
	}

	parse() {
		const parseVars = new Map<string, string>();
		parseVars.set("title", this.title);
		parseVars.set("cache_bust", qstr.generateSuuid());
		for (const line of this.lines) {
			this.dpodLines.push(new DmopLine(line, this.importPathAndFileName, this.sourceDirectoryPath));
		}
		this.htmlContent = this.getHtmlContent(parseVars);
		this.createWebsite();
	}

	private getHtmlContent(parseVars: Map<string, string>): string {
		let dmopHtml = "";
		for (const dpodLine of this.dpodLines) {
			dmopHtml += dpodLine.displayAsHtml() + "\n";
		}
		parseVars.set("content", dmopHtml);
		const dt = new DynamicText("template", parseVars, this.templatePathAndFileName);
		return dt.getText();
	}

	createWebsite() {
		for (const exportPath of this.exportPaths) {
			qfil.createDirectory(exportPath);
			const pathAndFileName = `${exportPath}/index.html`;
			qfil.writeToFile(pathAndFileName, this.htmlContent);

			// copy directories
			const subDirs = ["css", "js", "images"];
			for (const subDir of subDirs) {
				const source = `${this.sourceDirectoryPath}/${subDir}`;
				const destination = `${exportPath}/${subDir}`;
				qfil.copyDirectory(source, destination);
			}
		}
	}

	debugHtml() {
		let debugHtml = ""

		// variable block
		const fields = new Map<string, string>();
		fields.set("importPathAndFileName", this.importPathAndFileName);
		fields.set("htmlContent", this.htmlContent);
		fields.set("yamlConfigPathAndFileName", this.yamlConfigPathAndFileName);
		fields.set("title", this.title);
		fields.set("exportPaths", this.exportPaths.join(", "));
		debugHtml += qdev.getDebugBoxKeyValueHtml("Variables", fields);

		return qdev.getDebugWrapperHtml(this.directoryName.toUpperCase(), debugHtml);
	}

}

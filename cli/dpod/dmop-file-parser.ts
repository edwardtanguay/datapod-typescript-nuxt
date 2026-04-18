import * as qdev from "../qtools/qdev";
import * as qfil from "../qtools/qfil";
import { DynamicText } from "../classes/dynamicText";

export class DmopFileParser {
	private htmlContent: string = "";
	private directoryName: string;
	private importPathAndFileName: string;
	private templatePathAndFileName: string;
	private yamlConfigPathAndFileName: string;
	private dmopPathAndFileName: string;
	private sourceDirectoryPath: string;
	private title: string = "";
	private exportPath: string = "";

	constructor(directoryName: string, importPathAndFileName: string, dmopDirectoryName: string) {
		this.directoryName = directoryName;
		this.importPathAndFileName = importPathAndFileName;
		this.sourceDirectoryPath = `${dmopDirectoryName}/${directoryName}`;
		this.yamlConfigPathAndFileName = `${this.sourceDirectoryPath}/config.yaml`;
		this.templatePathAndFileName = `${this.sourceDirectoryPath}/template.html`;
		this.dmopPathAndFileName = `${this.sourceDirectoryPath}/${directoryName}.dmop.txt`;
		const variables = qfil.getVariablesFromYamlPathAndFileName(this.yamlConfigPathAndFileName);
		this.title = variables.get("title") || "";
		this.exportPath = variables.get("export_path") || "";
	}

	parse() {
		const variables = new Map<string, string>();
		variables.set("title", this.title);
		this.htmlContent = this.getHtmlContent(variables);
	}

	private getHtmlContent(variables: Map<string, string>): string {
		const dmopContent = qfil.getStringBlockFromFile(this.dmopPathAndFileName);
		variables.set("content", dmopContent);
		const dt = new DynamicText("template", variables, this.templatePathAndFileName);
		return dt.getText();
	}

	createWebsite() {
		qfil.createDirectory(this.exportPath);
		const pathAndFileName = `${this.exportPath}/index.html`;
		qfil.writeToFile(pathAndFileName, this.htmlContent);

		// copy directories
		const subDirs = ["css", "js", "images"];
		for (const subDir of subDirs) {
			const source = `${this.sourceDirectoryPath}/${subDir}`;
			const destination = `${this.exportPath}/${subDir}`;
			qfil.copyDirectory(source, destination);
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
		fields.set("exportPath", this.exportPath);
		debugHtml += qdev.getDebugBoxKeyValueHtml("Variables", fields);

		return qdev.getDebugWrapperHtml(this.directoryName.toUpperCase(), debugHtml);
	}

}

import * as qdev from "../qtools/qdev";
import * as qfil from "../qtools/qfil";
import * as qstr from "../qtools/qstr";
import { DynamicText } from "../classes/dynamicText";
import { DmopLine } from "./dmop-line";
import { DpodMarkdownParser } from "./dpod-markdown-parser";

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
		let mainLines: string[] = [];
		let extraLines: string[] = [];
		let inExtraSection = false;

		for (const line of this.lines) {
			const trimmed = line.trim();

			if (trimmed === "``extrainfo") {
				inExtraSection = true;
				continue;
			}

			if (inExtraSection) {
				extraLines.push(line);
				continue;
			}

			mainLines.push(line);
		}

		const parseSection = (lines: string[]) => {
			let sectionHtml = "";
			let currentHotelId = 0;
			let hotelLevel = -1;

			for (const line of lines) {
				const parser = new DpodMarkdownParser(line, parseVars, this.importPathAndFileName, this.sourceDirectoryPath);
				let lineHtml = parser.parse();

				if (parser.dpodLine.isHotel) {
					currentHotelId++;
					hotelLevel = parser.dpodLine.level;
					lineHtml = lineHtml.replace(/class="([^"]*)"/, `data-hotel-id="${currentHotelId}" class="$1 hotel-parent"`);
				} else if (hotelLevel !== -1 && parser.dpodLine.level > hotelLevel) {
					lineHtml = lineHtml.replace(/class="([^"]*)"/, `style="display: none;" class="$1 hotel-child hotel-child-${currentHotelId}"`);
					if (parser.dpodLine.imageIdCode) {
						lineHtml = lineHtml.replace(/class="([^"]*)"/g, (match, p1) => {
							if (match.includes('dmop-image-container')) {
								return `style="display: none;" class="${p1} hotel-child hotel-child-${currentHotelId}"`;
							}
							return match;
						});
					}
				} else {
					hotelLevel = -1;
				}
				sectionHtml += lineHtml + "\n";
			}
			return sectionHtml;
		};

		let mainHtml = parseSection(mainLines);
		let extraHtml = parseSection(extraLines);

		parseVars.set("content", mainHtml);
		parseVars.set("extrainfo", extraHtml);

		const dt = new DynamicText("template", parseVars, this.templatePathAndFileName);
		return dt.getText();
	}

	private calculateLevel(line: string) {
		let level = 0;
		for (let i = 0; i < line.length; i++) {
			if (line[i] === '\t') {
				level++;
			} else {
				break;
			}
		}
		return level;
	}

	createWebsite() {
		for (const exportPath of this.exportPaths) {
			qfil.createDirectory(exportPath);
			const pathAndFileName = `${exportPath}/index.html`;
			qfil.writeToFile(pathAndFileName, this.htmlContent);

			// copy directories
			const subDirs = ["css", "js", "images", "media"];
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

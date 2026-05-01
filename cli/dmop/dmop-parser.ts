import * as qdev from "../qtools/qdev";
import * as qfil from "../qtools/qfil";
import { DmopFileParser } from "./dmop-file-parser";

export class DmopParser {
	private importPathAndFileName: string = "C:\\WORK\\import";
	private dmopDirectoryName: string = "~~/data/dmops";
	private directoryNames: string[] = [];
	private dmopFileParsers: DmopFileParser[] = [];

	constructor() {
		this.parse();
		this.debugHtml();
	}

	parse() {
		this.directoryNames = qfil.getDirectoriesFromAbsoluteDirectory(this.dmopDirectoryName);
		for (const directoryName of this.directoryNames) {
			const dmopFileParser = new DmopFileParser(directoryName, this.importPathAndFileName, this.dmopDirectoryName);
			this.dmopFileParsers.push(dmopFileParser);
		}
		for (const dmopFileParser of this.dmopFileParsers) {
			dmopFileParser.parse();
		}
	}

	debugHtml() {
		qdev.clearDebug();

		// preceding variable block
		const fields = new Map<string, string>();
		fields.set("importPathAndFileName", this.importPathAndFileName);
		fields.set("directoryNames", this.directoryNames.join(", "));
		fields.set("dmopDirectoryName", this.dmopDirectoryName);
		qdev.addToDebugHtml(qdev.getDebugBoxKeyValueHtml("Variables", fields));

		// dmop file parser blocks
		let dmopFileParseHtml = "";
		for (const dmopFileParser of this.dmopFileParsers) {
			dmopFileParseHtml += dmopFileParser.debugHtml();
		}
		qdev.addToDebugHtml(qdev.getDebugWrapperHtml("DMOP FILE PARSERS", dmopFileParseHtml));
	}

	static execute() {
		new DmopParser();
	}
}

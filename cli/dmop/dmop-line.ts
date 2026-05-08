import * as qstr from "../qtools/qstr";
import * as qsys from "../qtools/qsys";
import * as qdev from "../qtools/qdev";

export class DmopLine {
	private line: string;
	public textContent: string;
	public level: number = 0;
	private marker: string = "";
	public imageIdCode: string = "";
	private externalAbsoluteImagePathAndFileName: string = "";
	private relativeLocalImagePathAndFileName: string = "";
	private importPathAndFileName: string = "";
	private sourceDirectoryPath: string = "";
	public isHotel: boolean = false;

	constructor(line: string, importPathAndFileName: string, sourceDirectoryPath: string) {
		this.line = line;
		this.importPathAndFileName = importPathAndFileName;
		this.sourceDirectoryPath = sourceDirectoryPath;
		this.textContent = line.trim();
		this.calculateLevel();
		this.parseImage();
		this.extractMarker();
	}

	private parseImage() {
		// if line ends with e.g. ##mainEntrance
		// extract "mainEntrance" as imageIdCode
		// remove "##mainEntrance" from textContent
		const imageRegex = /##(.*)$/;
		const match = this.textContent.match(imageRegex);
		if (match) {
			this.textContent = this.textContent.substring(0, match.index);
			this.imageIdCode = match[1];
			this.relativeLocalImagePathAndFileName = `images/content/${this.imageIdCode}.png`;
			this.externalAbsoluteImagePathAndFileName = qsys.findImagePathAndFileNameWithIdCode(this.importPathAndFileName, this.imageIdCode);

			if (this.externalAbsoluteImagePathAndFileName !== "" && this.relativeLocalImagePathAndFileName !== "") {
				const localAbsoluteImagePathAndFileName = `${this.sourceDirectoryPath}/${this.relativeLocalImagePathAndFileName}`;
				if (!qdev.fileExists(localAbsoluteImagePathAndFileName)) {
					qdev.copyFile(this.externalAbsoluteImagePathAndFileName, localAbsoluteImagePathAndFileName);
				}
			}
		}
	}

	private copyImageIfItDoesNotExistYet() {
		if (this.imageIdCode === "") {
			this.imageIdCode = "default";
		}
	}

	private extractMarker() {
		// assume beginning of line is "? " where ? can be any character
		// save that character in "marker"
		// remove that character and the space from "textContent"
		if (this.textContent.length > 1 && this.textContent[1] === ' ') {
			this.marker = this.textContent[0];
			this.textContent = this.textContent.substring(2);
		}
	}

	private calculateLevel() {
		let level = 0;
		for (let i = 0; i < this.line.length; i++) {
			if (this.line[i] === '\t') {
				level++;
			} else {
				break;
			}
		}
		this.level = level;
	}

	displayAsHtml() {
		return this.displayAsHtmlWithText(this.textContent);
	}

	displayAsHtmlWithText(textContent: string) {
		let html = `<div class="dmop-line level-${this.level}"><div class="dmop-icon"></div><span class="dmop-text">${textContent}</span></div>`;
		if (this.imageIdCode) {
			html += `<div class="dmop-image-container level-${this.level}"><img src="images/content/${this.imageIdCode}.png" class="dmop-image"></div>`;
		}
		return html;
	}

}
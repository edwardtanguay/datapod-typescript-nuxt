import { DmopLine } from "./dmop-line";

export class DpodMarkdownParser {
	public dpodLine: DmopLine;
	private text: string;
	private parseVars: Map<string, string>;
	private isParsed: boolean = false;

	constructor(line: string, parseVars: Map<string, string>, importPathAndFileName: string, sourceDirectoryPath: string) {
		this.dpodLine = new DmopLine(line, importPathAndFileName, sourceDirectoryPath);
		this.parseVars = parseVars;
		this.text = this.dpodLine.textContent;
		this.parse();
	}

	public parse(): string {
		if (!this.isParsed) {
			this.parseHeaderHighlight();
			this.parseDpodLocation();
			this.parseWarningSign();
			this.parseConstruction();
			this.parseDpodEmojis();
			this.parseTimes();
			this.parseBold();
			this.parseItalic();
			this.parseExplicitLinks();
			this.parseImplicitLinks();
			this.parseEmail();
			this.parsePhone();
			this.parseHotel();
			this.parseJourney();
			this.isParsed = true;
		}
		return this.dpodLine.displayAsHtmlWithText(this.text);
	}

	private parseHeaderHighlight() {
		this.text = this.text.replace(/^(\**)([a-z]{2,3}\s\d{2}\.\d{2}\.)\s+(.+?)(\**)$/i, (match, p1, p2, p3, p4) => {
			let destination = p3;
			if (destination.includes("-->")) {
				destination = destination.replace("-->", '<span class="header-arrow">➜</span>');
			}
			return `${p2} <span class="dmop-header-info">${destination}</span>`;
		});
	}

	private parseEmail() {
		const emailIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; display:inline-block; vertical-align:middle; margin-right:4px; opacity: 0.7;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
		this.text = this.text.replace(/^E-Mail:\s*/, `${emailIcon} `);
	}

	private parsePhone() {
		const phoneIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; display:inline-block; vertical-align:middle; margin-right:4px; opacity: 0.7;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.18-2.18a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
		this.text = this.text.replace(/^Telefon:\s*/, `${phoneIcon} `);
	}

	private parseHotel() {
		const houseIcon = `<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px; height:20px; display:inline-block; vertical-align:middle; margin-right:8px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></span>`;
		if (this.text.includes("{hotel:")) {
			this.dpodLine.isHotel = true;
		}
		this.text = this.text.replace(/\{hotel:(.*?)\}/g, `<span class="dmop-hotel-label hotel-trigger">${houseIcon} $1</span>`);
	}

	private parseJourney() {
		const mapPinIcon = `<span class="icon"><svg viewBox="0 0 24 24" fill="currentColor" style="width:20px; height:20px; display:inline-block; vertical-align:middle; margin-right:8px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></span>`;
		if (this.text.includes("{journey:")) {
			this.dpodLine.isJourney = true;
		}
		this.text = this.text.replace(/\{journey:(.*?)\}/g, `<span class="dmop-journey-label journey-trigger">${mapPinIcon} $1</span>`);
	}

	private parseDpodLocation() {
		this.text = this.text.replace(/\{location:(.*?)\}/g, '<a href="$1" target="_blank" class="dpod-location-btn"><span class="icon">🌍</span> <span class="text">location</span></a>');
	}

	private parseWarningSign() {
		const warnIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1.2em; height:1.2em; display:inline-block; vertical-align:middle; margin-right:4px; filter: drop-shadow(0 0 2px rgba(255, 204, 0, 0.5));"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
		this.text = this.text.replace(/::warn::/g, warnIcon);
	}

	private parseConstruction() {
		const constructionIcon = `<svg viewBox="0 0 24 24" style="width:1.2em; height:1.2em; display:inline-block; vertical-align:middle; margin-right:4px; filter: drop-shadow(0 0 2px rgba(255, 204, 0, 0.5));"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#ffcc00" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><g transform="translate(12, 14.5) scale(0.016) translate(-256, -256)" fill="#000"><g transform="translate(0, 0)"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></g><g transform="translate(540, 0) scale(-1, 1)"><path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6l0-12.1L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0l18.1 0c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"/></g></g></svg>`;
		this.text = this.text.replace(/::construction::/g, constructionIcon);
	}

	private parseDpodEmojis() {
		const emojiMap: { [key: string]: string } = {
			"think": `<img src="images/site/think.png" class="dmop-emoji" alt="thinking">`,
			"smile": `<img src="images/site/smile.png" class="dmop-emoji" alt="smile">`,
			"green_check": `<img src="images/site/green_check.png" class="dmop-emoji" alt="check">`,
			"celebrate": `<img src="images/site/celebrate.png" class="dmop-emoji" alt="celebrate">`,
			"balloons": `<img src="images/site/balloons.png" class="dmop-emoji" alt="balloons">`
		};
		this.text = this.text.replace(/::(.*?)::/g, (match, p1) => {
			return emojiMap[p1] || match;
		});
	}

	private parseTimes() {
		// match 10:38, 9:21, 02:33 etc.
		this.text = this.text.replace(/\b(\d{1,2}:\d{2})\b/g, '<span class="dmop-time-pill"><span class="icon">🕒</span> $1</span>');
	}

	private parseBold() {
		this.text = this.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
	}

	private parseItalic() {
		this.text = this.text.replace(/\*(.*?)\*/g, "<em>$1</em>");
	}

	private parseExplicitLinks() {
		this.text = this.text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="dmop-link-pill"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:2px; filter: drop-shadow(0 0 2px rgba(255, 204, 0, 0.5));"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></span>$1</a>');
	}

	private parseImplicitLinks() {
		this.text = this.text.replace(/(?<!href=")(^|\s)(https?:\/\/([^\/\s]+)[^\s]*)/g, (match, boundary, url, host) => {
			return `${boundary}<a href="${url}" target="_blank">${host}</a>`;
		});
	}
}
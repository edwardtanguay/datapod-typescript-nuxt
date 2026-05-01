import { DmopLine } from "./dmop-line";

export class DpodMarkdownParser {
	private dpodLine: DmopLine;
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
			this.parseDpodLocation();
			this.parseDpodEmojis();
			this.parseTimes();
			this.parseBold();
			this.parseItalic();
			this.parseExplicitLinks();
			this.parseImplicitLinks();
			this.parseEmail();
			this.parsePhone();
			this.parseHotel();
			this.isParsed = true;
		}
		return this.dpodLine.displayAsHtmlWithText(this.text);
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
		this.text = this.text.replace(/\{hotel:(.*?)\}/g, `<span class="dmop-hotel-label">${houseIcon} $1</span>`);
	}

	private parseDpodLocation() {
		this.text = this.text.replace(/\{location:(.*?)\}/g, '<a href="$1" target="_blank" class="dpod-location-btn"><span class="icon">🌍</span> <span class="text">location</span></a>');
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
import * as qfil from "./qfil";
import * as qstr from "./qstr";


export const clearDebug = (): void => {
	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datapod Parsing Output</title>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
	<h1>Datapod Parsing Output</h1>
	<!-- marker:bottom-of-body -->
	<script>
		document.addEventListener("DOMContentLoaded", () => {
			document.querySelectorAll("body > fieldset").forEach(fs => fs.classList.remove("closed"));
		});

		document.addEventListener("click", (e) => {
			const fieldset = e.target.closest("fieldset");
			if (!fieldset) return;

			const isLegend = e.target.tagName === 'LEGEND' || e.target.closest('legend') !== null;
			const isClosed = fieldset.classList.contains("closed");
			const children = fieldset.querySelectorAll("fieldset");

			if (isClosed) {
				if (isLegend) {
					// Rule 1: Click title of closed box -> open box and all of its children
					fieldset.classList.remove("closed");
					children.forEach(child => child.classList.remove("closed"));
				} else {
					// Rule 2: Click in the area of a closed box -> open that box, preserve child states
					fieldset.classList.remove("closed");
				}
			} else {
				if (isLegend) {
					// Rule 3: Click open box on title -> close box and all children
					fieldset.classList.add("closed");
					children.forEach(child => child.classList.add("closed"));
				} else {
					// Rule 4: Click open box on area -> close box, preserve child states
					fieldset.classList.add("closed");
				}
			}

			
			e.stopPropagation();
		});

	</script>
</body>
</html>

`;
	qfil.writeToFile("~~/debug/output.html", html);
	sleep(100);
};

export const sleep = (ms: number) => {
	const end = Date.now() + ms;
	while (Date.now() < end) {}
};

export const addToDebugHtml = (content: string): void => {
	qfil.addToTextFileBeforeMarker("~~/debug/output.html", content, "<!-- marker:bottom-of-body -->");
};

export const getDebugBoxHtml = (title: string, lines: string[], extraClass: string = "", preHtml: string = ""): string => {
	let html = `<fieldset class="debugBox closed ${extraClass}">`;
	const lineLabel = lines.length === 1 ? "line" : "lines";
	html += `<legend>${title.toUpperCase()} <span class="lineCount">(${lines.length} ${lineLabel})</span></legend>`;
	if (preHtml) {
		html += preHtml;
	}
	html += `<div class="codeContainer">`;
	lines.forEach((line, index) => {
		html += `<div class="line"><div class="lineNumber">${index + 1}</div><pre class="content">${line}</pre></div>`;
	});
	html += `</div>`;
	html += `</fieldset>`;
	return html;
};

export const getDebugBoxSimpleHtml = (title: string, lines: string[], extraClass: string = "", preHtml: string = ""): string => {
	let html = `<fieldset class="debugWrapper closed ${extraClass}">`;
	html += `<legend>${title}</legend>`;
	if (preHtml) {
		html += preHtml;
	}
	html += `<pre class="contentSimple">${lines.join("\n")}</pre>`;
	html += `</fieldset>`;
	return html;
};

export const getDebugWrapperHtml = (title: string, content: string): string => {
	let html = `<fieldset class="debugWrapper closed">`;
	html += `<legend>${title}</legend>`;
	html += `<div class="contentWrapper">`;
	html += content;
	html += `</div>`;
	html += `</fieldset>`;
	return html;
};

export const getDebugBoxKeyValueHtml = (title: string, fields: Map<string, string>, extraClass: string = ""): string => {
	const lines: string[] = [];
	for (const [key, value] of fields.entries()) {
		let displayValue = qstr.convertFromHtml(value);
		displayValue = qstr.replaceAll(displayValue, "\\n", `<span class="newlineToken">\\n</span>`);
		lines.push(`<span class="key">${key}</span>: <span class="dim">[</span><span class="value">${displayValue}</span><span class="dim">]</span>`);
	}
	return getDebugBoxHtml(title, lines, extraClass);
};


/**
 * prints a debug line with timestamp
 *
 * 2025-04-14 18:18:06 ### was here ##############
 */
export const debug = (obj: unknown): void => {
	const now = new Date();
	const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

	if (typeof obj === "string") {
		console.log(`${timestamp} ### ${obj} #########`);
	} else {
		console.log(obj);
	}
};

/**
 * prints a debug line with timestamp
 *
 * 2025-04-14 18:18:06|was here
 */
export const log = (line: string = ""): string => {
	const now = new Date();
	const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
	return `${timestamp}|${line}\n`;
};

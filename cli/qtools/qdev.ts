import * as qfil from "./qfil";

export const clearDebug = (): void => {
	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datapod Debug Output</title>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
	<h1>Datapod Debug Output</h1>
	<!-- marker:bottom-of-body -->
	<script>
		document.addEventListener("click", (e) => {
			const fieldset = e.target.closest("fieldset");
			if (fieldset) {
				fieldset.classList.toggle("closed");
				e.stopPropagation();
			}
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
	let html = `<fieldset class="debugBox closed ${extraClass}">`;
	html += `<legend>${title.toUpperCase()}</legend>`;
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

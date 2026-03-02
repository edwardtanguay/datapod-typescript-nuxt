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
</body>
</html>

`;
	qfil.writeToFile("~~/debug/output.html", html);
};

export const addToDebugHtml = (content: string): void => {
	qfil.addToTextFileBeforeMarker("~~/debug/output.html", content, "<!-- marker:bottom-of-body -->");
};

export const getDebugBoxHtml = (title: string, lines: string[], extraClass: string = ""): string => {
	let html = `<fieldset class="debugBox ${extraClass}">`;
	const lineLabel = lines.length === 1 ? "line" : "lines";
	html += `<legend>${title.toUpperCase()} <span class="lineCount">(${lines.length} ${lineLabel})</span></legend>`;
	lines.forEach((line) => {
		html += `<div class="line">${line}</div>`;
	});
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

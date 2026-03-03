import * as qstr from "../qtools/qstr";
import * as qfil from "../qtools/qfil";
import * as qdev from "../qtools/qdev";

const phrase = process.argv[2] || "history books";

const notations = [
	{ label: "Title Notation", value: qstr.forceTitleNotation(phrase) },
	{ label: "Text Notation", value: qstr.forceTextNotation(phrase) },
	{ label: "Camel Notation", value: qstr.forceCamelNotation(phrase) },
	{ label: "Pascal Notation", value: qstr.forcePascalNotation(phrase) }
];

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Notations: ${phrase}</title>
	<style>
		body {
			background-color: #121212;
			color: #e0e0e0;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
			padding: 2rem;
		}
		h1 {
			color: #ffffff;
			border-bottom: 2px solid #333;
			padding-bottom: 1rem;
		}
		.notations-grid {
			display: grid;
			grid-template-columns: 200px 1fr;
			gap: 0.8rem 2rem;
			align-items: center;
			margin-top: 2rem;
			font-family: 'JetBrains Mono', 'Fira Code', monospace;
			font-size: 1.1rem;
		}
		.label {
			font-weight: bold;
			color: #888;
			text-transform: uppercase;
			font-size: 0.9rem;
			letter-spacing: 0.05rem;
		}
		.value {
			color: #ff8c00; /* Dark Orange */
			background: #1e1e1e;
			padding: 0.4rem 0.8rem;
			border-radius: 4px;
			border-left: 3px solid #ff8c00;
		}
	</style>
</head>
<body>
	<h1>Test Notations for: "${phrase}"</h1>
	<div class="notations-grid">
`;

notations.forEach(n => {
	html += `
		<div class="label">${n.label}:</div>
		<div class="value">${n.value}</div>`;
});

html += `
	</div>
</body>
</html>
`;

qfil.writeToFile("~~/debug/testn.html", html);
console.log(`Created /debug/testn.html for "${phrase}"`);

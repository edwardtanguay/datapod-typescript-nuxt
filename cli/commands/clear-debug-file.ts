import * as qfil from "../qtools/qfil";

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
	<hr/>
	<!-- marker:bottom-of-body -->
</body>
</html>

`;

qfil.writeToFile("~~/debug/output.html", html);	
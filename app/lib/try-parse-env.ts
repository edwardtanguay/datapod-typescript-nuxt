import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
	EnvSchema: ZodObject<T>,
	buildEnv: Record<string, string | undefined> = process.env,
) {
	try {
		EnvSchema.parse(buildEnv);
	}
	catch (error) {
		if (error instanceof ZodError) {
			let message = "Invalid or missing values in .env:\n";
			error.issues.forEach((issue) => {
				message += `- ${String(issue.path[0])}: ${issue.message}`;
				message += "\n";
			});
			const e = new Error(message);
			e.stack = "";
			throw e;
		}
		else {
			console.error(error);
		}
	}
}
import { z } from 'zod';

import tryParseEnv from './try-parse-env';

const EnvSchema = z.object({
	NODE_ENV: z.string(),
	LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
	CACHE_DRIVER: z.enum(['redis', 'memory', 'file', 'none']),
	TURSO_DATABASE_URL: z.url(),
	TURSO_AUTH_TOKEN: z.string()
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

export default EnvSchema.parse(process.env);
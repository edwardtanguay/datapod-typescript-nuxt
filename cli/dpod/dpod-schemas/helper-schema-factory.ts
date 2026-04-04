import { DpodLineBlock } from "../dpod-line-block";
import { DpodSchema } from "./dpod-schema";
import { DpodSchemaDocument } from "./dpod-schema-document";
import { DpodSchemaDpodItems } from "./dpod-schema-dpod-items";
import { DpodSchemaItems } from "./dpod-schema-items";

export class HelperSchemaFactory {
	static parse(dpodLineBlocks: DpodLineBlock[]): Map<string, DpodSchema> {
		const dpodSchemas = new Map<string, DpodSchema>();
		dpodLineBlocks.forEach((dpodLineBlock) => {
			const tempSchema = new DpodSchema(dpodLineBlock);
			let dpodSchema: DpodSchema;
			switch (tempSchema.schemaType) {
				case "items":
					dpodSchema = new DpodSchemaItems(dpodLineBlock);
					break;
				case "document":
					dpodSchema = new DpodSchemaDocument(dpodLineBlock);
					break;
				case "dpod_items":
					dpodSchema = new DpodSchemaDpodItems(dpodLineBlock);
					break;
				default:
					dpodSchema = new DpodSchemaDpodItems(dpodLineBlock);
					break;
			}
			dpodSchemas.set(dpodSchema.idCode, dpodSchema);
		});
		return dpodSchemas;
	}
}

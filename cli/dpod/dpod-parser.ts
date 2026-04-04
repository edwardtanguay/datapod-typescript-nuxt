import * as qdev from "../qtools/qdev";
import { DpodSchemaFile } from "./dpod-schema-file";
import { DpodSchema } from "./dpod-schemas/dpod-schema";
import { DataEntity } from "./data-entities/data-entity";
import { DataEntityDpodItems } from "./data-entities/data-entity-dpod-items";
import { DataEntityItems } from "./data-entities/data-entity-items";
import { DataEntityDocument } from "./data-entities/data-entity-document";

export class DpodParser {
	private dpodSchemaFile: DpodSchemaFile | null = null;
	private dpodSchemas: Map<string, DpodSchema> = new Map();
	private dataEntities: Map<string, DataEntity> = new Map();

	constructor() {
		this.parse();
		this.debugHtml();
	}

	parse() {
		this.dpodSchemaFile = new DpodSchemaFile("~~/schema.datapod");
		this.dpodSchemas = this.dpodSchemaFile.getCopyOfDpodSchemas();

		this.createDataEntities();
	}

	createDataEntities() {
		this.dpodSchemas.forEach((dpodSchema) => {
			const idCode = dpodSchema.idCode;
			let dataEntity: DataEntity;
			switch (dpodSchema.schemaType) {
				case "dpod_items":
					dataEntity = new DataEntityDpodItems(idCode, dpodSchema);
					break;
				case "items":
					dataEntity = new DataEntityItems(idCode, dpodSchema);
					break;
				case "document":
					dataEntity = new DataEntityDocument(idCode, dpodSchema);
					break;
				default:
					throw new Error(`Unknown schema type: ${dpodSchema.schemaType}`);
			}
			dataEntity.parse();
			this.dataEntities.set(idCode, dataEntity);
		});
	}

	debugHtml() {
		qdev.clearDebug();
		let content = this.dpodSchemaFile?.debugHtml() || "No schema file";

		let dpodSchemasHtml = "";
		this.dpodSchemas.forEach((dpodSchema) => {
			dpodSchemasHtml += dpodSchema.debugHtml();
		});

		content += qdev.getDebugWrapperHtml(`SCHEMAS (${this.dpodSchemas.size})`, dpodSchemasHtml);

		let dataEntitiesHtml = "";
		this.dataEntities.forEach((dataEntity) => {
			dataEntitiesHtml += dataEntity.debugHtml();
		});
		content += qdev.getDebugWrapperHtml(`DATA ENTITIES (${this.dataEntities.size})`, dataEntitiesHtml);

		qdev.addToDebugHtml(qdev.getDebugWrapperHtml("PARSING", content));
	}

	static execute() {
		new DpodParser();
	}
}

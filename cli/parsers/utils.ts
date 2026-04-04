import * as qcli from "../qtools/qcli";
import * as fs from "fs";
import { Flashcard } from "../types";

export const saveFlashcardsToJson = (
	flashcards: Flashcard[],
	jsonFileName: string
): void => {
	try {
		const jsonData = JSON.stringify(flashcards, null, 2);
		fs.writeFileSync(jsonFileName, jsonData, "utf-8");
		qcli.message(
			`Successfully saved ${flashcards.length} flashcards to ${jsonFileName}`,
			"success"
		);
	} catch (error) {
		qcli.message(
			`Error saving flashcards to ${jsonFileName}: ${(error as Error).message}`,
			"error"
		);
	}
};
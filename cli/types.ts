export type Flashcard = {
	suuid: string;
	category: string;
	front: string;
	back: string;
};

export type DpodSchemaType = "dpod_items" | "document" | "items";
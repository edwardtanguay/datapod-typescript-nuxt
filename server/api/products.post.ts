import { defineEventHandler, readBody, createError } from "h3";
import type { TestProduct } from "../../shared/types";

export default defineEventHandler(async (event) => {
	const random = Math.floor(Math.random() * 2) + 1;
	if (random === 2) {
		throw createError({
			statusCode: 500,
			statusMessage: "Server not responding, try again",
			data: { message: "Server not responding, try again" }
		});
	}

	await new Promise(resolve => setTimeout(resolve, 2000));
	const body = await readBody(event);
	const num: number = Number(body.num);

	const testProducts: TestProduct[] = [
		{ id: 1, name: "Product 1" },
		{ id: 2, name: "Product 2" },
		{ id: 3, name: "Product 3" },
	];

	const obj = testProducts.find(o => o.id === num);
	if (!obj) {
		throw createError({
			statusCode: 404,
			statusMessage: "Product not found",
			data: { message: "Product not found" }
		});
	}

	return obj as TestProduct;
});

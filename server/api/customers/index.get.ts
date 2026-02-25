import { defineEventHandler } from "h3";
import { customers } from "./data";

export default defineEventHandler(async (event) => {
	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 500));

	const query = getQuery(event);
	const searchTerm = String(query.q || '').toLowerCase();

	if (!searchTerm) {
		return customers;
	}

	return customers.filter(customer =>
		customer.firstName.toLowerCase().includes(searchTerm) ||
		customer.lastName.toLowerCase().includes(searchTerm) ||
		customer.email.toLowerCase().includes(searchTerm)
	);
});

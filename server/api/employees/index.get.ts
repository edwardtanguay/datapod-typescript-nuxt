import { defineEventHandler } from "h3";
import { employees } from "./data";

export default defineEventHandler(async (event) => {
	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 500));

	const query = getQuery(event);
	const searchTerm = String(query.q || '').toLowerCase();

	if (!searchTerm) {
		return employees;
	}

	return employees.filter(emp =>
		emp.firstName.toLowerCase().includes(searchTerm) ||
		emp.lastName.toLowerCase().includes(searchTerm) ||
		emp.position.toLowerCase().includes(searchTerm)
	);
});

import { defineEventHandler, createError } from "h3";
import { employees } from "./data";

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);

	if (!id || isNaN(id)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid employee ID",
			data: { message: "Employee ID must be a valid number" }
		});
	}

	// Find employee index
	const employeeIndex = employees.findIndex(emp => emp.id === id);

	if (employeeIndex === -1) {
		throw createError({
			statusCode: 404,
			statusMessage: "Employee not found",
			data: { message: `Employee with ID ${id} not found` }
		});
	}

	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 500));

	// Remove employee
	employees.splice(employeeIndex, 1);

	return { success: true, message: `Employee with ID ${id} deleted successfully` };
});

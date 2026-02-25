import { defineEventHandler, readBody, createError } from "h3";
import type { Employee } from "../../../shared/types";
import { employees } from "./data";

export default defineEventHandler(async (event) => {
	const id = Number(event.context.params?.id);
	const body = await readBody(event);

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

	// Validate required fields
	if (!body.firstName || !body.lastName || !body.email || !body.position || body.salary === undefined) {
		throw createError({
			statusCode: 400,
			statusMessage: "Missing required fields",
			data: { message: "All fields are required: firstName, lastName, email, position, salary" }
		});
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(body.email)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid email format",
			data: { message: "Please provide a valid email address" }
		});
	}

	// Simulate network delay
	await new Promise(resolve => setTimeout(resolve, 500));

	// Update employee
	const updatedEmployee: Employee = {
		id,
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		position: body.position,
		salary: Number(body.salary)
	};

	employees[employeeIndex] = updatedEmployee;

	return updatedEmployee;
});

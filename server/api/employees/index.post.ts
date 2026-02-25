import { defineEventHandler, readBody, createError } from "h3";
import type { Employee } from "../../../shared/types";
import { employees, incrementNextId } from "./data";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

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

	const newEmployee: Employee = {
		id: incrementNextId(),
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		position: body.position,
		salary: Number(body.salary)
	};

	employees.push(newEmployee);

	return newEmployee;
});

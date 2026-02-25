import type { Employee } from "../../../shared/types";

// In-memory storage for demo purposes
// In a real app, this would be a database
export const employees: Employee[] = [
	{
		id: 1,
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@example.com",
		position: "Software Engineer",
		salary: 75000
	},
	{
		id: 2,
		firstName: "Jane",
		lastName: "Smith",
		email: "jane.smith@example.com",
		position: "Product Manager",
		salary: 85000
	},
	{
		id: 3,
		firstName: "Bob",
		lastName: "Johnson",
		email: "bob.johnson@example.com",
		position: "UX Designer",
		salary: 70000
	}
];

export let nextId = 4;

export function incrementNextId() {
	return nextId++;
}

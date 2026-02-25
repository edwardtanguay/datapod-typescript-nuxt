import type { Customer } from "../../../shared/types";

// In-memory storage for demo purposes
// In a real app, this would be a database
export const customers: Customer[] = [
	{
		id: 1,
		firstName: "Hans",
		lastName: "Müller",
		email: "hans.mueller@example.de"
	},
	{
		id: 2,
		firstName: "Petra",
		lastName: "Schmidt",
		email: "petra.schmidt@google.de"
	},
	{
		id: 3,
		firstName: "Klaus",
		lastName: "Weber",
		email: "klaus.weber@example.de"
	},
	{
		id: 4,
		firstName: "Ursula",
		lastName: "Wagner",
		email: "ursula.wagner@example.de"
	},
	{
		id: 5,
		firstName: "Thomas",
		lastName: "Becker",
		email: "thomas.becker@example.de"
	},
	{
		id: 6,
		firstName: "Monika",
		lastName: "Hoffmann",
		email: "monika.hoffmann@example.de"
	},
	{
		id: 7,
		firstName: "Andreas",
		lastName: "Schäfer",
		email: "andreas.schaefer@example.de"
	},
	{
		id: 8,
		firstName: "Sabine",
		lastName: "Koch",
		email: "sabine.koch@example.de"
	},
	{
		id: 9,
		firstName: "Michael",
		lastName: "Bauer",
		email: "michael.bauer@example.de"
	},
	{
		id: 10,
		firstName: "Helga",
		lastName: "Richter",
		email: "helga.richter@example.de"
	}
];

export let nextId = 11;

export function incrementNextId() {
	return nextId++;
}

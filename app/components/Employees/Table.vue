<script setup lang="ts">
import type { Employee } from "~~/shared/types";

const props = defineProps<{
	employees: Employee[];
	loading?: boolean;
}>();

const emit = defineEmits<{
	(e: 'edit', employee: Employee): void;
	(e: 'delete', id: number): void;
}>();

const columns = [
	{ key: 'id', label: 'ID' },
	{ key: 'firstName', label: 'First Name' },
	{ key: 'lastName', label: 'Last Name' },
	{ key: 'email', label: 'Email' },
	{ key: 'position', label: 'Position' },
	{ key: 'salary', label: 'Salary' },
	{ key: 'actions', label: 'Actions' },
];

const formatSalary = (salary: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(salary);
};

const handleEdit = (employee: Employee) => {
	emit('edit', employee);
};

const handleDelete = (id: number) => {
	emit('delete', id);
};
</script>

<template>
	<UCard class="shadow-sm">
		<template #header>
			<div class="flex flex-col sm:flex-row items-center justify-between gap-2">
				<div class="flex items-center gap-2">
					<UIcon name="i-heroicons-users"
							class="w-6 h-6 text-primary mt-1" />
					<span class="text-2xl font-bold">Employee List</span>
				</div>
				<UBadge color="primary"
						variant="subtle"
						size="sm"
						class="sm:ml-2">
					{{ employees.length }} {{ employees.length === 1 ? 'employee' : 'employees' }}
				</UBadge>
			</div>
		</template>

		<div v-if="loading"
			 class="flex justify-center items-center py-12">
			<UIcon name="i-heroicons-arrow-path"
				   class="w-8 h-8 animate-spin text-primary" />
		</div>

		<div v-else-if="employees.length === 0"
			 class="text-center py-12">
			<UIcon name="i-heroicons-user-group"
				   class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
			<p class="text-gray-500 dark:text-gray-400 text-lg">No employees found</p>
			<p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Add your first employee to get started</p>
		</div>

		<div v-else
			 class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
					<tr>
						<th v-for="column in columns"
							:key="column.key"
							class="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
							:class="{ 'text-right': column.key === 'actions' }">
							{{ column.label }}
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
					<tr v-for="employee in employees"
						:key="employee.id"
						class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
						<td class="px-4 py-4 text-sm">
							<UBadge color="primary"
									variant="subtle">{{ employee.id }}</UBadge>
						</td>
						<td class="px-4 py-4 text-sm font-medium">{{ employee.firstName }}</td>
						<td class="px-4 py-4 text-sm font-medium">{{ employee.lastName }}</td>
						<td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{{ employee.email }}</td>
						<td class="px-4 py-4 text-sm">
							<UBadge color="primary"
									variant="subtle">{{ employee.position }}</UBadge>
						</td>
						<td class="px-4 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
							{{ formatSalary(employee.salary) }}
						</td>
						<td class="px-4 py-4 text-sm text-right">
							<div class="flex gap-2 justify-end">
								<UButton icon="i-heroicons-pencil-square"
										 size="sm"
										 color="primary"
										 variant="soft"
										 @click="handleEdit(employee)"
										 title="Edit employee" />
								<UButton icon="i-heroicons-trash"
										 size="sm"
										 color="error"
										 variant="soft"
										 @click="handleDelete(employee.id)"
										 title="Delete employee" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type { Employee } from "~~/shared/types";

// Page metadata
useHead({
	title: 'Employee Management',
	meta: [
		{ name: 'description', content: 'Manage your employees - add, edit, and delete employee records' }
	]
});

// State
const employees = ref<Employee[]>([]);
const isLoading = ref(false);
const showForm = ref(false);
const editingEmployee = ref<Employee | null>(null);
const errorMsg = ref<string | null>(null);
const successMsg = ref<string | null>(null);

// Fetch employees on mount
const fetchEmployees = async () => {
	isLoading.value = true;
	errorMsg.value = null;

	try {
		const data = await $fetch<Employee[]>('/api/employees');
		employees.value = data;
	} catch (err: any) {
		errorMsg.value = err.data?.message || err.statusMessage || 'Failed to load employees';
	} finally {
		isLoading.value = false;
	}
};

// Add new employee
const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
	errorMsg.value = null;
	successMsg.value = null;

	try {
		const newEmployee = await $fetch<Employee>('/api/employees', {
			method: 'POST',
			body: employeeData
		});

		employees.value.push(newEmployee);
		showForm.value = false;
		successMsg.value = `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!`;

		// Clear success message after 3 seconds
		setTimeout(() => {
			successMsg.value = null;
		}, 3000);
	} catch (err: any) {
		errorMsg.value = err.data?.message || err.statusMessage || 'Failed to add employee';
	}
};

// Update employee
const handleUpdateEmployee = async (employeeData: Employee) => {
	errorMsg.value = null;
	successMsg.value = null;

	try {
		const updatedEmployee = await $fetch<Employee>(`/api/employees/${employeeData.id}`, {
			method: 'PUT',
			body: employeeData
		});

		const index = employees.value.findIndex(emp => emp.id === updatedEmployee.id);
		if (index !== -1) {
			employees.value[index] = updatedEmployee;
		}

		showForm.value = false;
		editingEmployee.value = null;
		successMsg.value = `Employee ${updatedEmployee.firstName} ${updatedEmployee.lastName} updated successfully!`;

		// Clear success message after 3 seconds
		setTimeout(() => {
			successMsg.value = null;
		}, 3000);
	} catch (err: any) {
		errorMsg.value = err.data?.message || err.statusMessage || 'Failed to update employee';
	}
};

// Handle form submission
const handleFormSubmit = (employeeData: Omit<Employee, 'id'> | Employee) => {
	if ('id' in employeeData) {
		handleUpdateEmployee(employeeData);
	} else {
		handleAddEmployee(employeeData);
	}
};

// Edit employee
const handleEdit = (employee: Employee) => {
	editingEmployee.value = employee;
	showForm.value = true;
	errorMsg.value = null;
	successMsg.value = null;
};

// Delete employee
const handleDelete = async (id: number) => {
	const employee = employees.value.find(emp => emp.id === id);
	if (!employee) return;

	// Confirm deletion
	if (!confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
		return;
	}

	errorMsg.value = null;
	successMsg.value = null;

	try {
		await $fetch(`/api/employees/${id}`, {
			method: 'DELETE'
		});

		employees.value = employees.value.filter(emp => emp.id !== id);
		successMsg.value = `Employee ${employee.firstName} ${employee.lastName} deleted successfully!`;

		// Clear success message after 3 seconds
		setTimeout(() => {
			successMsg.value = null;
		}, 3000);
	} catch (err: any) {
		errorMsg.value = err.data?.message || err.statusMessage || 'Failed to delete employee';
	}
};

// Cancel form
const handleCancel = () => {
	showForm.value = false;
	editingEmployee.value = null;
	errorMsg.value = null;
};

// Show add form
const showAddForm = () => {
	editingEmployee.value = null;
	showForm.value = true;
	errorMsg.value = null;
	successMsg.value = null;
};

// Load employees on mount
onMounted(() => {
	fetchEmployees();
});
</script>

<template>
	<div>
		<UCard class="font-mono bg-indigo-200/50 dark:bg-indigo-900/20 border-indigo-200/50 dark:border-indigo-900/50">
			<template #header>
				<p>Note for online/offline use</p>
			</template>
			<ul class="list-disc ml-5 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-3 mt-3">
				<li>this is a demo of a CRUD page that uses a backend API which makes changes to the data</li>
				<li>when you use it locally, changes will be seen until you restart the node server (npm run dev)</li>
				<li>when you use it online, these changes will persist for a short random amount of time</li>
				<li>this allows you to see how the app works in an online environment</li>
			</ul>
		</UCard>
		<section class="max-w-7xl mx-auto py-12 px-4">
			<!-- Page Header -->
			<div class="mb-8">
				<div class="flex flex-col sm:flex-row text-center sm:text-start items-center justify-between mb-4">
					<div class="mb-3 sm:mb-0">
						<h1 class="text-4xl font-bold mb-2">Employee Management</h1>
						<p class="text-gray-600 dark:text-gray-400">Manage your team members and their information</p>
					</div>
					<UButton v-if="!showForm"
							 icon="i-heroicons-plus"
							 size="lg"
							 color="primary"
							 @click="showAddForm">
						Add Employee
					</UButton>
				</div>
			</div>

			<!-- Success Message -->
			<UAlert v-if="successMsg"
					icon="i-heroicons-check-circle"
					color="success"
					variant="soft"
					title="Success"
					:description="successMsg"
					class="mb-6"
					:close-button="{ icon: 'i-heroicons-x-mark', color: 'success', variant: 'link' }"
					@close="successMsg = null" />

			<!-- Error Message -->
			<UAlert v-if="errorMsg"
					icon="i-heroicons-exclamation-triangle"
					color="error"
					variant="soft"
					title="Error"
					:description="errorMsg"
					class="mb-6"
					:close-button="{ icon: 'i-heroicons-x-mark', color: 'error', variant: 'link' }"
					@close="errorMsg = null" />

			<!-- Form Section -->
			<div v-if="showForm"
				 class="mb-8">
				<EmployeesForm :employee="editingEmployee"
							   @submit="handleFormSubmit"
							   @cancel="handleCancel" />
			</div>

			<!-- Table Section -->
			<EmployeesTable :employees="employees"
							:loading="isLoading"
							@edit="handleEdit"
							@delete="handleDelete" />
		</section>
	</div>
</template>

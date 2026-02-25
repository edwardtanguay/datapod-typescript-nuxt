<script setup lang="ts">
import type { Employee } from "~~/shared/types";

const props = defineProps<{
	employee?: Employee | null;
}>();

const emit = defineEmits<{
	(e: 'submit', employee: Omit<Employee, 'id'> | Employee): void;
	(e: 'cancel'): void;
}>();

const formData = ref({
	firstName: props.employee?.firstName || '',
	lastName: props.employee?.lastName || '',
	email: props.employee?.email || '',
	position: props.employee?.position || '',
	salary: props.employee?.salary || 0,
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
	isSubmitting.value = true;

	try {
		if (props.employee) {
			// Edit mode - include the id
			emit('submit', { ...formData.value, id: props.employee.id });
		} else {
			// Create mode - no id
			emit('submit', formData.value);
		}
	} finally {
		isSubmitting.value = false;
	}
};

const handleCancel = () => {
	emit('cancel');
};

// Watch for prop changes to update form when editing different employees
watch(() => props.employee, (newEmployee) => {
	if (newEmployee) {
		formData.value = {
			firstName: newEmployee.firstName,
			lastName: newEmployee.lastName,
			email: newEmployee.email,
			position: newEmployee.position,
			salary: newEmployee.salary,
		};
	} else {
		formData.value = {
			firstName: '',
			lastName: '',
			email: '',
			position: '',
			salary: 0,
		};
	}
}, { immediate: true });
</script>

<template>
	<UCard class="shadow-sm">
		<template #header>
			<div class="flex items-center gap-2">
				<UIcon :name="employee ? 'i-heroicons-pencil-square' : 'i-heroicons-user-plus'"
					   class="w-6 h-6 text-primary mt-1" />
				<span class="text-2xl font-bold">
					{{ employee ? 'Edit Employee' : 'Add New Employee' }}
				</span>
			</div>
		</template>

		<form @submit.prevent="handleSubmit"
			  class="space-y-4">
			<div class="flex flex-col md:flex-row gap-4">
				<UFormGroup label="First Name"
							name="firstName"
							required>
					<UInput v-model="formData.firstName"
							type="text"
							icon="i-heroicons-user"
							size="lg"
							:disabled="isSubmitting"
							placeholder="John" />
				</UFormGroup>

				<UFormGroup label="Last Name"
							name="lastName"
							required>
					<UInput v-model="formData.lastName"
							type="text"
							icon="i-heroicons-user"
							size="lg"
							:disabled="isSubmitting"
							placeholder="Doe" />
				</UFormGroup>
			</div>

			<div class="flex flex-col md:flex-row gap-4">
			<UFormGroup label="Email"
						name="email"
						required>
				<UInput v-model="formData.email"
						type="email"
						icon="i-heroicons-envelope"
						size="lg"
						:disabled="isSubmitting"
						placeholder="john.doe@example.com" />
			</UFormGroup>

			<UFormGroup label="Position"
						name="position"
						required>
				<UInput v-model="formData.position"
						type="text"
						icon="i-heroicons-briefcase"
						size="lg"
						:disabled="isSubmitting"
						placeholder="Software Engineer" />
			</UFormGroup>

			<UFormGroup label="Salary"
						name="salary"
						required>
				<UInput v-model.number="formData.salary"
						type="number"
						icon="i-heroicons-currency-dollar"
						size="lg"
						:disabled="isSubmitting"
						placeholder="50000"
						min="0"
						step="1000" />
			</UFormGroup>
			</div>	

			<div class="flex gap-3 pt-4">
				<UButton type="submit"
						 size="lg"
						 icon="i-heroicons-check"
						 :loading="isSubmitting"
						 color="primary"
						 variant="solid"
						 class="">
					{{ isSubmitting ? 'Saving...' : (employee ? 'Update Employee' : 'Add Employee') }}
				</UButton>

				<UButton type="button"
						 size="lg"
						 icon="i-heroicons-x-mark"
						 :disabled="isSubmitting"
						 color="neutral"
						 variant="outline"
						 @click="handleCancel">
					Cancel
				</UButton>
			</div>
		</form>
	</UCard>
</template>

<template>
	<Form
		:fields="[
			{
				name: 'name',
				label: 'Project Name',
				type: 'text',
				required: true,
				placeholder: 'Enter project name',
			},

			{
				name: 'location',
				label: 'Location',
				type: 'text',
				required: true,
			},
			{
				name: 'contractor',
				label: 'Contractor',
				type: 'dropdown',
				required: true,
				options: [
					'New York',
					'Los Angeles',
					'Chicago',
					'Houston',
					'Philadelphia',
				].map((option) => ({
					getID() {
						return option.toLowerCase().replace(/\s+/g, '-');
					},
					getDisplayName() {
						return option;
					},
				})),
			},
			{
				name: 'contract_sum',
				label: 'Contract Sum',
				type: 'number',
				required: true,
				placeholder: '1,000,000',
			},
			{
				name: 'awarded_date',
				label: 'Contract Awarded on',
				type: 'date',
				required: true,
			},
			{
				name: 'start_date',
				label: 'Contract Start Date',
				type: 'date',
				required: true,
			},
			{
				name: 'end_date',
				label: 'Contract End Date',
				type: 'date',
				required: true,
			},
			{
				name: 'description',
				label: 'Description',
				type: 'textarea',
				required: true,
				placeholder: 'Enter project description',
			},
		]"
		@submit="login"
		v-slot:actions="{ form, errors }"
	>
		<Button type="submit" variant="filled" class="px-6">Login</Button>
	</Form>
</template>

<script setup lang="ts">
import Form from "@components/Form.vue";
import Button from "@components/shared/button/Button.vue";

import { getPersistentState } from "@src/utils/state";
import { valync } from "@src/utils/valync";
import { nextTick, onMounted, ref } from "vue";

const login = (event: any) => {
	console.log(event);
};
</script>

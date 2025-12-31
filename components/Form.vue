<template>
	<form @submit.prevent="submit">
		<div v-for="field in fields" :key="field.name" class="mb-4">
			<TextField
				v-if="field.type != 'dropdown' && field.type != 'textarea'"
				v-model="form[field.name]"
				:type="field.type || 'text'"
				:label="field.label"
				:placeholder="field.placeholder || field.label"
				:variant="(field as TextInputField).variant || 'outlined'"
				:class="field.class"
				:error="!!errors[field.name]"
				:disabled="loading"
				:autocomplete="(field as TextInputField).autocomplete ?? ''"
				style="font-size: 10px"
			/>
			<textarea
				v-if="field.type == 'textarea'"
				v-model="form[field.name]"
				:label="field.label"
				:placeholder="field.placeholder || field.label"
				:variant="(field as TextInputField).variant || 'outlined'"
				:class="field.class"
				class="w-full border border-slate-400 rounded-md outline-1 outline-blue-500 p-3 min-h-32"
				:error="!!errors[field.name]"
				:disabled="loading"
				style="font-size: 10px"
			/>
			<Dropdown
				v-if="field.type == 'dropdown'"
				v-model="form[field.name]"
				:id="field.name"
				:label="field.label"
				:options="
					field.options.map((option) => ({
						label: option.getDisplayName(),
						value: option.getID(),
					}))
				"
				:required="field.required"
				:default="field.default"
				:rules="field.rules"
				:class="field.class"
				:disabled="loading"
				style="font-size: 10px"
			/>
			<div v-if="errors[field.name]" class="text-red-500 text-xs mt-1">
				{{ errors[field.name] }}
			</div>
		</div>
		<slot name="actions">
			<!-- Example: a button, you can slotted customize. -->
			<Button type="submit" :disabled="loading || !isValid">
				Submit
			</Button>
		</slot>
	</form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import TextField from "./shared/text-field/TextField.vue";
import Dropdown from "./shared/dropdown/Dropdown.vue";
import Button from "./shared/button/Button.vue";

type FieldType = "text" | "email" | "password" | "date" | "number" | "textarea";

type TextInputField = {
	name: string;
	label: string;
	type?: FieldType;
	required?: boolean;
	default?: any;
	rules?: ((value: any) => true | string)[];
	placeholder?: string;
	variant?: Variant;
	class?: string;
	autocomplete?: string;
};

type DropdownOption = {
	getID(): string;
	getDisplayName(): string;
};

type DropdownField = {
	name: string;
	label: string;
	type?: "dropdown";
	required?: boolean;
	default?: any;
	rules?: ((value: any) => true | string)[];
	placeholder?: string;
	class?: string;
	options: DropdownOption[];
};

type Field = TextInputField | DropdownField;

const props = defineProps<{
	fields: Field[];
	loading?: boolean;
}>();

const emit = defineEmits(["submit", "update:modelValue"]);

const form = reactive<{ [k: string]: any }>({});
const errors = reactive<{ [k: string]: string }>({});

// Auto-init fields and values
props.fields.forEach((field) => {
	if (form[field.name] === undefined) form[field.name] = field.default ?? "";
});

function validate() {
	let ok = true;
	props.fields.forEach((field) => {
		const value = form[field.name];
		let error = "";
		if (field.required && !value) error = `${field.label} is required`;
		if (field.rules) {
			for (const rule of field.rules) {
				const valid = rule(value);
				if (valid !== true) {
					error = valid as string;
					break;
				}
			}
		}
		errors[field.name] = error;
		if (error) ok = false;
	});
	return ok;
}

const isValid = computed(() => {
	validate();
	return !Object.values(errors).some((e) => !!e);
});

watch(
	() => ({ ...form }),
	(val) => {
		emit("update:modelValue", { ...val });
		validate();
	},
	{ deep: true, immediate: true },
);

function submit() {
	if (validate()) emit("submit", { ...form });
}
</script>

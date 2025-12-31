<template>
	<component
		:is="textFieldTag"
		v-bind="attrs"
		:type="type"
		:label="label"
		:placeholder="placeholder"
		:disabled="disabled"
		:value="modelValue"
		@input="onInput"
		@change="onChange"
		@blur="$emit('blur', $event)"
		@focus="$emit('focus', $event)"
		class="w-full"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
// Import Material Web TextFields
import "@material/web/textfield/filled-text-field.js";
import "@material/web/textfield/outlined-text-field.js";
import { computed, useAttrs } from "vue";

const props = withDefaults(
	defineProps<{
		variant?: Variant;
		modelValue?: string | number;
		type?: string;
		label?: string;
		placeholder?: string;
		disabled?: boolean;
	}>(),
	{
		variant: "filled",
		modelValue: "",
		type: "text",
		label: "",
		placeholder: "",
		disabled: false,
	},
);

const attrs = useAttrs();

const textFieldTag = computed(() => {
	switch (props.variant) {
		case "outlined":
			return "md-outlined-text-field";
		case "filled":
		default:
			return "md-filled-text-field";
	}
});

// v-model support
function onInput(event: Event) {
	const value = (event.target as HTMLInputElement)?.value;
	emitModel(value);
}
function onChange(event: Event) {
	const value = (event.target as HTMLInputElement)?.value;
	emitModel(value);
}
function emitModel(value: string | number) {
	// Let Vue handle number if needed
	// NaN checking: for type 'number', enforce correct type
	if (props.type === "number" && value !== "") {
		const asNumber = Number(value);
		if (!isNaN(asNumber)) {
			emit("update:modelValue", asNumber);
			return;
		}
	}
	emit("update:modelValue", value);
}

// For v-model
const emit = defineEmits([
	"update:modelValue",
	"input",
	"change",
	"blur",
	"focus",
]);
</script>

<style>
md-outlined-text-field.input-wrapper {
	--md-outlined-field-label-text-padding-bottom: 10px;
	--md-outlined-field-outline-label-padding: 10px;
}
</style>

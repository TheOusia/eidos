<template>
	<component :is="progressTag" v-bind="progressProps" :attrs="attrs">
		<slot />
	</component>
</template>

<script setup lang="ts">
// Import Material Web Progress components
import "@material/web/progress/linear-progress.js";
import "@material/web/progress/circular-progress.js";
import { computed, useAttrs } from "vue";

type ProgressType = "linear" | "circular";

const props = withDefaults(
	defineProps<{
		type?: ProgressType;
		value?: number;
		max?: number;
		indeterminate?: boolean;
		fourColor?: boolean;
	}>(),
	{
		type: "linear",
		value: 0,
		max: 1,
		indeterminate: false,
		fourColor: false,
	},
);

const attrs = useAttrs();

const progressTag = computed(() => {
	switch (props.type) {
		case "circular":
			return "md-circular-progress";
		case "linear":
		default:
			return "md-linear-progress";
	}
});

const progressProps = computed(() => {
	if (props.type === "circular") {
		// Circular: Value is 0-1 (fraction), fourColor supported
		return {
			value: props.value,
			indeterminate: props.indeterminate,
			"four-color": props.fourColor,
		};
	} else {
		// Linear: Value is 0-1 (fraction), max for progress, fourColor supported
		return {
			value: props.value,
			max: props.max,
			indeterminate: props.indeterminate,
			"four-color": props.fourColor,
		};
	}
});
</script>

<template>
	<component :is="buttonTag" v-bind="attrs">
		<slot />
	</component>
</template>

<script setup lang="ts">
// Import Material Web Components for all button variants
import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/elevated-button.js";

import { computed, useAttrs } from "vue";

// Variant type -- matches MD Web naming
type Variant = "filled" | "outlined" | "elevated";

// Props for MD button -- extend as needed for icon, disabled, etc.
const props = withDefaults(
	defineProps<{
		variant?: Variant;
	}>(),
	{
		variant: "filled",
	},
);

// Gather other inherited attributes
const attrs = useAttrs();

// Map variant to the correct Material Web tag name
const buttonTag = computed(() => {
	switch (props.variant) {
		case "filled":
			return "md-filled-button";
		case "outlined":
			return "md-outlined-button";
		case "elevated":
			return "md-elevated-button";
		default:
			return "md-filled-button";
	}
});
</script>

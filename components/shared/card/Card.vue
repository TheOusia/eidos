<template>
	<div :class="cardClasses" v-bind="attrs">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

type Variant = "filled" | "outlined" | "elevated";

const props = withDefaults(
	defineProps<{
		variant?: Variant;
		class?: string;
	}>(),
	{
		variant: "filled",
		class: "",
	},
);

const attrs = useAttrs();

const variantMap = {
	filled: "bg-surface-container-low text-on-surface shadow-none border border-outline/10",
	outlined: "bg-surface text-on-surface border border-outline shadow-none",
	elevated: "bg-surface text-on-surface shadow-md border-t border-zinc-100",
};

const cardClasses = computed(() => [
	// Material 3 card shape and padding
	"block rounded-xl p-3 transition-shadow duration-150",
	variantMap[props.variant] || variantMap.filled,
	props.class,
	attrs.class, // allow external tailwind classes, too
]);
</script>

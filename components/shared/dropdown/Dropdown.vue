<template>
	<div class="w-full">
		<label
			v-if="label"
			class="block mb-1 text-xs font-medium text-on-surface-variant"
			>{{ label }}</label
		>
		<div class="relative text-sm">
			<button
				ref="toggle"
				type="button"
				class="w-full bg-surface border border-outline rounded-md px-4 py-3 text-left shadow-sm focus:ring-2 focus:ring-primary/30 flex items-center"
				@click="open = !open"
				@keydown.down.prevent="
					open = true;
					focusOption(0);
				"
				@keydown.up.prevent="
					open = true;
					focusOption(options.length - 1);
				"
				:aria-expanded="open"
				:aria-controls="props.id"
			>
				<span v-if="selectedLabel" class="text-on-surface">{{
					selectedLabel
				}}</span>
				<span v-else class="text-on-surface-variant">{{
					placeholder
				}}</span>
				<md-icon class="ml-auto">expand_more</md-icon>
			</button>

			<ul
				v-show="open"
				:id="props.id"
				class="absolute z-50 w-full mt-1 bg-surface backdrop-blur-lg border border-outline rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
				@keydown.down.prevent="focusOption(focusedIndex + 1)"
				@keydown.up.prevent="focusOption(focusedIndex - 1)"
				@keydown.enter.prevent="selectOption(focusedIndex)"
				@keydown.esc.prevent="open = false"
			>
				<li
					v-for="(option, i) in options"
					:key="option.value"
					:class="[
						'px-4 py-2 cursor-pointer select-none hover:bg-zinc-200 hover:text-primary',
						{
							'bg-primary/10 text-primary':
								modelValue === option.value,
							'bg-surface-variant':
								focusedIndex === i &&
								modelValue !== option.value,
						},
					]"
					@mousedown.prevent="select(option)"
					@mouseenter="focusedIndex = i"
					:tabindex="-1"
				>
					{{ option.label }}
				</li>
			</ul>
		</div>
		<div v-if="error" class="text-error text-xs mt-1">{{ error }}</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import "@material/web/icon/icon.js";

const props = defineProps<{
	modelValue: string | number | null;
	options: { value: string | number; label: string }[];
	label?: string;
	placeholder?: string;
	id: string;
	error?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const focusedIndex = ref(-1);

const selectedLabel = computed(() => {
	const match = props.options.find((opt) => opt.value === props.modelValue);
	return match ? match.label : "";
});

function select(option) {
	emit("update:modelValue", option.value);
	open.value = false;
}
function selectOption(i) {
	if (i >= 0 && i < props.options.length) {
		select(props.options[i]);
	}
}
function focusOption(i) {
	if (i < 0) i = 0;
	if (i >= props.options.length) i = props.options.length - 1;
	focusedIndex.value = i;
}
onMounted(() => {
	window.addEventListener("click", onGlobalClick);
});
onBeforeUnmount(() => {
	window.removeEventListener("click", onGlobalClick);
});
function onGlobalClick(e) {
	if (!(e.target as Node).closest(`[#${props.id}],button`)) {
		open.value = false;
	}
}
watch(open, (v) => {
	if (!v) focusedIndex.value = -1;
});
</script>

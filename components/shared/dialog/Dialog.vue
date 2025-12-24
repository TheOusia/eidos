<template>
	<md-dialog
		ref="dialogRef"
		:open="open"
		v-bind="attrs"
		@closed="onClosed"
		@opened="onOpened"
	>
		<slot name="headline"></slot>
		<slot name="content" />
		<slot name="actions"></slot>
	</md-dialog>
</template>

<script setup lang="ts">
// Import Material Web Dialog
import "@material/web/dialog/dialog.js";
import { ref, watch, onMounted, useAttrs } from "vue";

const props = defineProps<{
	open: boolean;
}>();

const emit = defineEmits<{
	(e: "update:open", v: boolean): void;
	(e: "opened"): void;
	(e: "closed"): void;
}>();

const attrs = useAttrs();
const dialogRef = ref<HTMLElement | null>(null);

// Sync open prop with dialog for controlled usage
watch(
	() => props.open,
	(v) => {
		if (dialogRef.value) {
			if (v && !dialogRef.value.hasAttribute("open")) {
				dialogRef.value.setAttribute("open", "");
			} else if (!v && dialogRef.value.hasAttribute("open")) {
				dialogRef.value.removeAttribute("open");
			}
		}
	},
);

onMounted(() => {
	if (dialogRef.value && props.open) {
		dialogRef.value.setAttribute("open", "");
	}
});

function onClosed() {
	emit("update:open", false);
	emit("closed");
}
function onOpened() {
	emit("update:open", true);
	emit("opened");
}
</script>

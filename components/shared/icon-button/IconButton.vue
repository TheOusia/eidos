<template>
	<md-icon-button v-bind="attrs" :disabled="disabled">
		<slot />
	</md-icon-button>
</template>

<script setup lang="ts">
// Import Material Web Component for icon button
import "@material/web/iconbutton/icon-button.js";

import { useAttrs } from "vue";

// Pass through props, including disabled for native MD Web support
const props = defineProps<{
	disabled?: boolean;
}>();
const attrs = useAttrs();
</script>

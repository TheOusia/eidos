<template>
	<div class="w-full max-w-lg">
		<TextField
			type="text"
			variant="outlined"
			size="small"
			label="Project Name"
			placeholder="Project Name"
		/>
	</div>
</template>

<script setup lang="ts">
import TextField from "@components/shared/text-field/TextField.vue";
import { getPersistentState } from "@src/utils/state";
import { valync } from "@src/utils/valync";
import { nextTick, onMounted, ref } from "vue";

const loading = ref(false);
onMounted(async () => {
	await nextTick();

	loading.value = true;
	const result = await valync<Project[]>("/projects", {
		method: "POST",
		headers: {
			authorization: getPersistentState<string>("auth.token", ""),
		},
	});
	loading.value = false;
});
</script>

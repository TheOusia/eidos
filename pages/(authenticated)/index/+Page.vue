<template>
	<teleport to="#dashboard-title"> Dashboard H </teleport>
	<a href="/projects/create">
		<Button class="px-4">Create Project</Button>
	</a>
</template>

<script setup lang="ts">
import Button from "@components/shared/button/Button.vue";
import { getPersistentState } from "@src/utils/state";
import { valync } from "@src/utils/valync";
import { nextTick, onMounted, ref } from "vue";

const loading = ref(false);
onMounted(async () => {
	await nextTick();
	const datas: Project[] = [
		{
			id: "asdsa",
			title: "Project Name",
			description: "Project Description",
		},
	];

	// loading.value = true;
	// const result = await valync<Project[]>("/projects", {
	// 	method: "POST",
	// 	headers: {
	// 		authorization: getPersistentState<string>("auth.token", ""),
	// 	},
	// });
	// loading.value = false;
});
</script>

<template>
	<teleport to="#dashboard-title"> Dashboard H </teleport>
	<a href="/projects/create">
		<Button class="px-4">Create Project</Button>
	</a>

	<div v-for="project in datas" :key="project.id" class="flex flex-col gap-4">
		<ProjectCard :project="project" />
	</div>
</template>

<script setup lang="ts">
import Button from "@components/shared/button/Button.vue";
import ProjectCard from "@components/domain/ProjectCard.vue";

import { getPersistentState } from "@src/utils/state";
import { valync } from "@src/utils/valync";
import { nextTick, onMounted, ref } from "vue";

const loading = ref(false);
const datas: Project[] = [
	{
		id: "asdsa",
		title: "Project Name",
		description: "Project Description",
	},
];
onMounted(async () => {
	await nextTick();

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

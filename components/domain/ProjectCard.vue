<template>
	<Card variant="elevated" class="project-card w-full max-w-sm p-4">
		<div class="project-card-header">
			<h3>{{ project.title }}</h3>
			<p>{{ project.description }}</p>
		</div>
	</Card>
</template>

<script lang="ts" setup>
import Card from "@components/shared/card/Card.vue";

const props = defineProps<{
	project: Project;
}>();
</script>

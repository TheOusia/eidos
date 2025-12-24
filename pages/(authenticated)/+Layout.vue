<template>
	<DashboardLayout>
		<template #title>
			<div id="dashboard-title"></div>
		</template>
		<slot />
	</DashboardLayout>
</template>

<script lang="ts" setup>
import DashboardLayout from "@components/layouts/DashboardLayout.vue";
</script>

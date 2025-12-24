<template>
	<div class="flex h-screen dashboard-root text-on-surface">
		<!-- Sidebar -->
		<SideBar
			v-model="sidebarOpen"
			:expanded="sidebarExpanded"
			:links="links"
			class="sidebar-root border-zinc-200"
			@update:open="handleSidebarOpen"
		>
			<template #header>
				<slot name="sidebar-header">
					<div></div>
				</slot>
			</template>
			<template #nav>
				<slot name="sidebar"></slot>
			</template>
			<template #footer>
				<slot name="sidebar-footer"></slot>
			</template>
		</SideBar>

		<!-- Main Surface -->
		<div class="flex-1 flex flex-col min-w-0 h-full p-0">
			<!-- Header/AppBar -->
			<div
				class="h-16 min-h-16 px-4 md:px-6 flex items-center border-b border-outline/10 border-zinc-200 shadow-sm z-10 bg-surface-container-low"
			>
				<!-- Sidebar toggle for mobile (and desktop collapse option) -->
				<IconButton
					class="mr-3 md:mr-5 md:hidden"
					:aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'"
					@click="toggleSidebar"
				>
					<md-icon v-if="!sidebarOpen">menu</md-icon>
					<md-icon v-else>close</md-icon>
				</IconButton>
				<!-- Collapse toggle for desktop -->
				<IconButton
					class="hidden md:flex mr-4"
					:aria-label="
						sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'
					"
					@click="toggleSidebarCollapse"
				>
					<md-icon
						:style="{
							transform: sidebarExpanded ? '' : 'scaleX(-1)',
						}"
						>chevron_left</md-icon
					>
				</IconButton>
				<!-- Main header content via slot -->
				<Header
					class="flex-1 flex items-center justify-between min-w-0"
				>
					<template #title>
						<slot name="title"> Dashboard </slot>
					</template>
					<div>
						<span class="text-xl font-bold text-black">Logo</span>
					</div>
				</Header>
			</div>
			<!-- Dashboard Content -->
			<main class="flex-1 overflow-auto p-4 md:p-8">
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SideBar from "../SideBar.vue";
import Header from "../Header.vue";
import IconButton from "@components/shared/icon-button/IconButton.vue";
import "@material/web/elevation/elevation.js";

// Sidebar state
const sidebarExpanded = ref(true);
const sidebarOpen = ref(false);
const links = ref([
	{
		name: "Projects",
		path: "/",
		icon: "assured_workload",
		default: true,
	},
	{
		name: "Users",
		path: "/users",
		icon: "group",
	},
	// Add more links as needed
]);

// Detect mobile
const isMobile = ref(false);
function handleResize() {
	isMobile.value = window.innerWidth <= 768;
	// Automatically collapse sidebar on smaller screens
	if (isMobile.value) {
		sidebarOpen.value = false;
	}
}
onMounted(() => {
	// handleResize();
	// window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
	// window.removeEventListener("resize", handleResize);
});

// Sidebar open logic
function toggleSidebar() {
	console.log("CLICKED toggleSidebar");
	if (isMobile.value) {
		sidebarOpen.value = !sidebarOpen.value;
	} else {
		sidebarExpanded.value = !sidebarExpanded.value;
	}
}
function toggleSidebarCollapse() {
	console.log("CLICKED toggleSidebarCollapse");
	sidebarExpanded.value = !sidebarExpanded.value;
}
function handleSidebarOpen(val: boolean) {
	sidebarOpen.value = val;
}

// Optionally, remember sidebarExpanded state in session/local storage for user experience.
</script>

<style scoped>
.dashboard-root {
	/* Ensures full height/width for flex container */
	min-height: 100vh;
	width: 100vw;
	overflow: hidden;
	background-color: var(--tw-prose-bg, var(--tw-bg-opacity, #fff));
}

.sidebar-root {
	/* Ensure the sidebar sits above content when open in mobile drawer mode */
	z-index: 110;
}

@media (max-width: 768px) {
	.sidebar-root {
		position: fixed !important;
		left: 0;
		top: 0;
		bottom: 0;
		width: 75vw !important;
		min-width: 60vw !important;
		max-width: 22rem !important;
		height: 100vh;
		z-index: 120;
		/* Transform handled by SideBar itself */
	}
	.dashboard-root > .flex-1 {
		padding-left: 0 !important;
	}
}
</style>

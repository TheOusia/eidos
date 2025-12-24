<template>
	<!-- Overlay for mobile drawer mode -->
	<transition name="sidebar-fade">
		<div
			v-if="isMobile && open"
			class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
			aria-label="Sidebar backdrop"
			@click.self="closeSidebar"
		/>
	</transition>

	<nav
		:class="[
			'flex flex-col h-full bg-surface shadow-xl z-50 transition-all duration-200 dashboard-sidebar',
			isMobile
				? [
						'fixed top-0 left-0 bottom-0 w-3/4 max-w-xs min-w-[60vw] p-0 mt-0',
						open ? 'translate-x-0' : '-translate-x-full',
					]
				: [
						'relative border-r border-outline/20 overflow-x-hidden',
						expanded ? 'w-64 min-w-[16rem]' : 'w-16 min-w-16',
					],
			attrs.class,
		]"
		:aria-expanded="expanded"
		aria-label="Sidebar"
		tabindex="-1"
	>
		<!-- Sidebar Header (branding/logo/user) -->
		<div
			class="h-16 min-h-[4rem] flex items-center px-4 justify-between border-b border-outline/10 border-zinc-200 select-none"
		>
			<slot name="header">
				<span
					class="font-bold text-lg text-primary truncate capitalize"
					v-if="expanded || isMobile"
					>Dashboard</span
				>
				<span class="font-bold text-xl text-primary" v-else>D</span>
			</slot>
			<!-- Close icon for mobile drawer -->
			<button
				v-if="isMobile"
				@click="closeSidebar"
				class="ml-2 text-on-surface-variant hover:bg-primary/10 rounded p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition"
				aria-label="Close sidebar"
			>
				<md-icon>close</md-icon>
			</button>
		</div>

		<!-- Navigation Links -->
		<div class="flex-1 overflow-y-auto py-3 px-2">
			<slot name="nav">
				<template v-for="(link, i) in links" :key="i">
					<a
						:href="link.path"
						:class="[
							'flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-base mb-0.5 transition-all whitespace-nowrap group',
							expanded || isMobile
								? 'justify-start'
								: 'justify-center',
							isActive(link)
								? 'bg-primary/90 text-on-primary shadow'
								: 'hover:bg-primary/10 focus:bg-primary/10 text-on-surface-variant',
						]"
						:tabindex="link.disabled ? -1 : 0"
					>
						<md-icon v-if="link.icon">{{ link.icon }}</md-icon>
						<span v-if="expanded || isMobile">{{ link.name }}</span>
						<span v-else>
							<span class="sr-only">{{ link.name }}</span>
						</span>
					</a>
				</template>
			</slot>
		</div>

		<!-- Sidebar Footer -->
		<div class="p-3 border-t border-outline/10 min-h-12 flex items-center">
			<slot name="footer"></slot>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, useAttrs } from "vue";
// Import md-icon from Material Web for all icons
import "@material/web/icon/icon.js";
import { usePageContext } from "vike-vue/usePageContext";

const context = usePageContext();
const props = defineProps<{
	open?: boolean; // for drawer on mobile
	expanded?: boolean; // persistent on desktop
	links?: Array<{
		name: string;
		path?: string;
		icon?: string;
		default?: boolean;
		disabled?: boolean;
	}>;
	modelValue?: boolean;
}>();
const attrs = useAttrs();

const emit = defineEmits(["update:open", "update:modelValue"]);

// Responsive: is mobile?
const isMobile = ref(false);
function checkMobile() {
	isMobile.value = window.innerWidth <= 768;
}
onMounted(() => {
	checkMobile();
	window.addEventListener("resize", checkMobile);
});
watch(
	() => props.open,
	(v) => emit("update:modelValue", v),
);
watch(
	() => props.modelValue,
	(v) => emit("update:open", v),
);

const open = computed(() =>
	props.modelValue !== undefined ? props.modelValue : props.open,
);
const expanded = computed(() => props.expanded);

function closeSidebar() {
	emit("update:open", false);
	emit("update:modelValue", false);
}

// Use `window.location.pathname` for basic active highlight, or enhance.
function isActive(link: any) {
	const path = context.urlPathname;
	return (link.path && path === link.path) || link.default;
}
</script>

<style scoped>
.dashboard-sidebar {
	transition-property: width, min-width, transform, box-shadow;
	transition-duration: 220ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	background-color: var(--tw-prose-bg, var(--tw-bg-opacity));
}
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
	transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
	opacity: 0;
}
.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
	opacity: 1;
}
@media (max-width: 768px) {
	.dashboard-sidebar {
		width: 75vw !important;
		min-width: 60vw !important;
		max-width: 384px !important;
		left: 0;
		top: 0;
		bottom: 0;
		height: 100vh;
		z-index: 110;
		box-shadow: 0 6px 36px 0 rgba(30, 33, 44, 0.2);
		border-right: 1.5px solid theme("colors.outline", #cfd8dc);
		transform: translateX(-100%);
	}
	.dashboard-sidebar[aria-expanded="true"],
	.dashboard-sidebar[aria-expanded="false"] {
		transform: translateX(0%);
	}
}
</style>

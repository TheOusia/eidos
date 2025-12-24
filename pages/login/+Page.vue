<template>
	<div class="glass h-screen w-screen flex justify-center items-center">
		<div class="card card-border card-xl w-xl shadow-lg p-8">
			<div class="card-body">
				<div class="card-title">Login</div>
				<form @submit.prevent="handleLogin">
					<div
						v-if="error"
						class="mt-4 text-xs py-4 px-2 bg-red-500 text-white my-2 rounded-lg"
					>
						{{ error }}
					</div>
					<div>
						<input
							v-model="email"
							type="text"
							placeholder="email"
							class="input w-full input-bordered mb-4"
							autocomplete="username"
						/>
						<input
							v-model="password"
							type="password"
							placeholder="password"
							class="input w-full input-bordered mb-4"
							autocomplete="current-password"
						/>
					</div>
					<div class="card-actions">
						<button
							type="submit"
							class="btn mx-auto"
							:class="{ loading: loading }"
							:disabled="loading"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { setPersistentState } from "@src/utils/state";
import { valync } from "@src/utils/valync";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

const handleLogin = async () => {
	error.value = null;
	if (!email.value || !password.value) {
		error.value = "Please provide both email and password.";
		return;
	}

	loading.value = true;
	const result = await valync<User>("auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email.value,
			password: password.value,
		}),
	});
	loading.value = false;

	if (result.isErr()) {
		// On success, redirect to the app root
		error.value = result.error.message || "Login failed. Please try again.";
		return;
	}

	const user = result.unwrap();
	setPersistentState("auth.user", user);
	setPersistentState("auth.token", user.id);
	window.location.href = "/";
};
</script>

<script>
	import '../app.css';
	export let data;
	$: user = data.user;
</script>

{#key user}
	<nav class="flex gap-4 bg-slate-500 p-4">
		<a
			class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
			href="/">Home</a
		>
		<a
			class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
			href="/posts">Posts</a
		>
		{#if user}
			<div class="ml-auto flex items-center gap-4">
				<a
					class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
					href="/user/{user._id}">Profile</a
				>
				<a
					class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
					data-sveltekit-reload
					href="/logout">Logout</a
				>
			</div>
		{:else}
			<div class="ml-auto flex items-center gap-4">
				<a
					class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
					href="/login">Login</a
				>
				<a
					class="text-white font-bold text-lg hover:text-slate-300 transition-colors duration-300 ease-in-out"
					href="/register">Register</a
				>
			</div>
		{/if}
	</nav>
{/key}

<main class="m-3 w-11/12 mx-auto">
	<slot />
</main>

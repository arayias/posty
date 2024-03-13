<script>
	import '../app.css';
	export let data;
	$: user = data.user;
</script>

{#key user}
	<nav class="flex gap-4 bg-slate-500 p-4">
		<a href="/">Home</a>
		<a class="" href="/posts">Posts</a>
		{#if user}
			<a data-sveltekit-preload-data="false" data-sveltekit-reload href="/logout">Logout</a>
		{:else}
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		{/if}
	</nav>
{/key}

<main class="m-3">
	<slot />
</main>

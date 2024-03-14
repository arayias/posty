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
			<div class="ml-auto flex items-center gap-4">
				<a href="/user/{user._id}">Profile</a>
				<a data-sveltekit-reload href="/logout">Logout</a>
			</div>
		{:else}
			<div class="ml-auto flex items-center gap-4">
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			</div>
		{/if}
	</nav>
{/key}

<main class="m-3">
	<slot />
</main>

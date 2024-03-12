<script>
	import '../app.css';
</script>

<nav class="flex gap-4 bg-slate-500 p-4">
	<a href="/">Home</a>
	<a class="" href="/posts">Posts</a>
	<a class="" href="/register">Register</a>
	<a class="" href="/login">Login</a>
</nav>

<main class="m-3">
	<slot />
</main>

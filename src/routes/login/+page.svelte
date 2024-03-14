<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<form
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
	method="POST"
	action="?/login"
	class="flex flex-col gap-4 w-1/3 mx-auto mt-8 p-4 bg-slate-300 rounded-lg shadow-lg items-center"
>
	<input class="p-1 rounded-sm" type="text" placeholder="Username" name="username" />
	<input class="p-1 rounded-sm" type="password" placeholder="Password" name="password" />
	<button
		class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
		type="submit">Login</button
	>
	{#if form?.error}
		<p class="text-red-500">{form.message}</p>
	{/if}
</form>

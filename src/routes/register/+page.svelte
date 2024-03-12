<script>
	import { enhance } from '$app/forms';

	let errorMessage = '';
</script>

<form
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
	method="POST"
	action="?/register"
	class="flex flex-col gap-4 w-1/3 mx-auto mt-8 p-4 bg-slate-300 rounded-lg shadow-lg items-center"
>
	<input class="p-1 rounded-sm" type="text" placeholder="Username" name="username" />
	<input class="p-1 rounded-sm" type="password" placeholder="Password" name="password" />
	<input
		class="p-1 rounded-sm"
		type="password"
		placeholder="Confirm Password"
		name="confirmPassword"
	/>
	<button
		class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
		type="submit">Register</button
	>

	<p class="text-red-500" class:show={errorMessage}>{errorMessage}</p>
</form>

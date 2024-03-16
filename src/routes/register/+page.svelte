<script>
	import { enhance } from '$app/forms';

	export let form;
	$: errors = form?.errors;
	$: fieldErrors = errors?.fieldErrors;
	$: formErrors = errors?.formErrors;
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
	{#if fieldErrors?.username}
		<p class="text-red-500 text-xs">{fieldErrors?.username}</p>
	{/if}
	<input class="p-1 rounded-sm" type="password" placeholder="Password" name="password" />
	<input
		class="p-1 rounded-sm"
		type="password"
		placeholder="Confirm Password"
		name="confirmPassword"
	/>
	{#if fieldErrors?.password}
		<p class="text-red-500 text-xs">{fieldErrors?.password}</p>
	{/if}
	{#if fieldErrors?.confirmPassword}
		<p class="text-red-500 text-xs">{fieldErrors?.confirmPassword}</p>
	{/if}
	{#if formErrors}
		<p class="text-red-500 text-xs">{formErrors}</p>
	{/if}
	<button
		class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
		type="submit">Register</button
	>
</form>

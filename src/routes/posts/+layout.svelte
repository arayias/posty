<script lang="ts">
	import { enhance } from '$app/forms';
	import { currentPage } from '../../stores.js';

	export let data;
	export let errorMessage = '';
	let isModalOpen = false;
	let attached = false;
	$: user = data.user ?? null;
	$: postCount = data.count ?? 0;
	$: pages = Math.ceil(postCount / 12);
	$: page = $currentPage;
	let page = 1;

	const closeOnOutsideClick = (event: MouseEvent) => {
		const target = event?.target as HTMLElement;
		if (target?.id === 'modal') {
			isModalOpen = false;
		}
	};

	const closeOnEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			isModalOpen = false;
		}
	};

	$: {
		if (isModalOpen && !attached) {
			document.addEventListener('click', closeOnOutsideClick);
			document.addEventListener('keydown', closeOnEscape);
			attached = true;
		} else if (!isModalOpen && attached) {
			document.removeEventListener('click', closeOnOutsideClick);
			document.removeEventListener('keydown', closeOnEscape);
			attached = false;
		}
	}
</script>

<!-- button to open a form modal -->

{#if user}
	<button
		class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
		on:click={() => (isModalOpen = true)}>Create Post</button
	>
{/if}

<!-- modal form -->
{#if isModalOpen}
	<div
		id="modal"
		class="fixed z-10 inset-0 bg-black bg-opacity-20 flex justify-center items-center"
	>
		<form
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
			method="POST"
			action="/posts?/create"
			class="flex flex-col gap-4 w-1/3 p-4 bg-slate-300 rounded-lg shadow-md items-center"
		>
			<input class="p-1 rounded-sm" type="text" placeholder="Title" name="title" />
			<textarea class="p-1 rounded-sm" placeholder="Content" name="content"></textarea>
			<button
				class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
				type="submit">Create</button
			>
		</form>
		<p class="text-red-500" class:show={errorMessage}>{errorMessage}</p>
	</div>
{/if}

<slot />

<!-- pagination -->

<div class="flex justify-center gap-4">
	{#if pages > 1}
		{#each Array.from({ length: pages }, (_, i) => i + 1) as pg}
			<a
				href={`/posts/${pg}`}
				class="{pg == page
					? `bg-slate-700`
					: `bg-slate-500`} text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
			>
				{pg}
			</a>
		{/each}
	{/if}
</div>

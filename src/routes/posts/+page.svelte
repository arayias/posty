<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ObjectId } from 'mongodb';

	export let data;
	export let errorMessage = '';
	let isModalOpen = false;
	let attached = false;

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

	const optimisticDelete = (postId: ObjectId) => {
		data.posts = data.posts.filter((post) => post._id.toString() !== postId.toString());
	};
</script>

<!-- button to open a form modal -->
<button
	class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
	on:click={() => (isModalOpen = true)}>Create Post</button
>

<!-- modal form -->
{#if isModalOpen}
	<div id="modal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<form
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
			method="POST"
			action="?/create"
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

<div class="flex flex-col gap-4 items-center">
	{#each data.posts as post}
		<div
			class="bg-slate-300 p-4 rounded-lg shadow-md my-4 flex flex-col gap-4 items-center w-[50%]"
		>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<form
				method="POST"
				use:enhance={() => {
					optimisticDelete(post._id);
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
				action="?/delete"
				class="flex gap-4"
			>
				<input type="hidden" name="id" value={post._id} />
				<button
					class="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out"
					type="submit">Delete</button
				>
			</form>
		</div>
	{/each}
</div>

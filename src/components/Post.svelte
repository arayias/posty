<script lang="ts">
	import { enhance } from '$app/forms';

	export let user;
	export let showAuthor = true;
	export let post: {
		title: string;
		date: Date;
		content: string;
		_id: string;
	};
</script>

<div
	class="p-4 bg-slate-300 rounded-lg shadow-lg my-4 relative hover:shadow-2xl transition-shadow duration-300 ease-in-out"
>
	<!--  delete button -->
	{#if user?._id === post.author._id}
		<div class="absolute top-0.5 right-0.5">
			<form
				method="POST"
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
				action="/posts?/delete"
				class="flex gap-4"
			>
				<input type="hidden" name="id" value={post._id} />
				<button
					class="bg-slate-500 text-white px-1 rounded-md hover:bg-slate-600 transition-colors duration-300 ease-in-out text-[0.5rem] aspect-auto"
					type="submit"
				>
					&times;
				</button>
			</form>
		</div>
	{/if}
	<div class="flex flex-row">
		<div>
			<h3 class="text-xl font-bold">{post.title}</h3>
		</div>
		<div class="ml-auto flex items-end flex-col">
			<p class="text-sm text-gray-500">
				{new Date(post.date).toLocaleDateString()}
			</p>
			<p>
				{#if showAuthor}
					<a href={`/user/${post.author._id}`}>{post.author.username}</a>
				{/if}
			</p>
		</div>
	</div>
	<p>{post.content}</p>
</div>

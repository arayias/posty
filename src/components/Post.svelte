<script lang="ts">
	import { enhance } from '$app/forms';

	export let user;
	export let showAuthor = true;
	export let post: {
		title: string;
		date: Date;
		content: string;
		_id: string;
		likeCount: number;
		likes: string[];
	};
	const isPostLiked = (post: { likes: string[] }) => {
		return post.likes.includes(user?._id);
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
	<div class="border-t-2 border-slate-100 my-4"></div>
	<div class="flex">
		<div class=" m-0.5 rounded-md">
			<form method="POST" action={`/post/${post._id}?/like`} use:enhance on:submit|preventDefault>
				<input type="hidden" name="id" value={post._id} />
				<button
					class="rounded-md p-2 outline-none focus:outline-none
					{isPostLiked(post)
						? 'bg-slate-500 text-white hover:bg-slate-600'
						: 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
						transition-colors duration-300 ease-in-out"
					type="submit"
				>
					{post.likeCount}
					❤️
				</button>
			</form>
		</div>
		<div class="bg-slate-100 m-0.5 p-1.5 rounded-md ml-auto">
			<a href={`/posts/${post._id}`}>Comments</a>
		</div>
	</div>
</div>

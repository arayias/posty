<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import viewport from './useViewportAction';
	import Post from './Post.svelte';
	export let data;
	export let user;
	export let noMorePosts = false;

	const dispatch = createEventDispatcher();
	dispatch('loadMore');
	console.log(data, user);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	<!-- {#each data as post}
		<Post {post} {user} />
	{/each}
	{#if !noMorePosts}
		<li use:viewport on:enterViewport={() => dispatch('loadMore')}>
			<div class="flex justify-center items-center">
				<div
					class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"
				></div>
			</div>
		</li>
	{/if} -->
</div>

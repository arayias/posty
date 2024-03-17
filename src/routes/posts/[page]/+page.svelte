<script lang="ts">
	import Post from '$components/Post.svelte';
	import { currentPage } from '../../../stores';
	export let data;
	$: user = data.user ?? null;
	$: postCount = data.count ?? 0;
	$: page = data.page;
	$: $currentPage = page;
</script>

{#if data.posts.length === 0}
	<p class="text-center text-2xl font-bold text-slate-500 m-3">No posts found</p>
{/if}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	{#each data.posts as post}
		<Post {post} {user} />
	{/each}
</div>

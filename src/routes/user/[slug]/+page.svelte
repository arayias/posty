<script lang="ts">
	import Post from '$components/Post.svelte';
	export let data;
	$: user = data.user;
	$: posts = data.userPosts;
	$: userProfile = data.userProfile;
</script>

<h2>
	{#if userProfile}
		{userProfile.username}'s profile
	{/if}
</h2>

{#if userProfile}
	{#if posts.length > 0}
		<h3 class="mt-4">Posts</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each posts as post}
				<Post {post} {user} showAuthor={false} />
			{/each}
		</div>
	{:else}
		<p>{userProfile.username} has no posts</p>
	{/if}
{/if}

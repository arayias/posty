<script lang="ts">
	import Post from '$components/Post.svelte';
	import defaultAvatar from '$assets/default_avatar.svg';
	export let data;
	$: user = data.user;
	$: posts = data.userPosts;
	$: userProfile = data.userProfile;
</script>

<div>
	<img
		src={defaultAvatar}
		alt="User avatar"
		class="w-16 h-16 rounded-full border-4 border-slate-500"
	/>
	<h2>
		{#if userProfile}
			{userProfile.username}'s profile
		{/if}
	</h2>
</div>

{#if userProfile}
	{#if posts.length > 0}
		<h3 class="mt-4 mb-2 text-2xl font-bold text-slate-500">Posts</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each posts as post}
				<Post {post} {user} showAuthor={false} />
			{/each}
		</div>
	{:else}
		<p>{userProfile.username} has no posts</p>
	{/if}
{/if}

<script lang="ts">
	import Post from '$components/Post.svelte';
	export let data;
	$: post = data.post;
	$: user = data.user;
</script>

<main class="m-3">
	<Post {post} {user} showAuthor={true} showComments={true} showDelete={false} />
</main>

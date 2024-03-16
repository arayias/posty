<script lang="ts">
	import Post from '$components/Post.svelte';
	export let data;
	export let form;
	$: post = data.post;
	$: user = data.user;
	$: formErrors = form?.errors;
</script>

<div class="m-3">
	<Post
		{post}
		{user}
		{formErrors}
		showAuthor={true}
		showComments={true}
		showDelete={false}
		showCommentLink={false}
	/>
</div>

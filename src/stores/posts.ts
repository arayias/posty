import { writable } from 'svelte/store';
import { load } from '../routes/+layout.server';

let loading = false;
let noMorePosts = false;
let posts = [];
let page = 1;
let numberOfPosts = 5;

export const loadingStore = writable({
	loading,
	noMorePosts,
	posts
});

export default {
	subscribe: loadingStore.subscribe,
	async fetchMorePosts() {
		if (loading || noMorePosts) return;
		loading = true;
		loadingStore.set({ loading, noMorePosts, posts });

		console.log('fetching more posts');
		let res = await fetch(`/api/posts?numberOfPosts=${numberOfPosts}&page=${page}`);
		let newPosts = await res.json();
		if (newPosts.length < numberOfPosts) {
			noMorePosts = true;
		}
		posts = posts.concat(newPosts);
		page++;
		loading = false;
		loadingStore.set({ loading, noMorePosts, posts });
	}
};

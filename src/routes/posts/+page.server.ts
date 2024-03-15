import { createPost, getPosts, deletePost, getPostById } from '$db/controllers/PostController';
import type { RequestEvent, Action } from './$types.js';

export const load = async ({ locals }: RequestEvent) => {
	let posts = await getPosts();
	posts = JSON.parse(JSON.stringify(posts));
	return {
		posts,
		user: locals.authedUser
	};
};

export const actions = {
	create: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;

		if (!authedUser) {
			return {
				status: 401
			};
		}

		const data = await request.formData();
		const title = data.get('title')?.toString() || '';
		const content = data.get('content')?.toString() || '';

		let res = await createPost(title, content, authedUser._id);
		return {
			status: res
		};
	},
	delete: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;

		const data = await request.formData();
		const id = data.get('id')?.toString() || '';
		let post = await getPostById(id);
		post = JSON.parse(JSON.stringify(post));

		if (!authedUser || !post || post.author._id !== authedUser._id) {
			return {
				status: 401
			};
		}

		console.log(`deleting post ${id}`);
		let res = await deletePost(id, authedUser._id);
		return {
			status: res
		};
	}
};

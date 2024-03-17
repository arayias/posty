import { createPost, getPosts, deletePost, getPostById } from '$db/controllers/PostController';
import type { RequestEvent } from './$types.js';

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
	}
};

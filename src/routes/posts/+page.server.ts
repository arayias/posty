import { createPost, getPosts, deletePost } from '$db/controllers/PostController';
import type { RequestEvent, Action } from './$types.js';

export const load = async (ctx: any) => {
	let posts = await getPosts();
	posts = JSON.parse(JSON.stringify(posts));
	// console.log(posts);
	return {
		posts
	};
};

export const actions = {
	create: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;
		const data = await request.formData();
		const title = data.get('title')?.toString() || '';
		const content = data.get('content')?.toString() || '';

		let res = await createPost(title, content, authedUser._id);
		return {
			status: res
		};
	},
	delete: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const id = data.get('id')?.toString() || '';
		let res = await deletePost(id);
		return {
			status: res
		};
	}
};

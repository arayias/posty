import { toggleLike } from '$db/controllers/UserController';
import { error, type RequestEvent } from '@sveltejs/kit';
import { getPostById } from '$db/controllers/PostController.js';
import { createComment } from '$db/controllers/CommentController.js';

export const load = async ({ params, locals }: RequestEvent) => {
	const postId = params.slug ?? '';
	try {
		let post = await getPostById(postId);
		post = JSON.parse(JSON.stringify(post));
		console.log(post);
		return {
			post,
			user: locals.authedUser
		};
	} catch {
		error(404);
	}
};

export const actions = {
	like: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;
		if (!authedUser) {
			return {
				status: 401
			};
		}
		const data = await request.formData();
		const postId = data.get('id')?.toString() || '';
		let res = await toggleLike(authedUser._id, postId);
		return {
			status: res
		};
	},
	comment: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;
		if (!authedUser) {
			return {
				status: 401
			};
		}
		const data = await request.formData();
		const postId = data.get('id')?.toString() || '';
		const content = data.get('comment')?.toString() || '';
		if (!content || !postId) {
			return {
				status: 400
			};
		}
		let res = await createComment(content, authedUser._id, postId);
		console.log(res);
		return {
			status: 200
		};
	}
};

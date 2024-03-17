import { toggleLike } from '$db/controllers/UserController';
import { error, type RequestEvent } from '@sveltejs/kit';
import { deletePost, getPostById } from '$db/controllers/PostController.js';
import { createComment } from '$db/controllers/CommentController.js';
import { z } from 'zod';

const commentSchema = z.object({
	content: z.string().min(1).max(255)
});

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

		try {
			commentSchema.parse({ content });
		} catch (e) {
			if (e instanceof z.ZodError) {
				let errors = e.flatten();
				console.error(errors);
				return {
					status: 400,
					errors
				};
			}
		}

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

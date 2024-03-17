import { createPost } from '$db/controllers/PostController';
import type { RequestEvent } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: RequestEvent) => {
	throw redirect(303, '/posts/1');
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

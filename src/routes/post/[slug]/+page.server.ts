import { toggleLike } from '$db/controllers/UserController';
import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
	like: async ({ request, locals }: RequestEvent) => {
		const authedUser = locals.authedUser;
		const data = await request.formData();
		const postId = data.get('id')?.toString() || '';
		let res = await toggleLike(authedUser._id, postId);
		return {
			status: res
		};
	}
};

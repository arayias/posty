import { getPostCount } from '$db/controllers/PostController';
import type { RequestEvent } from './$types.js';

export const load = async ({ locals, params }: RequestEvent) => {
	let count = await getPostCount();
	return {
		count,
		user: locals.authedUser
	};
};

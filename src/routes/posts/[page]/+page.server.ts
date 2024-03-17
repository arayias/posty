import type { PageServerLoad } from './$types';
import type { RequestEvent } from './$types.js';
import { getPostsWithLimit } from '$db/controllers/PostController';

export const load = (async ({ locals, params }: RequestEvent) => {
	let page = params.page ?? '1';
	let posts = await getPostsWithLimit(12, +page);
	// console.log(posts);
	posts = JSON.parse(JSON.stringify(posts));
	return {
		posts,
		user: locals.authedUser,
		page: +page
	};
}) satisfies PageServerLoad;

// export const load = async ({ locals }: RequestEvent) => {
// 	let posts = await getPosts();
// 	posts = JSON.parse(JSON.stringify(posts));
// 	return {
// 		posts,
// 		user: locals.authedUser
// 	};
// };

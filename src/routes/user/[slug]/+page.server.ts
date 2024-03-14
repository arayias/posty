import { getPostsByUserId } from '$db/controllers/PostController.js';
import { getUserById } from '$db/controllers/UserController.js';

export async function load({ locals, params }) {
	let userId = params.slug;
	let userPosts = await getPostsByUserId(userId);
	let userProfile = await getUserById(userId);

	if (!userProfile) {
		// action fail
		throw new Error('User not found');
	}

	userPosts = JSON.parse(JSON.stringify(userPosts));
	userProfile = JSON.parse(JSON.stringify(userProfile));

	return {
		user: locals.authedUser,
		userPosts,
		userProfile
	};
}

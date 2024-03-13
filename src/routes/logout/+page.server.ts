import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	cookies.set('authToken', '', {
		path: '/',
		maxAge: 0,
		httpOnly: true
	});
	// redirect to home but also invalidate the cache
	redirect(303, '/posts');
}

import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
	cookies.set('authToken', '', {
		path: '/',
		maxAge: 0,
		httpOnly: true
	});
	// redirect to page they were on
	console.log(url);
	redirect(303, url.origin || '/');
}

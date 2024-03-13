import { connect_db } from '$db/mongo';
import { SECRET_INGREDIENT } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '$db/controllers/UserController';

(async () => {
	await connect_db();
})();

export async function handle({ event, resolve }) {
	const authToken = event.cookies.get('authToken') || null;

	try {
		if (!authToken) event.locals.authedUser = null;

		const claims = authToken ? jwt.verify(authToken, SECRET_INGREDIENT) : null;

		if (!claims) {
			event.locals.authedUser = null;
			event.cookies.set('authToken', '', {
				path: '/',
				maxAge: 0,
				httpOnly: true
			});
		}
		// reset the cookies

		if (authToken && claims) {
			const fullUser = await getUserByUsername(claims.userNoPass.username);
			console.log('hook run', fullUser);
			let userNoPass = JSON.parse(JSON.stringify(fullUser));
			delete userNoPass.password;
			event.locals.authedUser = userNoPass;
		}
	} finally {
		return await resolve(event);
	}
}

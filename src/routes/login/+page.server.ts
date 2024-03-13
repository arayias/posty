import { redirect } from '@sveltejs/kit';
import { getUserByUsername } from '$db/controllers/UserController';
import { SECRET_INGREDIENT } from '$env/static/private';
import type { RequestEvent } from './$types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function load({ cookies }) {
	const authToken = cookies.get('authToken');
	if (authToken) {
		return redirect(303, '/posts');
	}
}

export const actions = {
	login: async ({ request, cookies }: RequestEvent) => {
		const data = await request.formData();
		const username = data.get('username')?.toString() || '';
		const password = data.get('password')?.toString() || '';

		const user = await getUserByUsername(username);

		const isValid = await bcrypt.compare(password, user?.password || '');
		let userNoPass = JSON.parse(JSON.stringify(user));
		delete userNoPass.password;
		if (isValid) {
			const authToken = jwt.sign({ userNoPass }, SECRET_INGREDIENT);
			cookies.set('authToken', authToken, {
				path: '/',
				maxAge: 60 * 60 * 24,
				httpOnly: true
			});
			throw redirect(303, '/login');
		}
		return {
			message: 'Invalid username or password',
			error: true
		};
	}
};

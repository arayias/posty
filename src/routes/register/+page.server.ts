import { redirect } from '@sveltejs/kit';
import { createUser } from '$db/controllers/UserController.js';
import { BCRYPT_LOG_ROUNDS } from '$env/static/private';
import bcrypt from 'bcrypt';

import type { RequestEvent } from './$types.js';

export const actions = {
	register: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		console.log(data);
		console.log('data', data);
		const username = data.get('username')?.toString() || '';
		let password = data.get('password')?.toString() || '';
		let password2 = data.get('confirmPassword')?.toString() || '';
		if (password !== password2) {
			throw redirect(303, '/register');
		}
		password = await bcrypt.hash(password, parseInt(BCRYPT_LOG_ROUNDS));
		const res = await createUser(username, password);
		if (res) {
			throw redirect(303, '/login');
		}
	}
};

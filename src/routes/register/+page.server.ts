import { redirect } from '@sveltejs/kit';
import { createUser } from '$db/controllers/UserController.js';
import { BCRYPT_LOG_ROUNDS } from '$env/static/private';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import type { RequestEvent } from './$types.js';

const RegisterSchema = z
	.object({
		username: z.string().min(4).max(20),
		password: z.string().min(5).max(100),
		confirmPassword: z.string().min(5).max(100)
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match'
			});
		}
		return true;
	});

export const actions = {
	register: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		console.log(data);
		console.log('data', data);
		const username = data.get('username')?.toString() || '';
		let password = data.get('password')?.toString() || '';
		let password2 = data.get('confirmPassword')?.toString() || '';

		try {
			RegisterSchema.parse({ username, password, confirmPassword: password2 });
		} catch (e) {
			if (e instanceof z.ZodError) {
				let errors = e.flatten();
				return {
					errors
				};
			}
			return;
		}
		password = await bcrypt.hash(password, parseInt(BCRYPT_LOG_ROUNDS));
		const res = await createUser(username, password);
		if (res) {
			throw redirect(303, '/login');
		}
	}
};

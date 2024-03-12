import { redirect } from '@sveltejs/kit';

export const actions = {
	register: async (ctx: any) => {
		const data = await ctx.request.formData();
		console.log(data);
		console.log('data', data);
		const username = data.get('username');
		const password = data.get('password');
		if (username === 'admin') {
			// redirect to home
			throw redirect(303, '/');
		}
	}
};

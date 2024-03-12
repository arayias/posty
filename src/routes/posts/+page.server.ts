import { createPost, getPosts, deletePost } from '$db/controllers/PostController';

export const load = async (ctx: any) => {
	let posts = await getPosts();
	posts = JSON.parse(JSON.stringify(posts));
	console.log(posts);
	return {
		posts
	};
};

export const actions = {
	create: async (ctx: any) => {
		const data = await ctx.request.formData();
		const title = data.get('title');
		const content = data.get('content');
		let res = await createPost(title, content);
		return {
			status: res
		};
	},
	delete: async (ctx: any) => {
		const data = await ctx.request.formData();
		const id = data.get('id');
		let res = await deletePost(id);
		console.log('Deleting', id);
		return {
			status: res
		};
	}
};

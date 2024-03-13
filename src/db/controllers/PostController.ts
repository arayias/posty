// create a post in mongo
import { PostModel } from '$db/models/PostModel';

export const createPost = async (title: string, content: string, authedUserId: string) => {
	console.log(authedUserId);
	const post = new PostModel({
		title,
		content,
		author: authedUserId
	});
	try {
		await post.save();
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const deletePost = async (id: string) => {
	try {
		await PostModel.deleteOne({ _id: id });
	} catch {
		return false;
	}
};

export const getPosts = async () => {
	let posts = await PostModel.find({}).populate('author', { username: 1, _id: 1 });
	return posts;
};

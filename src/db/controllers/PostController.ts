// create a post in mongo
import { PostModel } from '$db/models/PostModel';

export const createPost = async (title: string, content: string) => {
	const post = new PostModel({
		title,
		content,
		date: new Date()
	});
	try {
		await post.save();
	} catch {
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
	let posts = await PostModel.find({});
	return posts;
};

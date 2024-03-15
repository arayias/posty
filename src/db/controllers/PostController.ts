// create a post in mongo
import { PostModel } from '$db/models/PostModel';
import { deleteUserComment, deleteUserLike } from '$db/controllers/UserController';
import mongoose from '$db/mongo';
import { deleteComment } from './CommentController';

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

export const deletePost = async (id: string, userId: string) => {
	// first get post by id and check if it exists
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		let post = await PostModel.findById(id);
		post = JSON.parse(JSON.stringify(post));
		if (!post) {
			console.log('no post found');
			await session.abortTransaction();
			session.endSession();
			return false;
		}
		let likes = post.likes;
		console.log(`deleting likes ${likes} from post ${id}`);
		for (let i = 0; i < likes.length; i++) {
			await deleteUserLike(likes[i].toString(), id);
		}
		let comments = post.comments;
		for (let i = 0; i < comments.length; i++) {
			await deleteUserComment(userId, comments[i].toString());
			await deleteComment(comments[i].toString());
		}

		await PostModel.findByIdAndDelete(id);
		await session.commitTransaction();
		session.endSession();
		return true;
	} catch {
		console.log('error');
		await session.abortTransaction();
		session.endSession();
		return false;
	}
};

export const getPostById = async (id: string) => {
	let post = await PostModel.findById(id)
		.populate('author', { username: 1, _id: 1 })
		.populate('comments', { content: 1, author: 1, date: 1 });
	return post;
};

export const getPosts = async () => {
	let posts = await PostModel.find({}).populate('author', { username: 1, _id: 1 });
	return posts;
};

export const addCommentToPost = async (postId: string, commentId: string) => {
	try {
		await PostModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });
		return true;
	} catch {
		return false;
	}
};

export const getPostsByUserId = async (id: string) => {
	let posts = await PostModel.find({ author: id }).populate('author', { username: 1, _id: 1 });
	return posts;
};

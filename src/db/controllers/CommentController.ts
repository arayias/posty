import { CommentModel } from '$db/models/CommentModel';
import { getPostById, addCommentToPost } from './PostController';
import { addCommentToUser } from './UserController';

export const createComment = async (content: string, authedUserId: string, postId: string) => {
	const comment = new CommentModel({
		content,
		author: authedUserId,
		post: postId
	});
	try {
		let res = await comment.save();
		await addCommentToPost(postId, res._id);
		await addCommentToUser(authedUserId, res._id);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const deleteComment = async (id: string) => {
	try {
		await CommentModel.findByIdAndDelete(id);
		return true;
	} catch {
		return false;
	}
};

export const getCommentsByPostId = async (postId: string) => {
	let posts = await getPostById(postId);
	return posts?.comments;
};

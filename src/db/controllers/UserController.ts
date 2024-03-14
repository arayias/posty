import { PostModel } from '$db/models/PostModel';
import { UserModel } from '$db/models/UserModel';
import mongoose from '$db/mongo';

export const getUserByUsername = async (username: string) => {
	const user = await UserModel.findOne({ username });
	return user;
};

export const getUserById = async (id: string) => {
	const user = await UserModel.findById(id);
	return user;
};

export const deleteUserLike = async (userId: string, postId: string) => {
	const user = await UserModel.findById(userId);
	const post = await PostModel.findById(postId);
	if (!user || !post) {
		return false;
	}
	const postIndex = user.likes.indexOf(postId);
	const userIndex = post.likes.indexOf(userId);
	if (postIndex === -1) {
		return false;
	}
	user.likes.splice(postIndex, 1);
	post.likeCount--;
};

export const createUser = async (username: string, password: string) => {
	const user = new UserModel({
		username,
		password,
		date: new Date()
	});
	try {
		const doesUserExist = await getUserByUsername(username);
		if (doesUserExist) {
			return false;
		}
		await user.save();
		return true;
	} catch {
		return false;
	}
};

export const toggleLike = async (userId: string, postId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user = await UserModel.findById(userId).session(session);
		const post = await PostModel.findById(postId).session(session);
		if (!user || !post) {
			await session.abortTransaction();
			session.endSession();
			return false;
		}

		const postIndex = user.likes.indexOf(postId);
		const userIndex = post.likes.indexOf(userId);
		if (postIndex === -1) {
			user.likes.push(postId);
			post.likeCount++;
		} else {
			user.likes.splice(postIndex, 1);
			post.likeCount--;
		}
		if (userIndex === -1) {
			post.likes.push(userId);
		} else {
			post.likes.splice(userIndex, 1);
		}

		await user.save({ session });
		await post.save({ session });

		await session.commitTransaction();
		session.endSession();
		return true;
	} catch (error) {
		// Log the error
		console.error('Error toggling like:', error);
		await session.abortTransaction();
		session.endSession();
		return false;
	}
};

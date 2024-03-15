// model for posts using mongoose
import mongoose from '$db/mongo';

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: new Date()
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	likeCount: {
		type: Number,
		default: 0
	},
	likes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User',
		default: []
	},
	comments: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Comment',
		default: []
	}
});

const PostModel = mongoose.model('Post', postSchema);

export { PostModel };

import mongoose from '$db/mongo';

const commentSchema = new mongoose.Schema({
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
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	}
});

const CommentModel = mongoose.model('Comment', commentSchema);

export { CommentModel };

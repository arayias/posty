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
	}
});

const PostModel = mongoose.model('Post', postSchema);

export { PostModel };
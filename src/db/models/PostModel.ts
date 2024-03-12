// model for posts using mongoose
import mongoose from '$db/mongo';

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date
});

const PostModel = mongoose.model('Post', postSchema);

export { PostModel };

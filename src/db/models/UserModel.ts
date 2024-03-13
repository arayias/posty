import mongoose from '$db/mongo';
import { PostModel } from '$db/models/PostModel';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: Date,
	posts: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Post',
		default: []
	}
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };

import { Mongoose } from 'mongoose';
import { env } from '$env/dynamic/private';
const uri = env.MONGO_URI;

const mongoose = new Mongoose();

export const connect_db = async () => {
	try {
		let _c = await mongoose.connect(uri);
		console.log('Connected to MongoDB');
		return _c;
	} catch (error) {
		console.error(error);
	}
};

export default mongoose;

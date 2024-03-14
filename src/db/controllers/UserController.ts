import { UserModel } from '$db/models/UserModel';

export const getUserByUsername = async (username: string) => {
	const user = await UserModel.findOne({ username });
	return user;
};

export const getUserById = async (id: string) => {
	const user = await UserModel.findById(id);
	return user;
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

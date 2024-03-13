export function load({ locals }) {
	console.log('layout load', locals.authedUser);
	return {
		user: locals.authedUser
	};
}

import { connect_db } from '$db/mongo';

(async () => {
	await connect_db();
})();

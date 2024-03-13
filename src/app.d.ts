// See https://kit.svelte.dev/docs/types#app

import type { List } from 'postcss/lib/list';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		// interface Locals {
		// 	authedUser: UserMod
		// }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

type DBResponse<T> = {
	error: boolean;
	message: string;
	data: List<T>;
};

export {};

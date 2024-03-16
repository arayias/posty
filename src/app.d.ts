// See https://kit.svelte.dev/docs/types#app

import type { List } from 'postcss/lib/list';
import type { string } from 'zod';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		interface Locals {
			authedUser: {
				_id?: string;
				username?: string;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export type FormErrors = {
	formErrors: [string];
	fieldErrors: {
		[key: string]: string;
	};
};

type DBResponse<T> = {
	error: boolean;
	message: string;
	data: List<T>;
};

export {};

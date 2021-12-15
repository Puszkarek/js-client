import { IndexerWell } from '~/models';
import { APIContext } from '../utils/api-context';

export const makeGetAllIndexers = (context: APIContext) => {
	return async (): Promise<Array<IndexerWell>> => {
		return null!;
	};
};

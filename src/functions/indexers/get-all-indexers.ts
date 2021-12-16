import { IndexerWell, toIndexerWell } from '~/models';
import { buildHTTPRequestWithAuthFromContext, buildURL, parseJSONResponse, fetch } from '../utils';
import { APIContext } from '../utils/api-context';

export const makeGetAllIndexers = (context: APIContext) => {
	const templatePath = '/api/indexer/info';
	const url = buildURL(templatePath, { ...context, protocol: 'http' });

	return async (): Promise<Array<IndexerWell>> => {
		const req = buildHTTPRequestWithAuthFromContext(context);

		const raw = await fetch(url, { ...req, method: 'GET' });
		const rawRes = (await parseJSONResponse<any>(raw)) ?? [];

		return toIndexerWell(rawRes);
	};
};

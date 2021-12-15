import { IndexerWell, toIndexerWell } from '~/models';
import { buildHTTPRequestWithAuthFromContext, buildURL, parseJSONResponse } from '../utils';
import { APIContext } from '../utils/api-context';

export const makeGetAllIndexers = (context: APIContext) => {
	// TODO: this.get('indexer/info').pipe(... url is correctly?
	const templatePath = '/api/indexer/info';
	const url = buildURL(templatePath, { ...context, protocol: 'http' });

	return async (): Promise<Array<IndexerWell>> => {
		const req = buildHTTPRequestWithAuthFromContext(context);

		const raw = await fetch(url, { ...req, method: 'GET' });
		// TODO: this is not the right way to do this
		const rawRes = (await parseJSONResponse<any>(raw)) ?? [];
		return rawRes.map(toIndexerWell);
	};
};

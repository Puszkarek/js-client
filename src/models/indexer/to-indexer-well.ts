import { IndexerWell } from './indexer-well';
import { responseGuard } from './response-guard';

export const toIndexerWell = (data: unknown): Array<IndexerWell> =>
	Object.entries(responseGuard(data)).map(([name, partialIndexerWell]) => ({
		Name: name,
		...partialIndexerWell,
	}));

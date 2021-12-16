/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { IndexerWell } from './indexer-well';
import { responseGuard } from './response-guard';

export const toIndexerWell = (data: unknown): Array<IndexerWell> =>
	Object.entries(responseGuard(data)).map(([name, partialIndexerWell]) => ({
		Name: name,
		...partialIndexerWell,
	}));

/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isArray, isObject, isString } from 'lodash';
import { isUUID } from '~/value-objects';
import { IndexerWell } from './indexer-well';

export const isIndexerWell = (value: any): value is IndexerWell => {
	try {
		const i: IndexerWell = value;

		return isUUID(i.UUID) && isString(i.Name) && isArray(i.Wells) && isObject(i.Replicated);
	} catch {
		return false;
	}
};

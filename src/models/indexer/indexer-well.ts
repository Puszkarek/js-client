/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isString, isUndefined } from 'lodash';
import { isUUID } from '~/value-objects';
import { isReplicatedState, ReplicatedState } from './replicated-state';
import { isWell, Well } from './well';

/** An indexer's well. */
export type IndexerWell = {
	Name: string;
	UUID: string;
	Wells: Array<Well>;
	Replicated?: Record<string, Array<ReplicatedState>>;
};

export const isIndexerWell = (value: any): value is IndexerWell => {
	try {
		const i = <IndexerWell>value;

		return (
			isUUID(i.UUID) &&
			isString(i.Name) &&
			i.Wells.every(isWell) &&
			(isUndefined(i.Replicated) ||
				Object.entries(i.Replicated).every(([k, v]) => isString(k) && v.every(isReplicatedState)))
		);
	} catch {
		return false;
	}
};

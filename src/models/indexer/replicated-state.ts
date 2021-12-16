/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isString, isUndefined } from 'lodash';
import { isShard, Shard } from './shard';

export interface ReplicatedState {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<Shard>;
}

export const isReplicatedState = (value: unknown): value is ReplicatedState => {
	try {
		const r = <ReplicatedState>value;

		return (
			isString(r.Name) &&
			(isUndefined(r.Accelerator) || isString(r.Accelerator)) &&
			(isUndefined(r.Engine) || isString(r.Engine)) &&
			r.Tags.every(isString) &&
			r.Shards.every(isShard)
		);
	} catch {
		return false;
	}
};

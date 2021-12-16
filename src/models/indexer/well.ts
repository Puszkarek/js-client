/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isString, isUndefined } from 'lodash';
import { isShard, Shard } from './shard';

export type Well = {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Path: string;
	Tags: Array<string>;
	Shards: Array<Shard>;
};

export const isWell = (value: unknown): value is Well => {
	try {
		const w = <Well>value;

		return (
			isString(w.Name) &&
			(isUndefined(w.Accelerator) || isString(w.Accelerator)) &&
			(isUndefined(w.Engine) || isString(w.Engine)) &&
			isString(w.Path) &&
			w.Tags.every(isString) &&
			w.Shards.every(isShard)
		);
	} catch {
		return false;
	}
};

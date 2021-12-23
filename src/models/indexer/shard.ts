/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { has, isBoolean, isDate, isNumber, isString, isUndefined } from 'lodash';

export type Shard = {
	name: string;
	start: Date;
	end: Date;
	entries: number;
	size: number;
	cold: boolean;
	remoteState?: RemoteState | undefined;
};
export type RemoteState = {
	uuid: string;
	entries: number;
	size: number;
};

export const isShard = (value: unknown): value is Shard => {
	try {
		const s = <Shard>value;

		return (
			isString(s.name) &&
			isDate(s.start) &&
			isDate(s.end) &&
			isNumber(s.entries) &&
			isNumber(s.size) &&
			isBoolean(s.cold) &&
			(isUndefined(s.remoteState) ||
				(has(s.remoteState, 'UUID') && has(s.remoteState, 'Entries') && has(s.remoteState, 'Size')))
		);
	} catch {
		return false;
	}
};

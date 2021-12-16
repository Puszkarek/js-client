/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { has, isBoolean, isDate, isNumber, isString, isUndefined } from 'lodash';

export type Shard = {
	Name: string;
	Start: Date;
	End: Date;
	Entries: number;
	Size: number;
	Cold: boolean;
	RemoteState?: {
		UUID: string;
		Entries: number;
		Size: number;
	};
};

export const isShard = (value: any): value is Shard => {
	try {
		const s = <Shard>value;

		return (
			isString(s.Name) &&
			isDate(s.Start) &&
			isDate(s.End) &&
			isNumber(s.Entries) &&
			isNumber(s.Size) &&
			isBoolean(s.Cold) &&
			(isUndefined(s.RemoteState) ||
				(has(s.RemoteState, 'UUID') && has(s.RemoteState, 'Entries') && has(s.RemoteState, 'Size')))
		);
	} catch {
		return false;
	}
};

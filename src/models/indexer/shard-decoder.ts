/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { boolean, number, object, optional, string, iso8601 } from 'decoders';

export const shardDecoder = object({
	Name: string,
	Start: iso8601,
	End: iso8601,
	Entries: number,
	Size: number,
	Cold: boolean,
	RemoteState: optional(
		object({
			UUID: string,
			Entries: number,
			Size: number,
		}),
	),
});

/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { dict, guard, object, string } from 'decoders';
import { RawReplicatedStateDecoded, rawReplicatedStateDecoder } from './raw-replicated-state-decoder';
import { RawWellDecoded, rawWellDecoder } from './raw-well-decoder';

export type RawIndexerWellDecoded = {
	UUID: string;
	Wells: Array<RawWellDecoded>;
	Replicated?: Record<string, Array<RawReplicatedStateDecoded>>;
};

const rawIndexerWellDecoder = dict<RawIndexerWellDecoded>(
	object({
		UUID: string,
		Wells: rawWellDecoder,
		Replicated: rawReplicatedStateDecoder,
	}),
);

export const rawIndexerWellGuard = guard(rawIndexerWellDecoder);

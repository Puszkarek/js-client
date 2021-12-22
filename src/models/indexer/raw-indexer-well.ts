/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { dict, object, string, guard } from 'decoders';
import { RawWellDecoded, rawWellDecoder } from './raw-well';
import { RawReplicatedState, RawReplicatedStateDecoded, rawReplicatedStateDecoder } from './raw-replicated-state';
import { RawWell } from './raw-well';

export type RawIndexerWell = {
	UUID: string;
	Wells: Array<RawWell>;
	Replicated?: Record<string, Array<RawReplicatedState>>;
};

export type RawIndexerWellResponse = {
	[key: string]: RawIndexerWell;
};

export type RawIndexerWellDecoded = {
	UUID: string;
	Wells: Array<RawWellDecoded>;
	Replicated?: Record<string, Array<RawReplicatedStateDecoded>>;
};

export const rawIndexerWellDecoder = dict<RawIndexerWellDecoded>(
	object({
		UUID: string,
		Wells: rawWellDecoder,
		Replicated: rawReplicatedStateDecoder,
	}),
);

type AssertIsRawIndexerWellDecoded = (value: unknown) => asserts value is RawIndexerWellDecoded;

export const rawIndexerWellGuard = guard(rawIndexerWellDecoder);

export const assertIsRawIndexerWellDecoded: AssertIsRawIndexerWellDecoded = value => rawIndexerWellGuard(value);

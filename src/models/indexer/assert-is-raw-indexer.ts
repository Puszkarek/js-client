/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { array, dict, guard, object, string } from 'decoders';
import { RawIndexerWellDecoded, RawIndexerWellResponse, rawReplicatedStateDecoder, rawWellDecoder } from '.';

export const rawIndexerWellDecoder = dict<RawIndexerWellDecoded>(
	object({
		UUID: string,
		Wells: array(rawWellDecoder),
		Replicated: rawReplicatedStateDecoder,
	}),
);

type AssertIsRawIndexerWell = (value: unknown) => asserts value is RawIndexerWellResponse;

export const rawIndexerWellGuard = guard(rawIndexerWellDecoder);

export const assertIsRawIndexerWell: AssertIsRawIndexerWell = value => rawIndexerWellGuard(value);

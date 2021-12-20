/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { array, object, optional, string } from 'decoders';
import { RawShardDecoded, rawShardDecoder } from './raw-shard-decoder';

export type RawWellDecoded = {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Path: string;
	Tags: Array<string>;
	Shards: Array<RawShardDecoded>;
};

export const rawWellDecoder = array<RawWellDecoded>(
	object({
		Name: string,
		Accelerator: optional(string),
		Engine: optional(string),
		Path: string,
		Tags: array(string),
		Shards: array(rawShardDecoder),
	}),
);

/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { dict, array, object, string, optional } from 'decoders';
import { RawShardDecoded, rawShardDecoder } from '.';
import { RawShard } from './raw-shard';

export interface RawReplicatedState {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<RawShard>;
}

export interface RawReplicatedStateDecoded {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<RawShardDecoded>;
}

export const rawReplicatedStateDecoder = dict<Array<RawReplicatedStateDecoded>>(
	array(
		object({
			Name: string,
			Accelerator: optional(string),
			Engine: optional(string),
			Tags: array(string),
			Shards: array(rawShardDecoder),
		}),
	),
);

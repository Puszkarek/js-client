/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawShardDecoded } from './raw-shard-decoder';

export interface RawReplicatedState {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<RawShardDecoded>;
}
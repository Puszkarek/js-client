/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { IndexerWell } from './indexer-well';
import { rawIndexerWellGuard } from './raw-indexer-well-decoder';
import { RawShardDecoded } from './raw-shard-decoder';
import { RawWellDecoded } from './raw-well-decoder';
import { ReplicatedState } from './replicated-state';
import { Shard } from './shard';
import { Well } from './well';
import { RawReplicatedStateDecoded } from './raw-replicated-state-decoder';

export const toIndexerWell = (data: unknown): Array<IndexerWell> =>
	Object.entries(rawIndexerWellGuard(data)).map(([name, { UUID, Wells, Replicated }]) => ({
		uuid: UUID,
		name: name,
		wells: toWells(Wells),
		replicated: toReplicated(Replicated),
	}));

const toWells = (wells: Array<RawWellDecoded>): Array<Well> =>
	wells.map(data => {
		return {
			name: data.Name,
			accelerator: data.Accelerator,
			engine: data.Engine,
			path: data.Path,
			tags: data.Tags,
			shards: toShard(data.Shards),
		};
	});

const toReplicated = (
	replicated: Record<string, Array<RawReplicatedStateDecoded>> | undefined,
): Record<string, Array<ReplicatedState>> | undefined => {
	if (replicated === undefined) return replicated;
	const convertReplicatedState = Object.entries(replicated).map(([key, replicatedStateList]) => {
		const list = replicatedStateList.map(data => {
			return {
				name: data.Name,
				accelerator: data.Accelerator,
				engine: data.Engine,
				tags: data.Tags,
				shards: toShard(data.Shards),
			};
		});
		return [key, list];
	});
	return Object.fromEntries(convertReplicatedState);
};

const toShard = (shards: Array<RawShardDecoded>): Array<Shard> =>
	shards.map(data => {
		const _shardPartial = {
			name: data.Name,
			start: data.Start,
			end: data.End,
			entries: data.Entries,
			size: data.Size,
			cold: data.Cold,
		};
		const _remoteState = data.RemoteState && {
			uuid: data.RemoteState.UUID,
			entries: data.RemoteState.Entries,
			size: data.RemoteState.Size,
		};
		return {
			..._shardPartial,
			remoteState: _remoteState,
		};
	});

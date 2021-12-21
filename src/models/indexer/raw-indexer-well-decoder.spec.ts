/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Guard } from 'decoders';
import { expectTypeOf } from 'expect-type';
import { UUID } from '../../value-objects/id';
import { RawIndexerWell, RawIndexerWellResponse } from './raw-indexer-well';
import { RawIndexerWellDecoded, rawIndexerWellGuard } from './raw-indexer-well-decoder';
import { RawReplicatedState } from './raw-replicated-state';
import { RawReplicatedStateDecoded } from './raw-replicated-state-decoder';
import { RawShard } from './raw-shard';
import { RawShardDecoded } from './raw-shard-decoder';
import { RawWell } from './raw-well';
import { RawWellDecoded } from './raw-well-decoder';

describe('responseGuard()', () => {
	it('Should have the correct function types', () => {
		expectTypeOf(rawIndexerWellGuard).toEqualTypeOf<
			Guard<{
				[key: string]: RawIndexerWellDecoded;
			}>
		>();
	});
	describe('With VALID data', () => {
		it('Should RETURN data correctly if is EMPTY', () => {
			const { emptyResponse } = validMockData();

			const result = rawIndexerWellGuard(emptyResponse);

			expect(result).toEqual(emptyResponse);
		});

		it('Should RETURN data correctly if is VALID', () => {
			const { rawIndexerResponse, rawIndexerDecoded } = validMockData();

			const result = rawIndexerWellGuard(rawIndexerResponse);

			expect(result).toEqual(rawIndexerDecoded);
		});
	});
	describe('With INVALID data', () => {
		it('Should THROW a error if indexer key is EMPTY', () => {
			const { emptyIndexerData } = invalidMockData();

			expect(() => rawIndexerWellGuard(emptyIndexerData)).toThrowError();
		});
		it('Should THROW a error if the UUID is a NUMBER', () => {
			const { withInvalidUUIDData } = invalidMockData();

			expect(() => rawIndexerWellGuard(withInvalidUUIDData)).toThrowError();
		});
		it('Should THROW a error if properties are INVALIDs', () => {
			const { withInvalidProperty } = invalidMockData();

			expect(() => rawIndexerWellGuard(withInvalidProperty)).toThrowError();
		});
	});
});

const validMockData = () => {
	//* Global Values
	const uuid: UUID = 'unique-id';
	const firstIndexerName = 'first-indexer';
	const secondIndexerName = 'second-indexer';

	// Wells
	const wellName = 'default';
	const wellAccelerator = undefined;
	const wellEngine = undefined;
	const wellPath = '/opt/gravwell/storage/default';
	const wellTags = ['default', 'gravwell'];

	// Shards
	const shardName = 'shard-name';
	const shardEntries = 0;
	const shardSize = 0;
	const shardCold = false;

	const shardStartISO8601 = '2021-12-17T03:50:24.000Z';
	const shardEndISO8601 = '2021-12-18T16:14:56.000Z';

	const shardRemoteState = undefined;

	// Replicated
	const replicatedKey = 'replicated-key';
	const replicatedName = 'replicated-name';
	const replicatedAccelerator = undefined;
	const replicatedEngine = undefined;
	const replicatedTags = ['one', 'two'];

	//* Mount raw response

	// Raw Shards
	const _rawShards: Array<RawShard> = [
		{
			Name: shardName,
			Start: shardStartISO8601,
			End: shardEndISO8601,
			Entries: shardEntries,
			Size: shardSize,
			Cold: shardCold,
			RemoteState: shardRemoteState,
		},
	];

	// Raw Wells
	const _rawWells: Array<RawWell> = [
		{
			Name: wellName,
			Accelerator: wellAccelerator,
			Engine: wellEngine,
			Path: wellPath,
			Tags: wellTags,
			Shards: _rawShards,
		},
	];

	// Raw Replicated
	const _replicatedShards: Array<RawShard> = [];
	const _rawReplicated: Record<string, Array<RawReplicatedState>> = {
		[replicatedKey]: [
			{
				Name: replicatedName,
				Accelerator: replicatedAccelerator,
				Engine: replicatedEngine,
				Tags: replicatedTags,
				Shards: _replicatedShards,
			},
		],
	};

	// Raw Indexer Well's
	const _completeRawIndexerWell: RawIndexerWell = {
		UUID: uuid,
		Wells: _rawWells,
		Replicated: _rawReplicated,
	};
	const _minimalRawIndexerData = { UUID: uuid, Wells: [], Replicated: {} };

	// Raw Response
	const rawIndexerResponse: RawIndexerWellResponse = {
		[firstIndexerName]: _completeRawIndexerWell,
		[secondIndexerName]: _minimalRawIndexerData,
	};

	//* Mount expect RawIndexerWellDecoded from decoder

	// Raw Shards Decoded
	const _shardStartDate = new Date(shardStartISO8601);
	const _shardEndDate = new Date(shardEndISO8601);

	const _rawShardDecoded: Array<RawShardDecoded> = [
		{
			Name: shardName,
			Start: _shardStartDate,
			End: _shardEndDate,
			Entries: shardEntries,
			Size: shardSize,
			Cold: shardCold,
			RemoteState: shardRemoteState,
		},
	];

	// Raw Wells Decoded
	const _rawWellsDecoded: Array<RawWellDecoded> = [
		{
			Name: wellName,
			Accelerator: wellAccelerator,
			Engine: wellEngine,
			Path: wellPath,
			Tags: wellTags,
			Shards: _rawShardDecoded,
		},
	];

	// Raw Replicated Decoded
	const _replicatedShardsDecoded: Array<RawShardDecoded> = [];
	const _replicatedDecoded: Record<string, Array<RawReplicatedStateDecoded>> = {
		[replicatedKey]: [
			{
				Name: replicatedName,
				Accelerator: replicatedAccelerator,
				Engine: replicatedEngine,
				Tags: replicatedTags,
				Shards: _replicatedShardsDecoded,
			},
		],
	};

	// Raw Indexer Well Decoded
	const _completeRawIndexerWellDecoded: RawIndexerWellDecoded = {
		UUID: uuid,
		Wells: _rawWellsDecoded,
		Replicated: _replicatedDecoded,
	};

	// Indexer Well Response Decoded
	const rawIndexerDecoded: Record<string, RawIndexerWellDecoded> = {
		[firstIndexerName]: _completeRawIndexerWellDecoded,
		[secondIndexerName]: _minimalRawIndexerData,
	};

	// Empty Response
	const emptyResponse = {};

	return { rawIndexerResponse, rawIndexerDecoded, emptyResponse };
};
const invalidMockData = () => {
	//* Global Values
	const uuid: UUID = 'unique-id';
	const firstIndexerName = 'first-indexer';

	// Wells
	const wellName = false as any;
	const wellAccelerator = false as any;
	const wellEngine = false as any;
	const wellPath = false as any;
	const wellTags = [false, 0] as any;

	// Shards
	const shardName = 0 as any;
	const shardEntries = '0' as any;
	const shardSize = '0' as any;
	const shardCold = '0' as any;

	const shardStartISO8601 = 'invalid-start';
	const shardEndISO8601 = 'invalid-end';

	// Replicated
	const replicatedKey = false as any;
	const replicatedName = false as any;
	const replicatedAccelerator = false as any;
	const replicatedEngine = false as any;
	const replicatedTags = [false] as any;

	//* Mount Raw Response

	// Raw Shards
	const _rawShards: Array<RawShard> = [
		{
			Name: shardName,
			Start: shardStartISO8601,
			End: shardEndISO8601,
			Entries: shardEntries,
			Size: shardSize,
			Cold: shardCold,
		},
	];

	// Raw Wells
	const _rawWells: Array<RawWell> = [
		{
			Name: wellName,
			Accelerator: wellAccelerator,
			Engine: wellEngine,
			Path: wellPath,
			Tags: wellTags,
			Shards: _rawShards,
		},
	];

	// Raw Replicated
	const _replicatedShards: Array<RawShard> = [];
	const _rawReplicated: Record<string, Array<RawReplicatedState>> = {
		[replicatedKey]: [
			{
				Name: replicatedName,
				Accelerator: replicatedAccelerator,
				Engine: replicatedEngine,
				Tags: replicatedTags,
				Shards: _replicatedShards,
			},
		],
	};

	// Raw Indexer Well's
	const _completeRawIndexerWell: RawIndexerWell = {
		UUID: uuid,
		Wells: _rawWells,
		Replicated: _rawReplicated,
	};

	//* Invalid Responses
	const emptyIndexerData = { [firstIndexerName]: undefined };
	const withInvalidUUIDData = { [firstIndexerName]: { UUID: 0, Wells: [], Replicated: {} } };
	const withInvalidProperty: RawIndexerWellResponse = {
		[firstIndexerName]: _completeRawIndexerWell,
	};

	return { emptyIndexerData, withInvalidUUIDData, withInvalidProperty };
};

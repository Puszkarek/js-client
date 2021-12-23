/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { expectTypeOf } from 'expect-type';
import { UUID } from '../../value-objects/id';
import { assertIsRawIndexerWell } from './assert-is-raw-indexer';
import { RawIndexerWell, RawIndexerWellDecoded, RawIndexerWellResponse } from './raw-indexer-well';
import { RawReplicatedState } from './raw-replicated-state';
import { RawShard } from './raw-shard';
import { RawWell } from './raw-well';

describe(assertIsRawIndexerWell.name, () => {
	describe('Function types', () => {
		it('Should have the correct function type', () => {
			expectTypeOf(assertIsRawIndexerWell).toEqualTypeOf<(data: unknown) => asserts data is RawIndexerWellDecoded>();
		});
	});

	describe('Should not throw an error when we pass valid data', () => {
		it('Should not throw an error if the data is empty', () => {
			const { emptyResponse } = validMockData();
			expect(() => assertIsRawIndexerWell(emptyResponse)).not.toThrowError();
		});

		it('Should not throw an error if the data is valid', () => {
			const { rawIndexerResponse } = validMockData();

			expect(() => assertIsRawIndexerWell(rawIndexerResponse)).not.toThrowError();
		});
	});
	describe('Should throw an error when we pass invalid data', () => {
		it('Should throw an error if indexer key is empty', () => {
			const { emptyIndexerData } = invalidMockData();

			expect(() => assertIsRawIndexerWell(emptyIndexerData)).toThrowError();
		});
		it('Should throw an error if the uuid is a number', () => {
			const { withInvalidUUIDData } = invalidMockData();

			expect(() => assertIsRawIndexerWell(withInvalidUUIDData)).toThrowError();
		});
		it('Should throw an error if properties are invalids', () => {
			const { withInvalidProperty } = invalidMockData();

			expect(() => assertIsRawIndexerWell(withInvalidProperty)).toThrowError();
		});
	});
});

const validMockData = () => {
	//* Global Values
	const uuid: UUID = 'unique-id';
	const firstIndexerName = 'first-indexer';
	const secondIndexerName = 'second-indexer';

	//* Mount raw response

	// Raw Shards
	const _rawShards: Array<RawShard> = [
		{
			Name: 'shard-name',
			Start: '2021-12-17T03:50:24.000Z',
			End: '2021-12-18T16:14:56.000Z',
			Entries: 0,
			Size: 0,
			Cold: false,
		},
	];

	// Raw Wells
	const _rawWells: Array<RawWell> = [
		{
			Name: 'default',
			Path: '/opt/gravwell/storage/default',
			Tags: ['default', 'gravwell'],
			Shards: _rawShards,
		},
	];

	// Raw Replicated
	const _replicatedShards: Array<RawShard> = [];
	const _rawReplicated: Record<string, Array<RawReplicatedState>> = {
		['replicated-key']: [
			{
				Name: 'replicated-name',
				Tags: ['one', 'two'],
				Shards: [],
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

	// Empty Response
	const emptyResponse = {};

	return { rawIndexerResponse, emptyResponse };
};
const invalidMockData = () => {
	// Escape hatch for create invalid data
	const unsafe = (value: unknown): any => value as any;

	// Global Values
	const uuid: UUID = 'unique-id';

	// Raw Wells
	const _rawWells: Array<RawWell> = [
		{
			Name: unsafe(false),
			Accelerator: unsafe(false),
			Engine: unsafe(false),
			Path: unsafe(false),
			Tags: unsafe([false, 0]),
			Shards: unsafe('raw-shard'),
		},
	];

	const _rawReplicated: Record<string, Array<RawReplicatedState>> = {
		[unsafe({})]: [
			{
				Name: unsafe(false),
				Accelerator: unsafe(false),
				Engine: unsafe(false),
				Tags: unsafe(false),
				Shards: unsafe([]),
			},
		],
	};

	// Raw Indexer Well's
	const _completeRawIndexerWell: RawIndexerWell = {
		UUID: uuid,
		Wells: _rawWells,
		Replicated: _rawReplicated,
	};

	// Invalid Responses
	const emptyIndexerData = { ['firstIndexerName']: undefined };
	const withInvalidUUIDData = { ['firstIndexerName']: { UUID: 0, Wells: [], Replicated: {} } };
	const withInvalidProperty = { ['firstIndexerName']: _completeRawIndexerWell };

	return { emptyIndexerData, withInvalidUUIDData, withInvalidProperty };
};

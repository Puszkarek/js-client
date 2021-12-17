/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { responseGuard } from './response-guard';

describe('responseGuard()', () => {
	describe('Should WORK', () => {
		it('Should RETURN the correct data if is EMPTY', () => {
			const { validEmpty } = validMockData();

			const result = responseGuard(validEmpty);

			expect(result).toEqual(validEmpty);
		});

		it('Should RETURN the correct data if is VALID', () => {
			const { validIndexerData, validIndexerResult } = validMockData();

			const result = responseGuard(validIndexerData);

			expect(result).toEqual(validIndexerResult);
		});
	});
	describe('Should THROW a Error', () => {
		it('Should FAILED if indexer is EMPTY', () => {
			const { emptyIndexerData } = invalidMockData();

			expect(() => responseGuard(emptyIndexerData)).toThrowError();
		});
		it('Should FAILED errors if the UUID is INVALID', () => {
			const { withInvalidUUIDData } = invalidMockData();

			expect(() => responseGuard(withInvalidUUIDData)).toThrowError();
		});
		it('Should FAILED errors if properties are INVALIDs', () => {
			const { withInvalidProperty } = invalidMockData();

			expect(() => responseGuard(withInvalidProperty)).toThrowError();
		});
	});
});

const validMockData = () => {
	const validEmpty = {};
	const validIndexerData = {
		'first-indexer': {
			UUID: 'unique-id',
			Wells: [
				{
					Name: 'default',
					Accelerator: 'fulltext',
					Engine: 'bloom',
					Path: '/opt/gravwell/storage/default',
					Tags: ['default', 'gravwell'],
					Shards: [
						{
							Name: '76ca7',
							Start: '2021-12-17T03:50:24.000Z',
							End: '2021-12-18T16:14:56.000Z',
							Entries: 0,
							Size: 4112,
							Cold: false,
							RemoteState: undefined,
						},
					],
				},
				{
					Name: 'windows',
					Accelerator: undefined,
					Engine: undefined,
					Path: '/opt/gravwell/storage/windows',
					Tags: [],
					Shards: [
						{
							Name: '76ca7',
							Start: '2021-12-17T03:50:24.000Z',
							End: '2021-12-18T16:14:56.000Z',
							Entries: 0,
							Size: 4112,
							Cold: false,
							RemoteState: undefined,
						},
					],
				},
			],
			Replicated: {
				'first-replicated': [
					{ Name: 'name', Accelerator: 'accelerator', Engine: 'engine', Tags: ['one', 'two'], Shards: [] },
				],
			},
		},
		'second-indexer': { UUID: 'unique-id', Wells: [], Replicated: {} },
	};
	const validIndexerResult = {
		'first-indexer': {
			UUID: 'unique-id',
			Wells: [
				{
					Name: 'default',
					Accelerator: 'fulltext',
					Engine: 'bloom',
					Path: '/opt/gravwell/storage/default',
					Tags: ['default', 'gravwell'],
					Shards: [
						{
							Name: '76ca7',
							Start: new Date('2021-12-17T03:50:24.000Z'),
							End: new Date('2021-12-18T16:14:56.000Z'),
							Entries: 0,
							Size: 4112,
							Cold: false,
							RemoteState: undefined,
						},
					],
				},
				{
					Name: 'windows',
					Accelerator: undefined,
					Engine: undefined,
					Path: '/opt/gravwell/storage/windows',
					Tags: [],
					Shards: [
						{
							Name: '76ca7',
							Start: new Date('2021-12-17T03:50:24.000Z'),
							End: new Date('2021-12-18T16:14:56.000Z'),
							Entries: 0,
							Size: 4112,
							Cold: false,
							RemoteState: undefined,
						},
					],
				},
			],
			Replicated: {
				'first-replicated': [
					{ Name: 'name', Accelerator: 'accelerator', Engine: 'engine', Tags: ['one', 'two'], Shards: [] },
				],
			},
		},
		'second-indexer': { UUID: 'unique-id', Wells: [], Replicated: {} },
	};

	return { validIndexerData, validIndexerResult, validEmpty };
};
const invalidMockData = () => {
	const emptyIndexerData = { 'first-indexer': {} };
	const withInvalidUUIDData = { UUID: 0, Wells: [], Replicated: {} };

	const withInvalidProperty = {
		UUID: 'unique-id',
		Wells: [
			{
				Name: 0,
				Accelerator: 0,
				Engine: false,
				Path: true,
				Tags: ['default', 0],
				Shards: [
					{
						Name: 7,
						Start: '2021-12-17T03:50:24.000Z',
						End: '2021-12-18T16:14:56.000Z',
						Entries: 0,
						Size: 4112,
						Cold: false,
						RemoteState: undefined,
					},
				],
			},
			{
				Name: 0,
				Accelerator: true,
				Engine: new Date(0),
				Path: false,
				Tags: {},
				Shards: [
					{
						Name: 0,
						Start: false,
						End: false,
						Entries: '0',
						Size: 'true',
						Cold: false,
						RemoteState: true,
					},
				],
			},
		],
		Replicated: {
			0: [{ Name: false, Accelerator: true, Engine: false, Tags: [0], Shards: {} }],
		},
	};
	return { emptyIndexerData, withInvalidUUIDData, withInvalidProperty };
};

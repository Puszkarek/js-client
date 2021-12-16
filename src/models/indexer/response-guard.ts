/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { array, boolean, dict, guard, iso8601, number, object, optional, string } from 'decoders';

const shardDecoder = object({
	Name: string,
	Start: iso8601,
	End: iso8601,
	Entries: number,
	Size: number,
	Cold: boolean,
	RemoteState: optional(
		object({
			UUID: string,
			Entries: number,
			Size: number,
		}),
	),
});

const indexerWellDecoder = dict(
	object({
		UUID: string,
		Wells: array(
			object({
				Name: string,
				Accelerator: optional(string),
				Engine: optional(string),
				Path: string,
				Tags: array(string),
				Shards: array(shardDecoder),
			}),
		),
		Replicated: dict(
			array(
				object({
					Name: string,
					Accelerator: optional(string),
					Engine: optional(string),
					Tags: array(string),
					Shards: array(shardDecoder),
				}),
			),
		),
	}),
);

export const responseGuard = guard(indexerWellDecoder);

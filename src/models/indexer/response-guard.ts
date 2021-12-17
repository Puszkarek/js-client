/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { array, boolean, dict, guard, iso8601, number, object, optional, string } from 'decoders';

const rawShardDecoder = object({
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

const rawIndexerWellDecoder = dict(
	object({
		UUID: string,
		Wells: array(
			object({
				Name: string,
				Accelerator: optional(string),
				Engine: optional(string),
				Path: string,
				Tags: array(string),
				Shards: array(rawShardDecoder),
			}),
		),
		Replicated: dict(
			array(
				object({
					Name: string,
					Accelerator: optional(string),
					Engine: optional(string),
					Tags: array(string),
					Shards: array(rawShardDecoder),
				}),
			),
		),
	}),
);

export const responseGuard = guard(rawIndexerWellDecoder);

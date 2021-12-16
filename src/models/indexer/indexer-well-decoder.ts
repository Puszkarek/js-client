/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { array, dict, object, optional, string } from 'decoders';
import { shardDecoder } from './shard-decoder';

export const indexerWellDecoder = dict(
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

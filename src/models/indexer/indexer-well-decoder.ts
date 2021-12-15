import { shardDecoder } from './shard-decoder';
import { array, dict, object, optional, string } from 'decoders';

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

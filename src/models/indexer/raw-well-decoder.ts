import { array, object, optional, string } from 'decoders';
import { RawShardDecoded,rawShardDecoder } from './raw-shard-decoder';

export type RawWellDecoded = {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Path: string;
	Tags: Array<string>;
	Shards: Array<RawShardDecoded>;
};

export const rawWellDecoder = array<RawWellDecoded>(
	object({
		Name: string,
		Accelerator: optional(string),
		Engine: optional(string),
		Path: string,
		Tags: array(string),
		Shards: array(rawShardDecoder),
	}),
);

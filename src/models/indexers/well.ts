import { Shard } from './shard';

export type Well = {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Path: string;
	Tags: Array<string>;
	Shards: Array<Shard>;
};

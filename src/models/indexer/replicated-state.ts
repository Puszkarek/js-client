import { Shard } from './shard';

export interface ReplicatedState {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<Shard>;
}

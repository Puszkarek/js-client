import { RawShard } from './raw-shard';

export interface RawReplicatedState {
	Name: string;
	Accelerator?: string;
	Engine?: string;
	Tags: Array<string>;
	Shards: Array<RawShard>;
}

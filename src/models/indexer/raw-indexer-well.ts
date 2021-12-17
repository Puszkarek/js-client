import { RawReplicatedState } from './raw-replicated-state';
import { RawWell } from './raw-well';

export type RawIndexerWell = {
	[key: string]: {
		UUID: string;
		Wells: Array<RawWell>;
		Replicated?: Record<string, Array<RawReplicatedState>>;
	};
};

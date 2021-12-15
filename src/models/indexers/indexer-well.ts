import { ReplicatedState } from './replicated-state';
import { Well } from './well';

/** An indexer's well. */
export type IndexerWell = {
	Name: string;
	UUID: string;
	Wells: Array<Well>;
	Replicated?: Record<string, Array<ReplicatedState>>;
};

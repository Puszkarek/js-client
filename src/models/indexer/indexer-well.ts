/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { ReplicatedState } from './replicated-state';
import { Well } from './well';

/** An indexer's well. */
export type IndexerWell = {
	Name: string;
	UUID: string;
	Wells: Array<Well>;
	Replicated?: Record<string, Array<ReplicatedState>>;
};

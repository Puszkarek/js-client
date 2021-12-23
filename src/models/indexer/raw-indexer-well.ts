/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawReplicatedState, RawReplicatedStateDecoded } from './raw-replicated-state';
import { RawWell, RawWellDecoded } from './raw-well';

export type RawIndexerWell = {
	UUID: string;
	Wells: Array<RawWell>;
	Replicated?: Record<string, Array<RawReplicatedState>>;
};

export type RawIndexerWellResponse = {
	[key: string]: RawIndexerWell;
};

export type RawIndexerWellDecoded = {
	UUID: string;
	Wells: Array<RawWellDecoded>;
	Replicated?: Record<string, Array<RawReplicatedStateDecoded>>;
};

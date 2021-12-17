/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawReplicatedState } from './raw-replicated-state';
import { RawWell } from './raw-well';

export type RawIndexerWell = {
	[key: string]: {
		UUID: string;
		Wells: Array<RawWell>;
		Replicated?: Record<string, Array<RawReplicatedState>>;
	};
};

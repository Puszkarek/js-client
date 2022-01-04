/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawVersionObject } from './raw-version-object';
import { Version } from './version';

export const toRawVersionObject = (version: Version): RawVersionObject => {
	return {
		Major: version.major,
		Minor: version.minor,
		Point: version.patch,
	};
};

/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { integrationTest } from '../../tests';
import { TEST_BASE_API_CONTEXT } from '../../tests/config';
import { makeSystemIsConnected } from './system-is-connected';

describe('systemIsConnected()', () => {
	const systemIsConnected = makeSystemIsConnected(TEST_BASE_API_CONTEXT);

	it(
		'Should tell if the system is connect',
		integrationTest(async () => {
			const isConnected = await systemIsConnected();
			expect(isConnected).toBeTrue();
		}),
	);
});

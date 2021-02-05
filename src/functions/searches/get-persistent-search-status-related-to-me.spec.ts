/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isSearch2 } from '~/models';
import { integrationTest } from '../../tests';
import { TEST_BASE_API_CONTEXT } from '../../tests/config';
import { makeGetPersistentSearchStatusRelatedToMe } from './get-persistent-search-status-related-to-me';

describe('getPersistentSearchStatusRelatedToMe()', () => {
	const getPersistentSearchStatusRelatedToMe = makeGetPersistentSearchStatusRelatedToMe(TEST_BASE_API_CONTEXT);

	it(
		'Should return all persistent searches related to me',
		integrationTest(async () => {
			const searches = await getPersistentSearchStatusRelatedToMe();
			expect(searches.every(isSearch2)).toBeTrue();
		}),
	);
});

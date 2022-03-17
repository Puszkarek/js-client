/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { omitUndefinedShallow } from '~/functions/utils';
import { isNumericID, toRawNumericID } from '~/value-objects';
import { toRawTimeframe } from '../timeframe';
import { CreatableDashboardSearch } from './creatable-dashboard-search';
import { RawCreatableDashboardSearch } from './raw-creatable-dashboard';

export const toRawCreatableDashboardSearch = (data: CreatableDashboardSearch): RawCreatableDashboardSearch =>
	omitUndefinedShallow({
		alias: data.name ?? null,
		timeframe: data.timeframeOverride ? toRawTimeframe(data.timeframeOverride) : undefined,
		// TODO: data.type === undefined is just for legacy compatibility, remove that when we stop supporting
		query: data.type === 'query' || data.type === undefined ? data.query : undefined,
		searchID: isNumericID(data.cachedSearchID) ? toRawNumericID(data.cachedSearchID) : undefined,
		color: data.color,
		reference: ((): RawCreatableDashboardSearch['reference'] => {
			// TODO: data.type === undefined is just for legacy compatibility, remove that when we stop supporting
			if (data.type === 'query' || data.type === undefined) return undefined;

			const extras = { defaultValue: data.variablePreviewValue ?? null };
			switch (data.type) {
				case 'template':
					return { id: data.templateID, type: 'template', extras };
				case 'savedQuery':
					return { id: data.savedQueryID, type: 'savedQuery', extras };
				case 'scheduledSearch':
					return { id: data.scheduledSearchID, type: 'scheduledSearch', extras };
			}
		})(),
	});

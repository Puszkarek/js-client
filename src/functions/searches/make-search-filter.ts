/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Observable, scan, startWith } from 'rxjs';
import { SearchFilter } from '~/main';
import { RequiredSearchFilter } from './subscribe-to-one-search/helpers';

export type DateRange = { start: Date; end: Date };

export type MakeSearchFilterProps = {
	filter$: Observable<SearchFilter>;
	initialFilter: RequiredSearchFilter;
	previewDateRange: DateRange;
	defaultValues: {
		dateStart: Date;
		dateEnd: Date;
	};
};

/**
 * Creates the necessary properties to control the filter of a search
 *
 * @param initialSettings.filter$ Observable that will receives the properties of search to be updated
 * @param initialSettings.initialFilter Date range used on preview
 * @param initialSettings.defaultValues Values used in the lack of a initial filter value
 *
 *
 * @returns An observable that emits the updated search
 */
export const makeSearchFilterUpdate = ({
	filter$,
	initialFilter,
	previewDateRange,
	defaultValues,
}: MakeSearchFilterProps): Observable<RequiredSearchFilter> => {
	const expandDateRange = (dateRange: SearchFilter['dateRange']): Partial<DateRange> => {
		if (dateRange === 'preview') return previewDateRange;
		return dateRange ?? {};
	};

	// TODO: remove any
	const searchFilter$: any = filter$.pipe(
		startWith<SearchFilter>(initialFilter),
		scan((prev, curr) => {
			console.log({ prev, curr });
			return {
				entriesOffset: {
					index: curr.entriesOffset?.index ?? prev?.entriesOffset?.index ?? initialFilter.entriesOffset.index,
					count: curr.entriesOffset?.count ?? prev?.entriesOffset?.count ?? initialFilter.entriesOffset.count,
				},
				dateRange: {
					start: defaultValues.dateStart,
					end: defaultValues.dateEnd,
					...expandDateRange(initialFilter.dateRange),
					...expandDateRange(prev?.dateRange),
					...expandDateRange(curr.dateRange),
				},
				desiredGranularity: curr.desiredGranularity ?? prev?.desiredGranularity ?? initialFilter.desiredGranularity,
				overviewGranularity: curr.overviewGranularity ?? prev?.overviewGranularity ?? initialFilter.overviewGranularity,
				zoomGranularity: curr.zoomGranularity ?? prev?.zoomGranularity ?? initialFilter.zoomGranularity,
				elementFilters: initialFilter.elementFilters,
			};
		}),
	);

	return searchFilter$;
};

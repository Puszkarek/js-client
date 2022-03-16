/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { NumericID } from '~/value-objects';
import { DashboardRendererOptions } from './dashboard-renderer-options';

export interface DashboardTile {
	id: NumericID;
	title: string;

	/**
	 * Index for the related search in Dashboard.searches.
	 */
	searchIndex: number;

	renderer: string;
	rendererOptions?: DashboardRendererOptions;

	dimensions: {
		columns: number;
		rows: number;
	};
	position: {
		/**	Old dashboards has optionally positions, so for now we need to keep that, but we will keep required for creation to avoid legacy dashboards */
		x?: number;
		y?: number;
	};
}

/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isArray, isBoolean, isDate, isNull, isNumber, isString, isUndefined } from 'lodash';
import { isNumericID, isUUID } from '~/value-objects';
import {
	Version,
	DashboardLiveUpdate,
	isVersion,
	isTimeframe,
	DashboardTile,
	DashboardSearch,
	Dashboard,
	DashboardRendererOptions,
} from '~/models';

export const isDashboard = (value: unknown): value is Dashboard => {
	try {
		const d = <Dashboard>value;
		return (
			(isNumericID(d.id) &&
				isUUID(d.globalID) &&
				isNumericID(d.userID) &&
				isArray(d.groupIDs) &&
				d.groupIDs.every(isNumber) &&
				isString(d.name) &&
				(isNull(d.description) || isString(d.description)) &&
				isArray(d.labels) &&
				d.labels.every(isString) &&
				isDate(d.creationDate) &&
				isDate(d.lastUpdateDate) &&
				isDate(d.lastMainUpdateDate) &&
				isVersion(d.version) &&
				isBoolean(d.updateOnZoom) &&
				isDashboardLiveUpdate(d.liveUpdate) &&
				isTimeframe(d.timeframe) &&
				isArray(d.searches) &&
				d.searches.every(isDashboardSearch) &&
				isArray(d.tiles)) ||
			(d.tiles.every(isDashboardTile) &&
				(isNull(d.gridOptions.gutter) || isNumber(d.gridOptions.gutter)) &&
				(isNull(d.gridOptions.margin) || isNumber(d.gridOptions.margin)))
		);
	} catch {
		return false;
	}
};

export const isDashboardLiveUpdate = (value: unknown): value is Version => {
	try {
		const d = <DashboardLiveUpdate>value;

		return isBoolean(d.enabled) && (isNumber(d.interval) || isUndefined(d.interval) || isNull(d.interval));
	} catch {
		return false;
	}
};

export const isDashboardSearch = (value: unknown): value is DashboardSearch => {
	try {
		const ds = <DashboardSearch>value;
		return (
			(isString(ds.name) || isNull(ds.name)) &&
			(isTimeframe(ds.timeframeOverride) || isNull(ds.timeframeOverride)) &&
			(isNumericID(ds.cachedSearchID) || isNull(ds.cachedSearchID)) &&
			(isString(ds.variablePreviewValue) || isNull(ds.variablePreviewValue))
		);
	} catch {
		return false;
	}
};

export const isDashboardTile = (value: unknown): value is DashboardSearch => {
	try {
		const dt = <DashboardTile>value;
		return (
			isNumericID(dt.id) &&
			isString(dt.title) &&
			isNumber(dt.searchIndex) &&
			isString(dt.renderer) &&
			isDashboardRendererOptions(dt.rendererOptions) &&
			isNumber(dt.dimensions.columns) &&
			isNumber(dt.dimensions.rows) &&
			isNumber(dt.position.x) &&
			isNumber(dt.position.y)
		);
	} catch {
		return false;
	}
};

export const isDashboardRendererOptions = (value: unknown): value is DashboardRendererOptions => {
	try {
		const d = <DashboardRendererOptions>value;

		return (
			(isUndefined(d.XAxisSplitLine) || isString(d.XAxisSplitLine)) &&
			(isUndefined(d.YAxisSplitLine) || isString(d.YAxisSplitLine)) &&
			(isUndefined(d.IncludeOther) || isString(d.IncludeOther)) &&
			(isUndefined(d.Stack) || isString(d.Stack)) &&
			(isUndefined(d.Smoothing) || isString(d.Smoothing)) &&
			(isUndefined(d.Orientation) || isString(d.Orientation)) &&
			(isUndefined(d.ConnectNulls) || isString(d.ConnectNulls)) &&
			(isUndefined(d.Precision) || isString(d.Precision)) &&
			(isUndefined(d.LogScale) || isString(d.LogScale)) &&
			(isUndefined(d.Range) || isString(d.Range)) &&
			(isUndefined(d.Rotate) || isString(d.Rotate)) &&
			(isUndefined(d.Labels) || isString(d.Labels)) &&
			(isUndefined(d.Background) || isString(d.Background)) &&
			(isUndefined(d.values) ||
				((isUndefined(d.values.Orientation) || isString(d.values.Orientation)) &&
					(isUndefined(d.values.Smoothing) || isString(d.values.Smoothing)) &&
					isUndefined(d.values.columns)) ||
				(isArray(d.values.columns) && d.values.columns.every(isString)))
		);
	} catch {
		return false;
	}
};

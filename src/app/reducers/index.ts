import { combineReducers } from 'redux';
import rangeBarChartWidgetState from "./range-bar-chart-reducer"

export interface RootState {
    rangeBarChartWidgetState: BarChartWidgetState;
}

export default combineReducers<RootState>({
    rangeBarChartWidgetState
});

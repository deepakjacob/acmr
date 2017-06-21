import { bindActionCreators, Dispatch } from 'redux';
import * as Actions from "../actions/actions"
import { RootState } from '../reducers/index';

export namespace App {
    export interface Props {
        data: TransactionData;
        actions: typeof Actions;
    }
    export interface State {
    }
}

export const mapStateToProps = (state: RootState) => {
    return {
        data: state.rangeBarChartWidgetState
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<BarChartWidgetState>) => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
}
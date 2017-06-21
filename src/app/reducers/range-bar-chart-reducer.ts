import { handleActions } from "redux-actions";
import * as Actions from "../constants/constants";
import { mockTransactionData } from "../../mock-range-chart-data";


const expTotal = mockTransactionData.transactions
    .filter((e: Transaction) => e.group == "Expense")
    .reduce((acc: number, e: Transaction) => acc + e.amount, 0);

const earTotal = mockTransactionData.transactions
    .filter((e: Transaction) => e.group == "Earning")
    .reduce((acc: number, e: Transaction) => acc + e.amount, 0);
const savTotal = earTotal - expTotal;

const initialState: BarChartWidgetState = {
    originalDateRange: mockTransactionData.selectedDateRange,
    selectedDateRange: mockTransactionData.selectedDateRange,
    selectedTransactions: mockTransactionData.selectedTransactions,
    transactions: mockTransactionData.transactions,
    totalStats: {
        earningsTotal: earTotal,
        expenseTotal: expTotal,
        savingsTotal: savTotal
    }
};


// Sets a transaction range in state as user moves range slider handle
export default handleActions({
    [Actions.SET_TRANSACTION_RANGE]: (state: BarChartWidgetState, action: ReduxActions.Action<DateRange>) => {
        return {
            originalDateRange: state.originalDateRange,
            selectedDateRange: action.payload,
            transactions: state.transactions,
            selectedTransactions: state.transactions.filter((e) => {
                return action.payload
                    && e.date >= action.payload.from
                    && e.date <= action.payload.to
            }),
            totalStats: {
                earningsTotal: earTotal,
                expenseTotal: expTotal,
                savingsTotal: savTotal
            }
        };
    }, [Actions.FETCH_TRANSACTIONS]: (state: BarChartWidgetState, action: ReduxActions.Action<DateRange>) => {

        return {
            originalDateRange: state.originalDateRange,
            selectedDateRange: action.payload,
            transactions: state.transactions,
            selectedTransactions: state.transactions.filter((e) => {
                return action.payload
                    && e.date >= action.payload.from
                    && e.date <= action.payload.to
            }),
            totalStats: {
                earningsTotal: earTotal,
                expenseTotal: expTotal,
                savingsTotal: savTotal
            }
        };
    }
}, initialState);




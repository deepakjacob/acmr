import { createAction } from "redux-actions";
import * as Actions from "../constants/constants";

export const setTransactionRange = createAction<DateRange>(Actions.SET_TRANSACTION_RANGE);

const fetchTxns = fetch("http://localhost:3000/transactions")
    .then((response: Response) => response.json())
    .catch((err: any) => console.log(err));

export const retrieveTransactions = createAction(Actions.FETCH_TRANSACTIONS, async (dateRange: DateRange) => {
    const result = await fetchTxns;
    return result.transactions;
});



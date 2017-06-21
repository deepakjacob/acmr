import * as React from "react";

import {
    Spinner,
    Tabs2,
    Tab2
} from "@blueprintjs/core";

import "./app.scss";


import { ChartComponent } from "./app/container/monthly-spending-pattern-component";
import { CustomTabHeader } from "./custom-tab-header";

import { EarningsExpenseComponent } from './app/container/earnings-expense-component';
import { configureStore } from './app/store';


import { mockTransactionData } from "./mock-range-chart-data";


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

const store = configureStore(initialState);
import Provider from "./app/provider";

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div >
                <div className="left col">
                    <div className="header"></div>
                    <div className="body row" style={{ overflow: "hidden" }}></div>
                    <div className="footer">Icons go here</div>
                </div>
                <div className="right col">
                    <div className="header row"></div>
                    < div className="body row" style={{ overflow: "hidden" }}>
                        <Tabs2 id="mainTabs" className="mainTab">
                            <Tab2 id="dashboard" title={<CustomTabHeader title={"Dashboard "} />} panel={
                                <div style={{ overflowX: "scroll" }}>
                                    <div>
                                        <div className="left-inner col" style={{ overflowX: "hidden" }}>
                                            <Provider store={store} target={EarningsExpenseComponent} />
                                        </div>
                                        <div className="right-inner col" style={{ overflowX: "hidden" }}>
                                            <Provider store={store} target={ChartComponent} />
                                        </div>
                                    </div>
                                </div>
                            }></Tab2>
                            <Tab2 id="external" title={<CustomTabHeader title={"Import External Data"} />} panel={<Spinner />}> </Tab2>
                        </Tabs2>
                    </div >
                    <div className="footer row">
                        Get a bird's eye view of statistics !
          </div>
                </div >
            </div >
        );
    }
}


export default App;



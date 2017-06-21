import * as React from 'react';

import { connect } from "react-redux";
import { NumberRange } from '@blueprintjs/core/dist';

import { mapStateToProps, mapDispatchToProps, App } from "../mapping/component-mappings";
import { DataTable } from "../components/data-table"
import { WidgetHeader, WidgetSubHeader } from "../components/widget-header";
import { Stats, StatsWidget } from "../components/stat-widget"
import { ChartConfigWidget } from "../components/chart-config-widget";
import { ChartControl } from "../components/bar-chart";
import './../../widget-styles.scss';


// Following activities are expected to be performed when the widget is loaded:
//                                                                          //
//  1. load data through an async action
//  2. map the loaded data to respective child widgets
//  2. set the slider state by default to select whole range, ie, to 0..89
//  3. convert the slider's numberic range to date range which application's expects.

// Work around https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951
@(connect(mapStateToProps, mapDispatchToProps) as any)
export class EarningsExpenseComponent extends React.Component<App.Props, App.State> {

    private addDays = (date: Date, days: number): Date => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    private mapRangeToDate = (range: NumberRange): DateRange => {
        const { from, to } = this.props.data.originalDateRange;
        return {
            from: this.addDays(from, range[0]),
            to: this.addDays(to, -(90 - range[1]))
        };
    }

    private handleRangeChange = (range: NumberRange) => {
        // convert the number range obtained from the slider
        // to date range which is what the application expects
        const dateRange = this.mapRangeToDate(range);
        // once the date range is calculated, fire the action
        const { actions } = this.props;
        actions.setTransactionRange(dateRange);
        //actions.retrieveTransactions(dateRange);
    }

    private getStats = (t: Transaction[],
        totalStats: { earningsTotal: number; expenseTotal: number; savingsTotal: number; }): Stats => {
        const exS = t.filter((e) => e.group == "Expense").reduce((acc, e) => acc + e.amount, 0);
        const eaS = t.filter((e) => e.group == "Earning").reduce((acc, e) => acc + e.amount, 0);

        return {
            val2Selected: eaS,
            val2Total: totalStats.earningsTotal,
            val1Selected: exS,
            val1Total: totalStats.expenseTotal,
            val3Selected: (eaS - exS),
            val3Total: totalStats.savingsTotal
        };
    }

    render() {
        const { selectedTransactions, totalStats } = this.props.data;
        return (
            <div className="widget" >
                <WidgetHeader title="Expense / Earnings / Savings" />
                <StatsWidget {...this.getStats(selectedTransactions, totalStats) } />
                <ChartConfigWidget />
                <ChartControl
                    chartId="chartId"
                    height={150}
                    width={770}
                    data={this.props.data}
                    handleRangeChange={this.handleRangeChange}
                />
                <WidgetSubHeader title="Transactions for the selected period" />
                <DataTable data={this.props.data} />
            </div >
        );
    }
}

//connect(mapStateToProps, mapDispatchToProps)(EarningsExpenseComponent);


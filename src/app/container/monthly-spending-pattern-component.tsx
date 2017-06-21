import * as React from "react";
import { connect } from "react-redux";

import {
    timeFormat,
    scaleTime,
    scaleLinear,
    max,
    line,
    extent,
    curveCardinal,
    axisBottom,
    axisLeft,
} from "d3";

import { mapStateToProps, mapDispatchToProps, App } from "../mapping/component-mappings";

import { Axis, AxisType, Grid, LineChartProps, LineChartState } from "../chart-commons";

import { WidgetHeader, WidgetSubHeader } from "../components/widget-header";
import { Stats, StatsWidget } from "../components/stat-widget"
import { ChartConfigWidget } from "../components/chart-config-widget";
import { DataTable } from "../components/data-table"

// Work around https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951
@(connect(mapStateToProps, mapDispatchToProps) as any)
export class ChartComponent extends React.Component<App.Props, App.State> {

    private getStats = (): Stats => {
        return {
            val2Selected: 1234,
            val2Total: 5678,
            val1Selected: 8907,
            val1Total: 6789,
            val3Selected: 5678,
            val3Total: 3456
        };
    }

    render() {
        const stats: Stats = this.getStats();
        return (
            <div className="widget">
                <WidgetHeader title="Monthwise Spending Patterns" />
                <StatsWidget {...stats} />
                <ChartConfigWidget />
                <LineChartWidget chartId="lineChart" width={600} height={170} data={this.props.data} />
                <WidgetSubHeader title="Transactions for the selected period" />
                <DataTable data={this.props.data} />
            </div>
        );
    }
}


interface DotProps {
    data: TransactionData;
    x: (d: any) => any;
    y: (d: any) => any;
    stroke: string;
    fill: string;
    strokeWidth: string;
}

/** Need to be moved to chart commons after removing the values array which has a 
 * type of Data. Data is highly specific to this usage and is not reusable
 */
class Dots extends React.Component<DotProps, {}>{
    render() {
        const { selectedTransactions } = this.props.data;
        let copy = selectedTransactions.slice(1, selectedTransactions.length - 2)

        const circles = copy.map((d, i) =>
            <circle
                r="5"
                cx={this.props.x(d.date)}
                cy={this.props.y(d.amount)}
                stroke={this.props.stroke}
                fill={this.props.fill}
                strokeWidth={this.props.strokeWidth}
                key={i}
            />
        );
        return (
            <g>
                {circles}
            </g>
        );
    }
}

class LineChartWidget extends React.Component<LineChartProps, LineChartState>{
    static defaultProps: LineChartProps;
    constructor(props: LineChartProps) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height
        };
    }

    private updateDimensions = () => {
        // const w = window
        //    , d = document
        //    , documentElement = d.documentElement
        //    , body = d.getElementsByTagName('body')[0];
        // ,width = w.innerWidth || documentElement.clientWidth || body.clientWidth
        // ,height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

        this.setState({ width: 800, height: 800 });
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render(): JSX.Element {
        const { data } = this.props;

        const margin = { top: 5, right: 15, bottom: 5, left: 45 }
            , w = (this.state.width > 840 ? 840 : this.state.width) - (margin.left + margin.right)
            , h = 130 - (margin.top + margin.bottom);

        const x = scaleTime().domain(extent(data.transactions, (d: any) => d.date) as any).rangeRound([0, w]);
        const y = scaleLinear().domain([0, max(data.transactions, (d: any) => d.amount)]).range([h, 0]);

        const yAxis = axisLeft(y).ticks(4);

        const xAxis = axisBottom(x)
            .tickPadding(7)
            .tickFormat((d, i) => {
                return (timeFormat("%d")(d as Date));
            })
            .ticks(31);

        const yGrid = axisLeft(y)
            .ticks(4)
            .tickSize(-w)
        //TODO: Check tickformat        
        //.tickFormat("");

        const theLine = (line<Transaction>()
            .x(function (d: Transaction) {
                return x(d.date);
            })
            .y(function (d: any) {
                return y(d.amount);
            }).curve(curveCardinal));

        const transform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div className="graph-bg">
                <svg
                    id={this.props.chartId} width="100%" height="150px">
                    <g transform={transform}>
                        <Grid h={h} grid={yGrid} type={AxisType.y} />
                        <Axis h={h} axis={yAxis} type={AxisType.y} />
                        <Axis h={h} axis={xAxis} type={AxisType.x} />
                        <path className="line2 shadow" d={theLine(data.transactions) as string} strokeLinecap="round" />
                        <path className="line shadow" d={theLine(data.selectedTransactions) as string} strokeLinecap="round" />
                        <Dots data={data} x={x} y={y} stroke="#48aff0" fill="white" strokeWidth="3px" />
                    </g>
                </svg>
            </div>
        );
    }
}



//connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
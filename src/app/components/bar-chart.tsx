import * as React from 'react';
import { NumberRange, RangeSlider } from '@blueprintjs/core/dist';

import {
    Axis, AxisType, Grid,
} from "../chart-commons";

import {
    timeFormat,
    scaleTime,
    scaleLinear,
    max,
    axisBottom,
    axisLeft,
    timeWeek
} from "d3";

interface IRangeSliderState {
    range: NumberRange;
}

export interface BarChartProps {
    chartId: string;
    width: number;
    height: number;
    data: TransactionData;
    handleRangeChange: (range: [number, number]) => any;
}

export class ChartControl extends React.Component<BarChartProps, {}>{
    render() {
        return (
            <div style={{ position: "relative" }}>
                <BarChart
                    chartId={this.props.chartId}
                    handleRangeChange={this.props.handleRangeChange}
                    height={this.props.height}
                    width={this.props.width}
                    data={this.props.data} />
            </div>
        );
    }
};

export class BarChart extends React.Component<BarChartProps, IRangeSliderState>{
    constructor(props: BarChartProps) {
        super(props);
        this.state = {
            range: [0, 89]
        }
    }

    private handleRangeChange = (range: NumberRange) => {
        this.setState({ range: range });
        this.props.handleRangeChange(range);
    }

    render() {
        const { transactions, selectedDateRange } = this.props.data;
        const
            margin = { top: 10, right: 0, bottom: 20, left: 30 }
            , w = this.props.width - (margin.left - margin.right)
            , h = (this.props.height - (margin.top + margin.bottom))
            , x = scaleTime()
            , y = scaleLinear().rangeRound([h, 0])
            , transform = 'translate(' + margin.left + ',' + margin.top + ')'
            , barWidth = w / 90
            , xAxis = axisBottom(x).ticks(timeWeek, 1).tickFormat(timeFormat("%b %d")).tickPadding(3)
            , yAxis = axisLeft(y).ticks(6)
            , yGrid = axisLeft(y).ticks(4).tickSize(-w);

        //TODO: compute this from the passed in data
        x.domain([new Date(2017, 0, 1, 0), new Date(2017, 3, 1, 0)]);
        x.range([0, w - barWidth]);
        y.domain([0, max(transactions, function (d) { return d.amount; })] as number[]);

        const rectForeground = (transactions).map((d, i) => {
            let color = "#ced9e0";
            const fallsWithin = d.date >= selectedDateRange.from && d.date <= selectedDateRange.to;
            if (fallsWithin) {
                if (d.group == "Expense") {
                    color = "#eb532d";
                } else {
                    color = "#3DCC91";
                }
            }
            return (
                <rect key={i}
                    stroke={color}
                    strokeWidth="3"
                    x={x(d.date)}
                    y={y(d.amount)}
                    width={3}
                    height={h - y(d.amount)} />
            );
        });

        return (
            <div>
                <div className="graph-bg">
                    <svg id="weeklyBarChart" width={this.props.width} height={this.props.height}>
                        <g transform={transform}>
                            <Grid h={h} grid={yGrid} type={AxisType.y} />
                            <Axis h={h} axis={yAxis} type={AxisType.y} />
                            <Axis h={h} axis={xAxis} type={AxisType.x} />
                            {rectForeground}
                        </g>
                    </svg>
                </div>
                <div style={{ position: "absolute", top: 5, left: 30, width: "740px" }}>
                    <RangeSlider
                        showTrackFill={true}
                        min={0}
                        max={89}
                        stepSize={1}
                        renderLabel={false}
                        onChange={this.handleRangeChange}
                        value={this.state.range}
                    />
                </div>
            </div>
        );
    }
};
import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    timeFormat,
    timeParse,
    scaleTime,
    scaleLinear,
    max,
    line,
    extent,
    CurveFactory,
    curveCardinal,
    axisBottom,
    axisLeft,
    select
} from "d3";

import {
    Axis, AxisType, Grid, GridProps, LineChartProps, LineChartState
} from "./chart-commons";

interface Data {
    day: string;
    count: number;
    date?: Date | null;
}


interface DotProps {
    data: Array<Data>;
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

        //remove first and last dots
        const values: Array<Data> = (this.props.data.splice(1));
        values.pop();

        const circles = values.map((d, i) =>
            <circle
                r="5"
                cx={this.props.x(d.date)}
                cy={this.props.y(d.count)}
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


class LineChart extends React.Component<LineChartProps, LineChartState>{

    static defaultProps: LineChartProps;

    constructor(props: LineChartProps) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height
        };
    }

    private updateDimensions = () => {
        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

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
        const data: Array<Data> = [
            { day: '01-01-2016', count: 89 },
            { day: '01-02-2016', count: 9 },
            { day: '01-03-2016', count: 45 },
            { day: '01-04-2016', count: 0 },
            { day: '01-05-2016', count: 1180 },
            { day: '01-06-2016', count: 250 },
            { day: '01-09-2016', count: 5 },
            { day: '01-12-2016', count: 496 },
            { day: '01-15-2016', count: 600 },
            { day: '01-16-2016', count: 15 },
            { day: '01-17-2016', count: 100 },
            { day: '01-20-2016', count: 8 },
            { day: '01-21-2016', count: 45 },
            { day: '01-24-2016', count: 150 },
            { day: '01-25-2016', count: 70 },
            { day: '01-26-2016', count: 25 },
            { day: '01-27-2016', count: 10 },
            { day: '01-28-2016', count: 10 },
            { day: '01-29-2016', count: 10 },
            { day: '01-30-2016', count: 10 },
            { day: '01-31-2016', count: 10 },

        ];

        const data2: Array<Data> = [
            { day: '01-01-2016', count: 8 },
            { day: '01-02-2016', count: 18 },
            { day: '01-03-2016', count: 55 },
            { day: '01-04-2016', count: 100 },
            { day: '01-05-2016', count: 10 },
            { day: '01-06-2016', count: 50 },
            { day: '01-09-2016', count: 5 },
            { day: '01-12-2016', count: 996 },
            { day: '01-15-2016', count: 300 },
            { day: '01-16-2016', count: 115 },
            { day: '01-17-2016', count: 10 },
            { day: '01-20-2016', count: 150 },
            { day: '01-21-2016', count: 5 },
            { day: '01-24-2016', count: 50 },
            { day: '01-25-2016', count: 700 },
            { day: '01-26-2016', count: 2 },
            { day: '01-27-2016', count: 1 },
            { day: '01-28-2016', count: 20 },
            { day: '01-29-2016', count: 30 },
            { day: '01-30-2016', count: 40 },
            { day: '01-31-2016', count: 50 },

        ];
        const margin = { top: 5, right: 15, bottom: 5, left: 45 },
            w = (this.state.width > 840 ? 840 : this.state.width) - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);


        data.forEach(function (d) {
            d.date = (timeParse("%m-%d-%Y")(d.day));
        });

        data2.forEach(function (d) {
            d.date = (timeParse("%m-%d-%Y")(d.day));
        });

        const x = scaleTime().domain(extent(data, (d: any) => d.date) as any).rangeRound([0, w]);
        const y = scaleLinear().domain([0, max(data, (d: any) => d.count)]).range([h, 0]);

        const yAxis = axisLeft(y)
            .ticks(4);

        const xAxis = axisBottom(x)
            .tickPadding(7)
            .tickFormat((d, i) => {
                return (timeFormat("%d")(d as Date));
            })
            .ticks(31);

        const yGrid = axisLeft(y)
            .ticks(4)
            .tickSize(-w)
            .tickFormat("");

        const theLine = line()
            .x(function (d: any) {
                return x(d.date);
            })
            .y(function (d: any) {
                return y(d.count);
            }).curve(curveCardinal);

        const transform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div className="graph-bg">
                <svg
                    id={this.props.chartId}
                    width="100%"
                    height="300px"
                >

                    <g transform={transform}>
                        <Grid h={h} grid={yGrid} type={AxisType.y} />
                        <Axis h={h} axis={yAxis} type={AxisType.y} />
                        <Axis h={h} axis={xAxis} type={AxisType.x} />
                        <path className="line shadow" d={theLine(data)} strokeLinecap="round" />

                        <path className="line2 shadow" d={theLine(data2)} strokeLinecap="round" />

                        <Dots data={data} x={x} y={y} stroke="#1983c0" fill="white" strokeWidth="3px" />
                        <Dots data={data2} x={x} y={y} stroke="#0F9960" fill="white" strokeWidth="3px" />

                    </g>
                </svg>
            </div>
        );
    }
}

LineChart.defaultProps = {
    width: 600,
    height: 250,
    chartId: "v1_chart"
}


export class ChartComponent extends React.Component<{}, {}> {
    render() {
        return (
            <div className="widget">
                <LineChart />
            </div>);
    }


}


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

export interface LineChartProps {
    width: number;
    height: number;
    chartId: string;
    data: TransactionData;
}

export interface LineChartState {
    width: number;
    height: number;
}


export enum AxisType {
    x, y
}

export interface AxisProps {
    h: number,
    axis: any;
    type: AxisType
}

export class Axis extends React.Component<AxisProps, {}> {
    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis = () => {
        const node = ReactDOM.findDOMNode(this);
        select(node).call(this.props.axis);
    }

    render() {
        const translate = "translate(0," + (this.props.h) + ")";

        return (
            <g className={this.props.type == AxisType.x ? "x-axis" : "y-axis"}
                transform={this.props.type == AxisType.x ? translate : ""} >
            </g>
        );
    }
}

export interface GridProps {
    h: number,
    grid: (axis: any) => any;
    type: AxisType
}

export class Grid extends React.Component<GridProps, {}> {

    componentDidUpdate() {
        this.renderGrid();
    }
    componentDidMount() {
        this.renderGrid();
    }

    renderGrid = () => {
        const node = ReactDOM.findDOMNode(this);
        select(node).call(this.props.grid);
    }

    render() {
        const translate = "translate(0," + (this.props.h) + ")";

        return (
            <g className="axis" transform={this.props.type == AxisType.x ? translate : ""} > </g>
        );
    }
}

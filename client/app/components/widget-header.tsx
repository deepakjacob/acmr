import * as React from "react";

export const WidgetHeader = (props: { title: string }) => {
    return (
        <div className="widget-header">
            <span
                className="widget-title pt-icon-standard pt-icon-timeline-bar-chart pt-align-left">
                <span className="widget-title ">&nbsp; {props.title}</span>
            </span>
        </div >
    );
};


export const WidgetSubHeader = (props: { title: string }) => {
    return (
        <div className="table-header">
            <span
                className="pt-align-left">
                <span>&nbsp; {props.title}</span>
            </span>
        </div >
    );
};

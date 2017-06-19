import * as React from "react";

export interface Stats {
    val1Selected: number;
    val1Total: number;
    val2Selected: number;
    val2Total: number;
    val3Selected: number;
    val3Total: number;
}

export const StatsWidget = (stats: Stats): JSX.Element => {
    return (
        <div className="stat-container">
            <StatDetailWidget
                styleClass="label-red"
                value={stats.val1Selected}
                total={stats.val1Total}
                description="Expenses"
            />
            <div className="stat-divider"></div>
            <StatDetailWidget
                styleClass="label-green"
                value={stats.val2Selected}
                total={stats.val2Total}
                description="Earnings"
            />
            <div className="stat-divider"></div>
            <StatDetailWidget
                styleClass="label-blue"
                value={stats.val3Selected}
                total={stats.val3Total}
                description="Savings"
            />
        </div >
    );
}

interface StatDetailProps {
    styleClass: string;
    value: number;
    total: number;
    description: string;
}

const StatDetailWidget = (props: StatDetailProps) => (
    <div >
        <div className={props.styleClass}>
            <span> {`$${(props.value).toFixed(2)}`}</span>

            <span className="label-large-grey">/ {`$${(props.total).toFixed(2)}`}</span>
        </div>
        <div className="label-grey">{props.description}</div>
    </div>
);
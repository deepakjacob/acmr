export interface RangeBarChartProps {
    width: number;
    height: number;
    chartId: string;

    data: TransactionData[];
    range: number[];
    handleValueChange: () => void;
}

/** Is this required? */
interface BarchartState {
}

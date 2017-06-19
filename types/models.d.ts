/** Model definitions */

// This is the min and max values set by user on the range slider by moving
// the slider handle. This can be also set by a redux action when page is 
// rendered initially. Note that the bootstrap library used for rendering
// slider, uses an array to represent the values.
declare interface DateRange {
    from: Date;
    to: Date;
}

//type EXPENSE = "Expense";
//type EARNING = "Earning";

// A transaction can either be an expense or an earning like salary credit
//declare type TransactionType = EXPENSE | EARNING;

// Represents  sum of all expenses happned on a single day. If user enters 
// multiple expenses expenses on a single day, the it has be summed up to
// reach a single figure for the entire day. 
declare interface Transaction {
    amount: number;
    date: Date;
    group: string;
    remarks?: string;
}

declare interface TransactionData {
    originalDateRange: DateRange;
    selectedDateRange: DateRange;
    selectedTransactions: Transaction[];
    transactions: Transaction[];
    totalStats: {
        earningsTotal: number;
        expenseTotal: number;
        savingsTotal: number;
    }
}

// This data is used by the SVG to render the 90 days graph. When the range 
// slider handle is moved, this data will be filtered.
declare type BarChartWidgetState = TransactionData;

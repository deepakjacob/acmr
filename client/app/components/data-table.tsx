import * as React from "react";
import { Cell, Column, Table } from "@blueprintjs/table";

export class DataTable extends React.Component<{ data: TransactionData }, {}> {
    constructor(props: any) {
        super(props);
        this.setState({ configuration: "random" });
    }
    public render() {
        const { selectedTransactions } = this.props.data;

        return (
            <div style={{ height: "618px", overflowY: "scroll" }}>
                <Table
                    isRowResizable={true}
                    numRows={selectedTransactions.length}
                >
                    <Column name="Date" renderCell={this.renderDate} />
                    <Column name="Amount" renderCell={this.renderAmount} />
                    <Column name="Group" renderCell={this.renderGroup} />
                    <Column name="Remarks" renderCell={this.renderRemarks} />
                </Table>
            </div>
        );
    }

    private renderDate = (row: number) => <Cell>{this.props.data.selectedTransactions[row].date.toDateString()}</Cell>;
    private renderAmount = (row: number) => <Cell>
        {`$${(this.props.data.selectedTransactions[row].amount).toFixed(2)}`}
    </Cell>;
    private renderGroup = (row: number) => <Cell>{this.props.data.selectedTransactions[row].group}</Cell>;
    private renderRemarks = (row: number) => <Cell>{this.props.data.selectedTransactions[row].remarks}</Cell>;

}
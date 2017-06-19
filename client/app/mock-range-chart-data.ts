const mockRange: DateRange = { from: new Date(2017, 0, 1), to: new Date(2017, 2, 31) };

const mockTransactions: Transaction[] = [
    { group: "Earning", date: new Date(2017, 0, 1), amount: 1850, remarks: "Salary credit from Employer" },
    { group: "Expense", date: new Date(2017, 0, 1), amount: 1850, remarks: "Rent Payment" },
    { group: "Expense", date: new Date(2017, 0, 2), amount: 20 },
    { group: "Expense", date: new Date(2017, 0, 3), amount: 30 },
    { group: "Expense", date: new Date(2017, 0, 4), amount: 40 },
    { group: "Expense", date: new Date(2017, 0, 5), amount: 500, remarks: 'Car Loan Payment' },
    { group: "Expense", date: new Date(2017, 0, 6), amount: 110 },
    { group: "Expense", date: new Date(2017, 0, 7), amount: 115 },
    { group: "Expense", date: new Date(2017, 0, 8), amount: 115 },
    { group: "Expense", date: new Date(2017, 0, 9), amount: 150 },
    { group: "Expense", date: new Date(2017, 0, 10), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 11), amount: 78 },
    { group: "Expense", date: new Date(2017, 0, 12), amount: 90 },
    { group: "Expense", date: new Date(2017, 0, 13), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 14), amount: 33 },
    { group: "Earning", date: new Date(2017, 0, 15), amount: 2500, remarks: "Salary credit from Employer" },
    { group: "Expense", date: new Date(2017, 0, 15), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 16), amount: 44 },
    { group: "Expense", date: new Date(2017, 0, 17), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 18), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 19), amount: 45 },
    { group: "Expense", date: new Date(2017, 0, 20), amount: 30 },
    { group: "Expense", date: new Date(2017, 0, 21), amount: 15 },
    { group: "Expense", date: new Date(2017, 0, 22), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 23), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 24), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 25), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 26), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 27), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 28), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 29), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 30), amount: 0 },
    { group: "Expense", date: new Date(2017, 0, 31), amount: 0 },
    { group: "Earning", date: new Date(2017, 0, 31), amount: 2600, remarks: "Salary credit from Employer" },


    { group: "Expense", date: new Date(2017, 1, 1), amount: 1850, remarks: "Rent Payment" },
    { group: "Expense", date: new Date(2017, 1, 2), amount: 20 },
    { group: "Expense", date: new Date(2017, 1, 4), amount: 40 },
    { group: "Expense", date: new Date(2017, 1, 3), amount: 30 },
    { group: "Expense", date: new Date(2017, 1, 5), amount: 500, remarks: 'Car Loan Payment' },
    { group: "Expense", date: new Date(2017, 1, 6), amount: 110 },
    { group: "Expense", date: new Date(2017, 1, 7), amount: 115 },
    { group: "Expense", date: new Date(2017, 1, 8), amount: 115 },
    { group: "Expense", date: new Date(2017, 1, 9), amount: 150 },
    { group: "Expense", date: new Date(2017, 1, 10), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 11), amount: 78 },
    { group: "Expense", date: new Date(2017, 1, 12), amount: 90 },
    { group: "Expense", date: new Date(2017, 1, 13), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 14), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 15), amount: 185 },
    { group: "Earning", date: new Date(2017, 1, 15), amount: 2400, remarks: "Salary credit from Employer" },

    { group: "Expense", date: new Date(2017, 1, 16), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 17), amount: 5 },
    { group: "Expense", date: new Date(2017, 1, 18), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 19), amount: 30 },
    { group: "Expense", date: new Date(2017, 1, 20), amount: 20 },
    { group: "Expense", date: new Date(2017, 1, 21), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 22), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 23), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 24), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 25), amount: 15 },
    { group: "Expense", date: new Date(2017, 1, 26), amount: 90 },
    { group: "Expense", date: new Date(2017, 1, 27), amount: 150 },
    { group: "Expense", date: new Date(2017, 1, 28), amount: 240 },
    { group: "Earning", date: new Date(2017, 1, 28), amount: 2600, remarks: "Salary credit from Employer" },


    { group: "Expense", date: new Date(2017, 2, 1), amount: 1850, remarks: "Rent Payment" },
    { group: "Expense", date: new Date(2017, 2, 2), amount: 20 },
    { group: "Expense", date: new Date(2017, 2, 4), amount: 40 },
    { group: "Expense", date: new Date(2017, 2, 3), amount: 30 },
    { group: "Expense", date: new Date(2017, 2, 5), amount: 500, remarks: 'Car Loan Payment' },
    { group: "Expense", date: new Date(2017, 2, 6), amount: 110 },
    { group: "Expense", date: new Date(2017, 2, 7), amount: 115 },
    { group: "Expense", date: new Date(2017, 2, 8), amount: 115 },
    { group: "Expense", date: new Date(2017, 2, 9), amount: 150 },
    { group: "Expense", date: new Date(2017, 2, 10), amount: 15 },
    { group: "Expense", date: new Date(2017, 2, 11), amount: 78 },
    { group: "Expense", date: new Date(2017, 2, 12), amount: 90 },
    { group: "Expense", date: new Date(2017, 2, 13), amount: 230 },
    { group: "Expense", date: new Date(2017, 2, 14), amount: 15 },
    { group: "Expense", date: new Date(2017, 2, 15), amount: 15 },
    { group: "Earning", date: new Date(2017, 2, 15), amount: 2000, remarks: "Salary credit from Employer" },

    { group: "Expense", date: new Date(2017, 2, 16), amount: 15 },
    { group: "Expense", date: new Date(2017, 2, 17), amount: 200 },
    { group: "Expense", date: new Date(2017, 2, 18), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 19), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 20), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 21), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 22), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 23), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 24), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 25), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 26), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 27), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 28), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 29), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 30), amount: 0 },
    { group: "Expense", date: new Date(2017, 2, 31), amount: 75 },
    { group: "Earning", date: new Date(2017, 2, 31), amount: 2000, remarks: "Salary credit from Employer" }

];


export const mockTransactionData: TransactionData = {
    originalDateRange: mockRange,
    selectedDateRange: mockRange,
    selectedTransactions: mockTransactions,
    transactions: mockTransactions,
    totalStats: {
        earningsTotal: 0,
        expenseTotal: 0,
        savingsTotal: 0
    }
} 
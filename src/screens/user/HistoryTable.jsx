import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const transactions = [
    { type: 'Processing', from: 'T13A....vy6Z', amount: 100, orderNo: 'Df525546hj24658', date: '20/Feb/2025' },
    { type: 'Withdraw', from: 'T13A....vy6Z', amount: 50, orderNo: 'Df525546hj24658', date: '20/Feb/2025' },
    { type: 'Deposit', from: 'T13A....vy6Z', amount: 50, orderNo: 'Df525546hj24658', date: '20/Feb/2025' },
]

const typeTemplate = (rowData) => (
    <div>
        <strong>{rowData.type}</strong>
        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>From: {rowData.from}</div>
    </div>
)

const History = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <DataTable value={transactions} className="p-datatable-sm uppercase" stripedRows>
                <Column header="Transactions" body={typeTemplate} />
                <Column field="amount" header="Amount" />
                <Column field="orderNo" header="Order No." />
                <Column field="date" header="Date" />
            </DataTable>
        </div>
    )
}

export default History

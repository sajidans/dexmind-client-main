import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaCoins } from 'react-icons/fa';

const typeTemplate = (rowData) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <span className='inline-block border-2 border-green-500 rounded-full p-2'>{rowData.icon}</span>
    <div className="space-y-2">
      <div style={{ fontWeight: 'bold' }}>{rowData.type}</div>
      <div style={{ fontSize: '1.4rem', color: '#aaa' }}>From: {rowData.from}</div>
    </div>
  </div>
);

const amountTemplate = (rowData, field) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
    <FaCoins color="#00FFA3" />
    <span>{rowData[field]}</span>
  </div>
);

const HistoryTable = ({ data = [], columns = [] }) => {
  const renderColumnBody = (rowData, column) => {
    if (column.body === 'typeTemplate') return typeTemplate(rowData);
    if (column.body === 'amountTemplate') return amountTemplate(rowData, column.field);
    return rowData[column.field];
  };

  return (
    <div style={{ color: '#fff' }}>
      <DataTable
        value={data}
        className="p-datatable-sm"
        stripedRows
        responsiveLayout="scroll"
        paginator              // ✅ enable pagination
        rows={8}              // ✅ show 10 rows per page
        rowsPerPageOptions={[5, 10, 25]}  // ✅ dropdown options
      >
        {columns.map((col, index) => (
          <Column
            filter
            filterDisplay="row"
            key={index}
            field={col.field}
            header={col.header}
            body={(rowData) => renderColumnBody(rowData, col)}
            style={{ minWidth: col.minWidth || 'auto', fontSize: '1.6rem' }}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default HistoryTable;

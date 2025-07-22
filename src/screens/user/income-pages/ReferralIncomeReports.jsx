import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReportContent } from "../../../constants/content/dummy/ReportContent";
import { useSelector } from "react-redux";
import { getReferralIncomeHistory } from "../../../api/user-api";
const ReferralIncomeReports = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  // const userInfo = useSelector((state) => state.userInfo.userInfo);
  const getReferralIncomeHistoryApi = async () => {
    const response = await getReferralIncomeHistory();
    setData(response.data);
    // console.log(response);
  }


  useEffect(() => {
    getReferralIncomeHistoryApi();

  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.date).toUTCString();
  };

  return (
    <div className="Reports ReferralIncomeReports martop">
      <div className="dataTable ss-card martop">
        <DataTable
          value={data}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          filterDisplay="row"
        >
          <Column
            style={{ width: "10%" }}
            body={serialNumberTemplate}
            header="S.No"
            filter
            sortable
          />
          <Column field="userId.name" header="Username" filter sortable />
          <Column
            field="amount"
            header="Amount"
            filter
            sortable
            body={(rowData) => `${rowData.amount} USDT`}
          />

          <Column
            // field="fromUser.totalInvestment"
            header="Investment"
            filter
            sortable
            body={(rowData) => `${rowData.investment} USDT`}
          />
            <Column
            // field="fromUser.totalInvestment"
            header="Percentage"
            filter
            sortable
            body={(rowData) => `${rowData.percentage} %`}
          />

          <Column field="fromUser.name" header="From User" filter sortable />
          <Column field="createdAt" body={dateTimeTemplate} header="Income Date" filter sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default ReferralIncomeReports;

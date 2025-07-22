import { useEffect, useState } from "react";
import { aiAgentHistory } from "../../api/user-api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

const TradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState([]);

  const getTradeHistory = async () => {
    try {
      const response = await aiAgentHistory();
      if (!response.success) throw new Error("Failed to fetch trade history");
      setTradeHistory(response.data);
    } catch (error) {
      console.error("Error fetching trade history:", error);
    }
  };

  useEffect(() => {
    getTradeHistory();
  }, []);

  // Format date for display
  const formatDate = (rowData, field) => {
    return new Date(rowData[field]).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format amount with currency
  const formatAmount = (rowData, field) => {
    return `$${parseFloat(rowData[field]).toFixed(2)}`;
  };

  // Format boolean status
  const formatStatus = (rowData, field) => {
    return rowData[field] ? "Yes" : "No";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trade History</h2>
      <DataTable
        value={tradeHistory}
        paginator
        rows={10}
        tableStyle={{ minWidth: "50rem" }}
        className="p-datatable-gridlines"
      >
        {/* <Column
          field="_id"
          header="Transaction ID"
          sortable
          style={{ width: "25%" }}
        /> */}
        {/* <Column
          field="plan"
          header="Plan ID"
          sortable
          style={{ width: "25%" }}
        /> */}
        <Column
          field="userId"
          header="User ID"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="investedAmount"
          header="Invested Amount ($)"
          sortable
          style={{ width: "20%" }}
          body={(rowData) => formatAmount(rowData, "investedAmount")}
        />
        <Column
          field="expectedReturn"
          header="Expected Return ($)"
          sortable
          style={{ width: "20%" }}
          body={(rowData) => formatAmount(rowData, "expectedReturn")}
        />
        <Column
          field="investedAt"
          header="Invested Date"
          sortable
          style={{ width: "20%" }}
          body={(rowData) => formatDate(rowData, "investedAt")}
        />
        <Column
          field="maturityDate"
          header="Maturity Date"
          sortable
          style={{ width: "20%" }}
          body={(rowData) => formatDate(rowData, "maturityDate")}
        />
        <Column
          field="isActive"
          header="Active"
          sortable
          style={{ width: "15%" }}
          body={(rowData) => formatStatus(rowData, "isActive")}
        />
        <Column
          field="isMatured"
          header="Matured"
          sortable
          style={{ width: "15%" }}
          body={(rowData) => formatStatus(rowData, "isMatured")}
        />
        <Column
          field="isRedeemed"
          header="Redeemed"
          sortable
          style={{ width: "15%" }}
          body={(rowData) => formatStatus(rowData, "isRedeemed")}
        />
      </DataTable>
    </div>
  );
};

export default TradeHistory;
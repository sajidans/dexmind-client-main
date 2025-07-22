


import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import {
  getUsers,
  UserIncomeBlock,
} from "../../api/admin-api";
import Swal from "sweetalert2";

const AdminUserIncomeBlock = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUserList(response?.data);
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Error fetching users",
        text: error?.response?.data?.message || "Failed to fetch user list",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  const totalIncomeTemplate = (rowData) => (
    <span className="p-2">{rowData?.totalEarnings?.toFixed(2)}</span>
  );

  const referralIncomeTemplate = (rowData) => (
    <span className="p-2">{rowData?.levelIncome?.toFixed(2)} USDT</span>
  );

  const totalInvestmentIncomeTemplate = (rowData) => (
    <span className="p-2">{rowData?.totalInvestment?.toFixed(2)}</span>
  );

  const dateTimeTemplate = (rowData) => new Date(rowData.createdAt).toUTCString();

  const handleTTopup = async (userId) => {
    try {
      const res = await UserIncomeBlock({ userId });
      Swal.fire("Success", res?.message || "Withdrawal block status updated", "success");
      fetchAllUsers();
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update status",
      });
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column field="username" header="Username" filter sortable />
            <Column
              body={totalInvestmentIncomeTemplate}
              header="Total Investment"
              filter
              sortable
            />
            <Column
              body={totalIncomeTemplate}
              header="Total Income"
              filter
              sortable
            />
            <Column
              body={referralIncomeTemplate}
              header="Direct Referral Income"
              filter
              sortable
              field="directRefIncome"
            />
            <Column
              body={(rowData) => (
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "13px",
                    backgroundColor: rowData?.isIncomeBlocked
                      ? "#28a745"
                      : "#dc3545",
                    display: "inline-block",
                    minWidth: "80px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTTopup(rowData._id)}
                >
                  {rowData?.isIncomeBlocked ? "Unblocked" : "Blocked"}
                </span>
              )}
              header="Income Status"
              sortable
            />
            <Column
              filter
              field="createdAt"
              body={dateTimeTemplate}
              header="Join Date"
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AdminUserIncomeBlock;

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import {
  // getAllUserList,
  getUsers,
} from "../../api/admin-api";

const AllUsersList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);


  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      // Map sponsorId fields to top-level sponcerId and sponcerName
      const usersWithSponsor = (response?.data || []).map(user => ({
        ...user,
        sponcerId: user.sponsorId?.username || "",
        sponcerName: user.sponsorId?.name || "",
      }));
      setUserList(usersWithSponsor);
    } catch (error) {
      console.log(error);
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

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const totalIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.totalEarnings?.toFixed(2)}</span>;
  };

  const currentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.currentIncome?.toFixed(2)}</span>;
  };


  const referralIncomeTemplate = (rowData) => {
    return (
      <span className="p-2">
        {rowData?.levelIncome?.toFixed(2)} USDT
      </span>

    );
  };

  const totalInvestmentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.totalInvestment?.toFixed(2)}</span>;
  };


  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
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
            {/* <Column field="_id" header="ID" filter sortable /> */}
            <Column field="name" header="Name" filter sortable />
            <Column field="username" header="Username" filter sortable />
            {/* <Column
              field="WalletAddresst"
              header="Wallet Address"
              body={(rowData) => maskMemberIdFourLatter(rowData?.walletAddress)}
              filter
              sortable
            /> */}


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

            {/* <Column
              body={currentIncomeTemplate}
              header="currentIncome"
              filter
              sortable
              field="currentIncome"
            /> */}
            {/* <Column
              // body={levelIncomeTemplate}
              header="Level Income"
              body={(rowData) => (
                <span className="p-2">
                  {rowData?.levelIncome?.toFixed(6)} USDT
                </span>
              )}
              filter
              sortable
            /> */}
            
          
            <Column
              body={referralIncomeTemplate}
              header="Direct Referral Income"
              filter
              sortable
              field="directRefIncome"
            />
            <Column field="sponcerId" header="Sponsor ID" filter sortable />
            <Column field="sponcerName" header="Sponsor Name" filter sortable />
            <Column
              body={(rowData) => (
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "13px",
                    backgroundColor: rowData?.status ? "#28a745" : "#dc3545",
                    display: "inline-block",
                    minWidth: "80px",
                    textAlign: "center",
                  }}
                >
                  {rowData?.status ? "Active" : "Inactive"}
                </span>
              )}
              header="Status"
              // filter
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

export default AllUsersList;

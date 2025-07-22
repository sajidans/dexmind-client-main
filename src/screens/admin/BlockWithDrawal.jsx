

// // const BlockWithDrawal = () => {
// //   return (
// //     <div>
// //       BlockWithDrawal
// //     </div>
// //   )
// // }

// // export default BlockWithDrawal





// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { useEffect, useState } from "react";
// import PageLoader from "../../components/ui/PageLoader";
// import { SwalError } from "../../utils/custom-alert";
// import {
//     AdminTopupUser,
//   BlockUnblockWithdraw,
//   // getAllUserList,
//   getUsers,
// } from "../../api/admin-api";
// import Swal from "sweetalert2";


// const BlockWithDrawal = () => {
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [UserList, setUserList] = useState([]);


//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getUsers();
//       setUserList(response?.data);
//     } catch (error) {
//       console.log(error);
//       SwalError.fire({
//         icon: "error",
//         title: "Error fetching users",
//         text: error?.response?.data?.message || "Failed to fetch user list",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   const serialNumberTemplate = (rowData, { rowIndex }) => {
//     return rowIndex + 1;
//   };

//   const totalIncomeTemplate = (rowData) => {
//     return <span className="p-2">{rowData?.totalEarnings?.toFixed(2)}</span>;
//   };

//   const currentIncomeTemplate = (rowData) => {
//     return <span className="p-2">{rowData?.currentIncome?.toFixed(2)}</span>;
//   };


//   const referralIncomeTemplate = (rowData) => {
//     return (
//       <span className="p-2">
//         {rowData?.levelIncome?.toFixed(2)} USDT
//       </span>

//     );
//   };

//   const totalInvestmentIncomeTemplate = (rowData) => {
//     return <span className="p-2">{rowData?.totalInvestment?.toFixed(2)}</span>;
//   };


//   const dateTimeTemplate = (rowData) => {
//     return new Date(rowData.createdAt).toUTCString();
//   };


// const handleTTopup =(userId) => {


//        BlockUnblockWithdraw({userId: userId});

// };



//   return (
//     <>
//       {loading && <PageLoader />}
//       <div className="WithdrawalReport martop">
//         <div className="dataTable ss-card martop">
//           <DataTable
//             value={UserList}
//             paginator
//             rows={10}
//             rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
//             filterDisplay="row"
//             globalFilter={globalFilter}
//           >
//             <Column
//               style={{ width: "10%" }}
//               body={serialNumberTemplate}
//               header="S.No"
//               filter
//               sortable
//             />
//             {/* <Column field="_id" header="ID" filter sortable /> */}
//             <Column field="username" header="Username" filter sortable />
//             {/* <Column
//               field="WalletAddresst"
//               header="Wallet Address"
//               body={(rowData) => maskMemberIdFourLatter(rowData?.walletAddress)}
//               filter
//               sortable
//             /> */}


//             <Column
//               body={totalInvestmentIncomeTemplate}
//               header="Total Investment"
//               filter
//               sortable
//             />
//             <Column
//               body={totalIncomeTemplate}
//               header="Total Income"
//               filter
//               sortable

//             />

//             {/* <Column
//               body={currentIncomeTemplate}
//               header="currentIncome"
//               filter
//               sortable
//               field="currentIncome"
//             /> */}
//             {/* <Column
//               // body={levelIncomeTemplate}
//               header="Level Income"
//               body={(rowData) => (
//                 <span className="p-2">
//                   {rowData?.levelIncome?.toFixed(6)} USDT
//                 </span>
//               )}
//               filter
//               sortable
//             /> */}


//             <Column
//               body={referralIncomeTemplate}
//               header="Direct Referral Income"
//               filter
//               sortable
//               field="directRefIncome"
//             />
//             <Column
//               body={(rowData) => (
//                 // console.log(rowData),
//                 <span
//                   style={{
//                     padding: "6px 12px",
//                     borderRadius: "999px",
//                     color: "#fff",
//                     fontWeight: "600",
//                     fontSize: "13px",
//                     backgroundColor: rowData?.isWithdrawalblock ? "#28a745" : "#dc3545",
//                     display: "inline-block",
//                     minWidth: "80px",
//                     textAlign: "center",
//                   }}
//                   onClick={()=> handleTTopup(rowData._id)}
//                 >

//                   {rowData?.isWithdrawalblock ? "Unblocked" : "Blocked"}
//                 </span>
//               )}
//               header="Status"
//               // filter
//               sortable
//             />
//             <Column
//               filter
//               field="createdAt"
//               body={dateTimeTemplate}
//               header="Join Date"
//             />
//           </DataTable>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlockWithDrawal;




import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import {
  getUsers,
  BlockUnblockWithdraw,
} from "../../api/admin-api";
import Swal from "sweetalert2";

const BlockWithDrawal = () => {
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
      const res = await BlockUnblockWithdraw({ userId });
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
                    backgroundColor: rowData?.isWithdrawalblock
                      ? "#28a745"
                      : "#dc3545",
                    display: "inline-block",
                    minWidth: "80px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTTopup(rowData._id)}
                >
                  {rowData?.isWithdrawalblock ? "Unblocked" : "Blocked"}
                </span>
              )}
              header="Withdraw Status"
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

export default BlockWithDrawal;

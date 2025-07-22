// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { useEffect, useState } from "react";
// import PageLoader from "../../components/ui/PageLoader";
// import { SwalError } from "../../utils/custom-alert";
// import {
//     AdminTopupUser,
//   // getAllUserList,
//   getUsers,
// } from "../../api/admin-api";
// import Swal from "sweetalert2";


// const AdminTopup = () => {
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


// const handleTTopup = (userId) => {
//   console.log("UserID:", userId);

//   Swal.fire({
//     title: "Unblock User",
//     html: `
//       <input type="number" id="amount" class="swal2-input" placeholder="Enter amount" required>
//     `,
//     confirmButtonText: "Unblock",
//     showCancelButton: true,
//     cancelButtonText: "Cancel",
//     focusConfirm: false,
//     preConfirm: () => {
//       const amount = document.getElementById("amount").value;
//       if (!amount || isNaN(amount) || amount <= 0) {
//         Swal.showValidationMessage("Please enter a valid amount");
//         return false;
//       }
//       return { userId, amount: parseFloat(amount) };  // ✅ lower-case `userid`
//     },
//   }).then((result) => {
//     if (result.isConfirmed) {
//       const payload = {
//         userId: result.value.userId,  // ✅ using `userid`
//         amount: result.value.amount,
//       };
//       console.log("Payload:", payload);
//       AdminTopupUser(payload);
//     }
//   });
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
//                     backgroundColor: rowData?.isLoginBlocked ? "#28a745" : "#dc3545",
//                     display: "inline-block",
//                     minWidth: "80px",
//                     textAlign: "center",
//                   }}
//                   onClick={()=> handleTTopup(rowData._id)}
//                 >

//                   {rowData?.isLoginBlocked ? "Active" : "Inactive"}
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

// export default AdminTopup;

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import { AdminTopupUser, BlockUser, getUsers, UnBlockUser } from "../../api/admin-api";
import Swal from "sweetalert2";

const AdminTopup = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUserList(response?.data);
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

  const handleBlockUnblock = async (userId) => {
    try {
      const res = await BlockUser({ userId });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.message || "User status updated successfully.",
      });
      fetchAllUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  const handleUnblockUser = async (userId) => {
    try {
      const res = await UnBlockUser({ userId });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.message || "User status updated successfully.", // Generic message
      });
      fetchAllUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };


  const handleTopup = (userId) => {
    Swal.fire({
      title: "Unblock User",
      html: `
        <input type="number" id="amount" class="swal2-input" placeholder="Enter amount" required>
      `,
      confirmButtonText: "Unblock",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const amount = document.getElementById("amount").value;
        if (!amount || isNaN(amount) || amount <= 0) {
          Swal.showValidationMessage("Please enter a valid amount");
          return false;
        }
        return { userId, amount: parseFloat(amount) };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          userId: result.value.userId,
          amount: result.value.amount,
        };
        AdminTopupUser(payload)
          .then(() => {
            Swal.fire("Success", "Topup Successful", "success");
            fetchAllUsers();
          })
          .catch((err) => {
            Swal.fire("Error", err?.response?.data?.message || "Topup failed", "error");
          });
      }
    });
  };

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;
  const totalIncomeTemplate = (rowData) => <span className="p-2">{rowData?.totalEarnings?.toFixed(2)}</span>;
  const referralIncomeTemplate = (rowData) => <span className="p-2">{rowData?.levelIncome?.toFixed(2)} USDT</span>;
  const totalInvestmentIncomeTemplate = (rowData) => <span className="p-2">{rowData?.totalInvestment?.toFixed(2)}</span>;
  const dateTimeTemplate = (rowData) => new Date(rowData.createdAt).toUTCString();

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
                    backgroundColor: rowData?.isLoginBlocked ? "#dc3545" : "#28a745",
                    display: "inline-block",
                    minWidth: "80px",
                    textAlign: "center",
                    cursor: "pointer",
                    opacity: 1,
                  }}
                  onClick={() =>
                    rowData.isLoginBlocked
                      ? handleUnblockUser(rowData._id)
                      : handleBlockUnblock(rowData._id)
                  }

                >
                  {rowData?.isLoginBlocked ? "Inactive" : "Active"}
                </span>
              )}
              header="Status"
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

export default AdminTopup;

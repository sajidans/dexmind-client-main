/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getCompleteWithdrawal } from "../../api/payment-api";
import { approveWithdrawal, rejectWithdrawal } from "../../api/admin-api";
import { Tag } from "primereact/tag";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";

const CompleteWithdrawalRequest = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getCompleteWithdrawal();
      setData(response?.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch withdrawal data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  const dateTimeTemplate = (rowData) =>
    new Date(rowData.createdAt).toLocaleString();

  const statusTemplate = (rowData) => {
    return rowData.status === "success" ? (
      <Tag
        severity="success"
        value="Completed"
        style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
      />
    ) : (
      <Tag
        severity="info"
        value={rowData.status}
        style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
      />
    );
  };

  // Approve button click handler:
  const handleApprove = async (id) => {
    try {
      setLoading(true);
      const payload = { withdrawalId: id };
      const res = await approveWithdrawal(payload);
      await fetchWithdrawalHistory();
      Swal.fire({
        icon: "success",
        title: "Approved",
        text: res?.message || "Withdrawal approved successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Approval failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reject button click handler:
  const handleReject = async (id) => {
    try {
      setLoading(true);
      const payload = { withdrawalId: id };
      const res = await rejectWithdrawal(payload);
      await fetchWithdrawalHistory();
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: res?.message || "Withdrawal rejected successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Rejection failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => handleApprove(rowData._id)}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-check mr-2"></i> Approve
      </button>
      <button
        onClick={() => handleReject(rowData._id)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-times mr-2"></i> Reject
      </button>
      <button
        onClick={() => {
          setSelectedRow(rowData);
          setViewModalVisible(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-eye mr-2"></i> View
      </button>
    </div>
  );

  return (
    <>
      {loading && <PageLoader />}

      <div className="WithdrawalReport CompleteWithdrawalRequest martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" />
            <Column field="userId.username" header="Username" />
            <Column field="userId.name" header="Full Name" />
            <Column field="userId.email" header="Email" />
            <Column field="userWalletAddress" header="Wallet Address" />
            <Column
              field="amount"
              header="Amount"
              body={(rowData) => rowData.amount.toFixed(2)}
            />
            <Column
              field="netAmountSent"
              header="Net Sent"
              body={(rowData) => rowData.netAmountSent.toFixed(2)}
            />
            <Column
              field="feeAmount"
              header="Fee"
              body={(rowData) => rowData.feeAmount.toFixed(2)}
            />
            {/* <Column
              field="transactionHash"
              header="Txn Hash"
              body={(rowData) => rowData.transactionHash || "—"}
            /> */}
            <Column field="createdAt" body={dateTimeTemplate} header="Date" />
            <Column field="status" header="Status" body={statusTemplate} />
            <Column
              header="Actions"
              body={actionTemplate}
              style={{ minWidth: "14rem" }}
            />
          </DataTable>
        </div>
      </div>

      {/* View Modal */}
      {viewModalVisible && selectedRow && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setViewModalVisible(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Withdrawal Details</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={selectedRow.userWalletAddress || "NA"} size={128} />
            </div>
            <div className="text-sm text-black space-y-2">
              <p><strong>Username:</strong> {selectedRow.userId?.username}</p>
              <p><strong>Full Name:</strong> {selectedRow.userId?.name}</p>
              <p><strong>Email:</strong> {selectedRow.userId?.email}</p>
              <p><strong>Wallet Address:</strong> {selectedRow.userWalletAddress}</p>
              <p><strong>Amount:</strong> ${selectedRow.amount.toFixed(2)}</p>
              <p><strong>Fee Amount:</strong> ${selectedRow.feeAmount.toFixed(2)}</p>
              <p><strong>Net Amount Sent:</strong> ${selectedRow.netAmountSent.toFixed(2)}</p>
              <p><strong>Status:</strong> {selectedRow.status}</p>
              <p><strong>Date:</strong> {new Date(selectedRow.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompleteWithdrawalRequest;

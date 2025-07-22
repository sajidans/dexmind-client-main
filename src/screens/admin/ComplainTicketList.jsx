import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog"; // 🔥 Added
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveComplainRequest,
  getPendingComplainHistory,
  rejectComplainRequest,
} from "../../api/admin-api";
import ApproveMessageModal from "../../components/ui/ApproveMessageModal.jsx";
import RejectMessageModal from "../../components/ui/RejectMessageModal.jsx";

const ComplainTicketList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [History, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rejectingTicket, setRejectingTicket] = useState(null);

  const [imageDialogVisible, setImageDialogVisible] = useState(false); // 🔥 Added
  const [selectedImage, setSelectedImage] = useState(null); // 🔥 Added

  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getPendingComplainHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const rejectUserHandler = (rowData) => {
    setRejectingTicket(rowData);
    setShowRejectModal(true);
  };

  const handleApprove = (rowData) => {
    setSelectedTicket(rowData);
    setShowApproveModal(true);
  };

  const submitApprovalWithMessage = async (message) => {
    try {
      setLoading(true);
      await approveComplainRequest(selectedTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Complain Approved Successfully",
      });
      setShowApproveModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitRejectionWithMessage = async (message) => {
    try {
      setLoading(true);
      await rejectComplainRequest(rejectingTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Complain Rejected Successfully",
      });
      setHistory((prev) =>
        prev.filter((ticket) => ticket._id !== rejectingTicket._id)
      );
      setShowRejectModal(false);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const showTicketPopup = (rowData) => {
    setShowDetail(true);
    setViewDetail(rowData);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="View"
          className="p-mr-2 pi pi-eye"
          onClick={() => showTicketPopup(rowData)}
          style={{
            color: "#dadada",
            fontWeight: "600",
            marginRight: "10px",
            border: "1px solid #dadada",
            backgroundColor: "#2b2b2b",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{
            color: "green",
            marginRight: "10px",
            marginTop: "5px",
            border: "1px solid #dadada",
            backgroundColor: "#abebc6",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => rejectUserHandler(rowData)}
          style={{
            color: "red",
            marginTop: "5px",
            border: "1px solid #dadada",
            backgroundColor: "#f5b7b1",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
      </div>
    );
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  const imageBodyTemplate = (rowData) => (
    <img
      src={rowData.file}
      alt="Attachment"
      style={{
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedImage(rowData.file);
        setImageDialogVisible(true);
      }}
    />
  );

  useEffect(() => {
    getRaiseTicketHistory();
  }, []);

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewTicketDetail
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      {showApproveModal && (
        <ApproveMessageModal
          visible={showApproveModal}
          onHide={() => setShowApproveModal(false)}
          onSubmit={submitApprovalWithMessage}
        />
      )}

      {showRejectModal && (
        <RejectMessageModal
          visible={showRejectModal}
          onHide={() => setShowRejectModal(false)}
          onSubmit={submitRejectionWithMessage}
        />
      )}

      {/* 🔥 Image Dialog */}
      <Dialog
        header="Image Preview"
        visible={imageDialogVisible}
        onHide={() => setImageDialogVisible(false)}
        style={{ width: "50vw" }}
        modal
        closable
      >
        <img
          src={selectedImage}
          alt="Preview"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Dialog>

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={History}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={(rowData, { rowIndex }) => rowIndex + 1}
              header="S.No"
              filter
              sortable
            />
            <Column field="userId.username" header="Username" filter sortable />
            <Column field="subject" header="Subject" filter sortable />
            <Column field="message" header="Message" filter sortable />
            <Column field="status" header="Status" filter sortable />

            {/* 🔥 Image column with click preview */}
            <Column
              field="file"
              header="Image"
              body={imageBodyTemplate}
              sortable
            />

            <Column
              field="createdAt"
              body={dateTimeTemplate}
              header="Date"
              filter
              sortable
            />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ComplainTicketList;

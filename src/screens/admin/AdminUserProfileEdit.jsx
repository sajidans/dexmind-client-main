import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import Swal from "sweetalert2";
import {
  getUsers,
  userProfileEdit, // Make sure this API supports update with name, email, mobile
} from "../../api/admin-api";

const AdminUserProfileEdit = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

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

  const dateTimeTemplate = (rowData) =>
    new Date(rowData.createdAt).toUTCString();

  const handleTopup = (user) => {
    setSelectedUser(user);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setMobile(user?.phone || "");
    setEditModalVisible(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      const payload = {
        userId: selectedUser._id,
        name,
        email,
       phone: mobile,
      };

      const res = await userProfileEdit(payload); // API should handle this
      Swal.fire("Updated!", res?.message || "User updated successfully", "success");
      setEditModalVisible(false);
      fetchAllUsers();
    } catch (err) {
      SwalError.fire({
        title: "Failed",
        text: err?.response?.data?.message || "Error updating user",
      });
    }
  };

  return (
    <>
      {loading && <PageLoader />}

      {/* Edit Modal */}
      {editModalVisible && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
    <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-1">Name</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-600 bg-white text-black text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-1">Email</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-600 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-1">Mobile</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-600 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Mobile Number"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
          onClick={() => setEditModalVisible(false)}
        >
          Cancel
        </button>
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          onClick={handleSubmitUpdate}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}


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
            <Column field="name" header="Name" filter sortable />
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
    <button
      onClick={() => handleTopup(rowData)}
      className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
    >
      Profile Edit
    </button>
  )}
  header="Profile Edit"
  style={{
    textAlign: "center",
    width: "120px",
    padding: "0.5rem",
    fontSize: "1rem", // Ya "1.25rem" for slightly larger
    fontWeight: "600"
  }}
  
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

export default AdminUserProfileEdit;

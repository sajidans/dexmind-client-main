import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { Tag } from "primereact/tag";
import { getAdminTopUpHistory} from "../../api/admin-api";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";

const AdminTopUpHistory = () => {
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getAdminTopUpHistory();
      // console.log(response)
      setUserList(response?.data);
    } catch (error) {
      console.log(error);
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
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            {/* <Column field="_id" header="ID" filter sortable /> */}
            <Column field="userId.name" header="Name" filter sortable />
            <Column field="userId.username" header="Username" filter sortable />
            <Column
              field="investmentAmountt"
              header="Amount"
              body={(rowData) => {
                return rowData?.amount +' USDT';
              }}
              filter
              sortable
            />
          
            {/* <Column
              field="packageId.packageName"
              header="Package Name"
              body={(rowData) => (
                <Tag
                  value={rowData?.packageId?.packageName}
                  style={{
                    fontSize: "1.2rem",
                    padding: ".2rem .5rem",
                    background: "",
                    color: "#fff",
                  }}
                />
              )}
              filter
              sortable
            /> */}
            <Column
              filter
              field="createdAt"
              body={dateTimeTemplate}
              header="Top-Up Date"
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AdminTopUpHistory;

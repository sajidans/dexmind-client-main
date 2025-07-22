import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/auth-api";
import { getAdminInfo } from "../../api/admin-api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { AiOutlineLogout } from "react-icons/ai";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const DashboardHeader = ({ name }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.userInfo?.user);
  console.log(userInfo)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        if (role === "Admin") {
          const user = await getAdminInfo();
          dispatch(setUserInfo(user));
        } else {
          const user = await getUserInfo();
          dispatch(setUserInfo(user));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Error fetching user info",
          confirmButtonText: "OK",
          timer: 3000,
        }).then(() => {
          localStorage.clear();
          navigate(AuthenticatedRoutes.USER_HOME);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);
// console.log(userInfo.username)
  const logoutHandler = () => {
    localStorage.clear();
    navigate(AuthenticatedRoutes.USER_HOME);
    window.location.reload();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="DashboardHeader ">
        <div className="pageName">{name}</div>
        <div className="right">
          <div
            // onClick={() => navigate(AuthenticatedRoutes.USER_PROFILE)}
            className="user-login"
            style={{ cursor: "pointer" }}
          >
            <div className="img-card ss-card">
              <img
                src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
                alt="user"
                onClick={() => navigate(AuthenticatedRoutes.USER_PROFILE)}
              />
            </div>
            <h5 className="name">Hii, {userInfo?.username.toUpperCase() || "User"}</h5>
          </div>
          <button onClick={logoutHandler} className="logoutBTN">
            <AiOutlineLogout />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;

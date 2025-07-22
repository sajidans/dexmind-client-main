import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo} from "../../api/auth-api";
import TextInput from "../../components/ui/TextInput";
import { Button2 } from "../../components/ui/Buttons"; 
import PageLoader from "../../components/ui/PageLoader";
import Swal from "sweetalert2";
import { AuthenticatedRoutes } from "../../constants/Routes";
import "../../styles/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await getUserInfo();
        console.log("User Info:", res);
        setUser(res);
      } catch (error) {
        console.error("Error fetching user info:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Error fetching user info",
          confirmButtonText: "OK",
          timer: 3000,
        }).then(() => {
          localStorage.clear();
          window.location.href = AuthenticatedRoutes.USER_HOME;
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  // Handle save action
  // const handleSave = async () => {
  //   const payload = {
  //     name: user?.user?.name,
  //     email: user?.user?.email,
  //     phone: user?.user?.phone,
  //     username: user?.user?.username,
  //     referralCode: user?.user?.referralCode,
  //   };
  //   console.log("Sending payload to updateUserInfo:", payload); 

  //   try {
  //     setLoading(true);
  //     const updatedUser = await updateUserInfo(payload);

      

  //     setUser(updatedUser);
  //     setIsEditable(false);
  //     Swal.fire({
  //       title: "Success",
  //       text: "Profile updated successfully",
  //       confirmButtonText: "OK",
  //       timer: 2000,
  //     });
  //     console.log("Updated user info:", updatedUser); 
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     Swal.fire({
  //       title: "Error",
  //       text: error?.response?.data?.message || "Error updating profile",
  //       confirmButtonText: "OK",
  //       timer: 3000,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleSave = async () => {
  const payload = {
    name: user?.user?.name,
    email: user?.user?.email,
    phone: user?.user?.phone,
    username: user?.user?.username,
    referralCode: user?.user?.referralCode,
  };

  try {
    setLoading(true);
    const updatedData = await updateUserInfo(payload);

    const updatedUser = {
      ...user,
      user: updatedData?.user || updatedData,
    };

    setUser(updatedUser);
    setIsEditable(false);

    Swal.fire({
      title: "Success",
      text: "Profile updated successfully",
      confirmButtonText: "OK",
      timer: 2000,
    }).then(() => {
      window.location.reload(); // reload the page after user clicks "OK"
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    Swal.fire({
      title: "Error",
      text: error?.response?.data?.message || "Error updating profile",
      confirmButtonText: "OK",
      timer: 3000,
    });
  } finally {
    setLoading(false);
  }
};



  if (!user) return <PageLoader />; 

  return (
    <>
      {loading && <PageLoader />}
      <div className="ProfilePage martop">
        <div className="inner ss-card">
          
          <div className="input-container">
            <TextInput
              labelName="Name"
              name="name"
              value={user?.user?.name || ""}
              disabled={!isEditable}
              onChange={handleChange}
            />
            <TextInput
              labelName="Email"
              name="email"
              value={user?.user?.email || ""}
              disabled={true}
              onChange={handleChange}

            />
            <TextInput
              labelName="Phone"
              name="phone"
              value={user?.user?.phone || ""}
              disabled={!isEditable}
              onChange={handleChange}
            />
            <TextInput
              labelName="Username"
              name="username"
              value={user?.user?.username || ""}
              disabled={!isEditable}
              onChange={handleChange}
            />
           
          </div>
          <div className="btns mt-4 ">
            <Button2
              name={isEditable ? "Cancel" : "Edit"}
              onClick={() => setIsEditable((prev) => !prev)}
            />
            {isEditable && <Button2 name="Save" onClick={handleSave} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

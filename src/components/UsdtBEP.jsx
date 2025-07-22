import React from "react";
import img from "../assets/Animation.png";
import img1 from "../assets/Cam2.png";
import Usdtform from "./website/Usdtform";
import { bep20walletAddress } from "../api/user-api";
import Swal from "sweetalert2";

const UsdtBEP = () => {
  const bep20Submit = async (formData) => { // Add: Accept formData as parameter
    try {
      console.log("Submitting BEP-20 Form Data:", formData); // Add: Log form data
      const response = await bep20walletAddress(formData);
      console.log("BEP-20 API Response:", response); // Add: Log API response

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Wallet address updated successfully!",
          confirmButtonColor: "#22c55e",
        }).then(() => {
          // window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: response.message || "Something went wrong",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("BEP-20 Error Details:", error); // Add: Detailed error log
      const errorMessage = error.response?.data?.message || error.message || "Failed to update address. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: errorMessage, // Add: Better error message
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="w-full sm:h-full flex flex-col sm:flex-row relative">
      <div className="sm:flex-1 w-full sm:h-full relative">
        <div className="flex items-center">
          <img src={img1} alt="" className="w-[5rem] h-[5rem]" />
          <h5 className="text-2xl ml-4">USDT (BEP-20)</h5>
        </div>
        <img src={img} alt="" className="w-[20rem] right-0 bottom-0 absolute hidden md:block" />
      </div>
      <div className="sm:w-[47rem] p-[5rem] w-full h-full relative">
        <Usdtform onSubmit={bep20Submit} />
      </div>
    </div>
  );
};

export default UsdtBEP;
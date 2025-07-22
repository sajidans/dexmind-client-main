import React from "react";
import { trc20walletAddress } from "../api/user-api";
import img from "../assets/Animation.png";
import img2 from "../assets/Crypto Coins.png";
import Usdtform from "./website/Usdtform";
import Swal from "sweetalert2";

const UsdtTRC = () => {
  const trc20Submit = async (formData) => { // Add: Accept formData as parameter
    try {
      console.log("Submitting TRC-20 Form Data:", formData); // Add: Log form data
      const response = await trc20walletAddress(formData);
      console.log("TRC-20 API Response:", response); // Add: Log API response

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
      console.error("TRC-20 Error Details:", error); // Add: Detailed error log
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
    <div className="w-full min-h-screen flex flex-col sm:flex-row gap-4">
      {/* Left Section */}
     <div className="flex-1 flex flex-col items-center sm:items-start justify-between relative px-4 py-6 sm:px-8 sm:py-10">
  {/* Coin logo and title */}
  <div className="flex items-center w-full mb-6">
    <img
      src={img2}
      alt="Crypto Coin"
      className="w-14 h-14 sm:w-20 sm:h-20 hidden sm:block"
    />
    <h5 className="text-lg sm:text-2xl ml-4 font-semibold text-white">
      USDT (TRC-20)
    </h5>
  </div>

  {/* Decorative animation image, visible only on larger screens */}
  <img
    src={img}
    alt="Animation"
    className="w-40 sm:w-56 md:w-72 max-w-full h-auto object-contain mt-6 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 hidden sm:block"
  />
</div>


      {/* Right Section */}
      {/* <div className="flex-1 w-full max-w-3xl p-4 sm:p-8 lg:p-12 mx-auto">
      <Usdtform onSubmit={trc20Submit}/>
        </div> */}
      {/* right  */}
      <div className='sm:w-[47rem] p-[5rem] w-full h-full relative'>
        <Usdtform onSubmit={trc20Submit}/>
      </div>
    </div>
  );
};

export default UsdtTRC;
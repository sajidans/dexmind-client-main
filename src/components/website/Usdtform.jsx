import React, { useState } from "react";
import { bep20walletAddress, sendBep20Otp } from "../../api/user-api";
import Swal from "sweetalert2";

const Usdtform = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    loginPassword: "",
    emailCode: "",
    authOtp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const otpHandler = async () => {
    try {
      console.log("Requesting OTP..."); // Add: Log OTP request
      const res = await sendBep20Otp();
      console.log("OTP API Response:", res); // Add: Log OTP response
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: res.message || "OTP has been sent to your email.",
          confirmButtonColor: "#22c55e",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: res.message || "Unable to send OTP.",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("OTP Error Details:", error); // Add: Detailed error log
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong while sending OTP.";
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: errorMessage, // Add: Better error message
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div>
      <div className="card2 mx-auto my-auto p-8">
        <h2 className="text-white font-poppins text-[1.7875rem] font-semibold not-italic leading-none mb-4">
          Change Address
        </h2>

        <div className="card2 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form Data being submitted:", formData); // Add: Log form data before submitting
              onSubmit(formData); // Pass formData to parent
            }}
            className="space-y-4 w-full"
          >
            <div>
              <label className="text-white text-lg font-medium block mb-1">
                Wallet address
              </label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="text-white text-lg font-medium block mb-1">
                Login password
              </label>
              <input
                type="password"
                name="loginPassword"
                value={formData.loginPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="text-white text-lg font-medium block mb-1">
                Email code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="emailCode"
                  value={formData.emailCode}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
                />
                <button
                  type="button"
                  className="regadiant-btn"
                  onClick={otpHandler}
                >
                  GET OTP
                </button>
              </div>
            </div>

            <div>
              <label className="text-white text-lg font-medium block mb-1">
                Google verification
              </label>
              <input
                type="text"
                name="authOtp"
                value={formData.authOtp}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
              />
            </div>

            <button type="submit" className="regadiant-btn w-full">
              CONNECT
            </button>
          </form>
        </div>

        <div className="card2 mt-4">
          <h5 className="text-bold text-[1.2rem] text-center">
            After changing the address, the withdrawal service will be Disabled
            for 96 Hours to protect your account.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Usdtform;
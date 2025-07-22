import  { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { sendWithdrawalOtp, submitWithdrawalApi } from '../api/user-api';

import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Withdrawalnew = () => {
  const [isOtpDisabled, setIsOtpDisabled] = useState(false);
const [otpTimer, setOtpTimer] = useState(0);
const [showPassword, setShowPassword] = useState(false);

  const userInfo = useSelector(store => store?.userInfo?.userInfo?.user);
  console.log(userInfo)
  
  const [formData, setFormData] = useState({
    userWalletAddress: userInfo?.walletAddress,
    loginPassword: '',
    amount: '',
    otp: '',
    options: 'mainWallet', // default selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAllWithdrawal = () => {
    const selectedWallet =
      formData.options === 'mainWallet' ? userInfo?.mainWallet : userInfo?.additionalWallet;
    setFormData(prev => ({
      ...prev,
      amount: selectedWallet || '',
    }));
  };

  const otpHandler = async () => {
    try {
      const response = await sendWithdrawalOtp();
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          text: response?.message || "OTP has been sent to your email/phone.",
          background: "#2e2e2e",
          color: "#ffffff",
          confirmButtonColor: "#3085d6",
        });
  
        // Disable button for 30 seconds
        setIsOtpDisabled(true);
        setOtpTimer(30);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response?.message || "Something went wrong.",
          background: "#2e2e2e",
          color: "#ffffff",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "API call failed.",
        background: "#2e2e2e",
        color: "#ffffff",
        confirmButtonColor: "#d33",
      });
    }
  };
  

  const submitWithdrawal = async () => {
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we process your withdrawal.",
      background: "#2e2e2e",
      color: "#ffffff",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });



    const payload = {
      amount: formData.amount,
      userWalletAddress: formData.userWalletAddress,
      loginPassword: formData.loginPassword,
      otp: formData.otp,
      options: formData.options,
    };

    try {
      const response = await submitWithdrawalApi(payload);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Withdrawal Successful!",
          text: response?.message || "Your request has been processed.",
          background: "#2e2e2e",
          color: "#ffffff",
          confirmButtonColor: "#3085d6",
        });

        setFormData({
          userWalletAddress: userInfo?.walletAddress,
          loginPassword: '',
          amount: '',
          otp: '',
          options: 'mainWallet',
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response?.message || "Withdrawal failed. Please try again.",
          background: "#2e2e2e",
          color: "#ffffff",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong.",
        background: "#2e2e2e",
        color: "#ffffff",
        confirmButtonColor: "#d33",
      });
    }
    // window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWithdrawal();
  };
  useEffect(() => {
    let interval;
    if (isOtpDisabled && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsOtpDisabled(false);
    }
  
    return () => clearInterval(interval);
  }, [isOtpDisabled, otpTimer]);
  

  return (
    <div className='w-full flex flex-col sm:flex-row relative'>
      {/* left */}
      <div className='flex-1 h-full sm:mr-[5rem]'>
        <div className="card2">
          <div className='w-full flex items-center justify-between'>
            <h4 className='text-xl font-bold'>Available Balance</h4>
            <button className="regadiant-btn w-[20rem] text-2xl">{userInfo?.mainWallet}</button>
          </div>
          <div className='w-full flex items-center justify-between mt-4'>
            <h4 className='text-xl font-bold'>Minimum Withdrawal</h4>
            <button className="regadiant-btn w-[20rem] text-2xl">10 USDT</button>
          </div>
        </div>
      </div>

      {/* right */}
      <div className='sm:w-[35rem] w-full mt-8 sm:mt-0 h-full relative'>
        <div className="card2 mx-auto my-auto p-8">
          <h2 className='text-white font-poppins text-[1.7875rem] font-semibold not-italic leading-none mb-4'>
            Withdraw
          </h2>

          <div className="card2 w-full">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {/* Wallet Address */}
              <div>
                <label className="text-white text-lg font-medium block mb-1">Wallet address</label>
                <input
  type="text"
  name="userWalletAddress"
  value={formData.userWalletAddress = userInfo?.walletAddress || ''}
  readOnly
  className="w-full text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400 cursor-not-allowed"
/>

              </div>

              {/* Amount USDT */}
              <div>
                <label className="text-white text-lg font-medium block mb-1">Amount USDT</label>
                <div className='flex gap-4'>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min={10}
                    className="w-1/2 text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
                  />
                  <button
                    type="button"
                    className="regadiant-btn w-1/2"
                    onClick={handleAllWithdrawal}
                  >
                    All Withdrawal
                  </button>
                </div>
              </div>

              {/* Wallet Option */}
              <div>
                <label className="text-white text-lg font-medium block mb-1">Select Wallet</label>
                <select
                  name="options"
                  value={formData.options}
                  onChange={handleChange}
                  className="w-full text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
                >
                  <option value="mainWallet">Main Wallet</option>
                  <option value="additionalWallet">Additional Wallet</option>
                </select>
              </div>

              {/* Login Password */}
              {/* <div>
                <label className="text-white text-lg font-medium block mb-1">Login Password</label>
                <input
                  type="password"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                  required
                  className="w-full text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
                />
              </div> */}

              <div className="relative">
  <label className="text-white text-lg font-medium block mb-1">Login Password</label>
  <input
    type={showPassword ? "text" : "password"}
    name="loginPassword"
    value={formData.loginPassword}
    onChange={handleChange}
    required
    className="w-full text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-12 transform -translate-y-1/4 text-gray-300 hover:text-gray-200 text-lg"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

              {/* Email Code */}
              <div>
                <label className="text-white text-lg font-medium block mb-1">Email code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="flex-1 text-lg px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-green-400"
                  />
               <button
  type="button"
  className="regadiant-btn"
  onClick={otpHandler}
  disabled={isOtpDisabled}
>
  {isOtpDisabled ? `Retry in ${otpTimer}s` : 'GET OTP'}
</button>

                </div>
              </div>

              {/* Buttons */}
              <div className='flex gap-4'>
                <button
                  type="button"
                  className="border rounded-md border-[#01EBE0] text-[#01EBE0] text-lg w-1/2"
                  onClick={() => console.log("Cancel clicked")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="regadiant-btn text-lg w-1/2"
                >
                  Withdrawal
                </button>
              </div>
            </form>
          </div>

          {/* Notes */}
          <div className="card2 mt-4">
            <h5 className='font-bold text-[1.2rem]'>
              <span className="inline-block mr-2 w-2 h-2 bg-[#01EBE0] rounded-full"></span>
              The second withdrawal can only be initiated after the first withdrawal has been credited.
            </h5>
            <h5 className='font-bold text-[1.2rem]'>
              <span className="inline-block w-2 mr-2 h-2 bg-[#01EBE0] rounded-full"></span>
              Funds will be credited within 96 hours of withdrawal.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawalnew;

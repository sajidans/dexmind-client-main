/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import { verifyOtp } from "../../api/auth-api";
import { sendOtpValidateEmail } from "../../api/user-api";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VerifyOtpForm = () => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ⏱ Resend OTP timer state
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowResend(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let interval;
    if (isCounting) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setShowResend(true);
            setIsCounting(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCounting]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getOtp = () => otpDigits.join("");

  const validate = () => {
    const otpValue = getOtp();
    const email = localStorage.getItem("email");

    if (!email) {
      setError("No email found. Please try again.");
      return false;
    }

    const emailError = emailValidator(email);
    if (emailError) {
      setError(emailError);
      return false;
    }

    if (otpDigits.includes("") || otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return false;
    }

    const passwordError = passwordValidator(password);
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    setError("");
    return true;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const email = localStorage.getItem("email");

      const data = await verifyOtp({
        email,
        otp: getOtp(),
        password,
      });

      if (data?.success) {
        localStorage.removeItem("email");
        SwalSuccess.fire({
          icon: "success",
          title: "OTP Verified",
          text: data.message || "OTP verified successfully and Password reset Successfully",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(AuthRoutes.LOGIN);
        });
      }
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Verification Failed",
        text: error?.data?.message || "Failed to verify OTP or set password. Please try again.",
      });
      setOtpDigits(["", "", "", "", "", ""]);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    if (!email) {
      SwalError.fire({
        icon: "error",
        title: "Email Not Found",
        text: "Please get back to previous page and try again.",
      });
      return;
    }

    setLoading(true);
    try {
      const emailData = await sendOtpValidateEmail({ email });

      if (emailData?.success) {
        SwalSuccess.fire({
          icon: "success",
          title: "OTP Sent",
          text: "OTP has been sent successfully to your email.",
        });

        setShowResend(false);
        setIsCounting(true);
        setTimer(30);
      }
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Failed to Send OTP",
        text: error?.response?.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="text-white">
        <h2 className="text-center text-[2rem] font-semibold" data-aos="fade-up">
          Verify OTP
        </h2>

        <form
          onSubmit={handleVerifyOtp}
          className="input-container flex flex-col justify-center items-center bg-[#25272D] p-10 my-10 rounded-[1.875rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
          data-aos="fade-up"
        >
          <div className="flex gap-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleBackspace(idx, e)}
                maxLength={1}
                disabled={loading}
                ref={(el) => (inputRefs.current[idx] = el)}
                className="w-16 h-16 text-xl text-center rounded-md border-2 border-[#4c4c4f] bg-[#393d49] text-white focus:outline-none focus:ring-1 focus:ring-[#45C66F] focus:border-[#45C66F]"
              />
            ))}
          </div>

          <div className="mt-6 w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={loading}
              className="w-full p-3 text-xl rounded-md border-2 border-[#4c4c4f] bg-[#393d49] text-white focus:outline-none focus:ring-1 focus:ring-[#45C66F] focus:border-[#45C66F]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={loading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70 hover:opacity-100 disabled:opacity-50"
            >
              {showPassword ? <FaEyeSlash className="text-2xl" /> : <FaEye className="text-2xl" />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xl mt-4">{error}</p>}

          <Button2
            name="Reset Password"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="!bg-[#45C66F] mt-6"
          />

          {showResend ? (
            <Button2
              name="Resend OTP"
              onClick={resendOTP}
              disabled={loading}
              className="!bg-[#45C66F] mt-4"
            />
          ) : (
            isCounting && (
              <p className="text-white  text-center  mt-4">
                Resend OTP in <span className="font-bold  text-[#45C66F]">{timer}s</span>
              </p>
            )
          )}
        </form>
      </div>
    </>
  );
};

export default VerifyOtpForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpValidateEmail } from "../../api/user-api";
import { AuthRoutes } from "../../constants/Routes";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { emailValidator } from "../../utils/inputValidator";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import TextInput from "../ui/TextInput";
const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const emailError = emailValidator(email);
    if (emailError) {
      setErrors({ email: emailError });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // console.log("Sending OTP to email:", emailData);
    if (!validate()) return;

    setLoading(true);
    try {
      localStorage.setItem("email", email);
      console.log("hello")
      const emailData = await sendOtpValidateEmail({ email });
      if (emailData?.success) {
        SwalSuccess.fire({
          icon: "success",
          title: "OTP Sent",
          text: "OTP has been sent successfully to your email.",
        });
        
        navigate(AuthRoutes.VERIFY_OTP);
      }

      // Redirect after successful OTP verification
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Failed to Send OTP",
        text: error?.response?.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  // const handleRendOTP = async (e) => {
  //   e.preventDefault();

  //   // console.log("Sending OTP to email:", emailData);
  //   if (!validate()) return;

  //   setLoading(true);
  //   try {
  //     localStorage.setItem("email", email);
  //     console.log("hello")
  //     const emailData = await sendOtpValidateEmail({ email });
  //     if (emailData?.success) {
  //       SwalSuccess.fire({
  //         icon: "success",
  //         title: "OTP Sent",
  //         text: "OTP has been sent successfully to your email.",
  //       });
        
  //       navigate(AuthRoutes.VERIFY_OTP);
  //     }

  //     // Redirect after successful OTP verification
  //   } catch (error) {
  //     console.log(error);
  //     SwalError.fire({
  //       icon: "error",
  //       title: "Failed to Send OTP",
  //       text: error?.response?.data.message || error.message,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {loading && <PageLoader />}
      <div>
        <h5
          className="text-white text-center text-[2.0945rem] font-semibold leading-none font-sofia"
          data-aos="fade-up"
        >
          Welcome to{" "}
          <span className="text-[#45C66F]">zentor</span>
        </h5>

        <div
          data-aos="fade-up"
          className="input-container flex flex-col justify-center items-center bg-[#25272D] p-10 my-10 rounded-[1.875rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
        >
          <TextInput
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={errors.email}
            disabled={loading}
            className="rounded-md border-2 border-[#313132] bg-[#393d49] opacity-80"
            onKeyDown={(e) => e.key === "Enter" && handleSendOTP(e)}
          />

          <Button2
            name="Send OTP"
            onClick={handleSendOTP}
            disabled={loading}
            className="!bg-[#45C66F] mt-4"
          />

          {/* <Button2
            name="Resend OTP"
            onClick={handleSendOTP}
            disabled={loading}
            className="!bg-[#45C66F] mt-4"
          /> */}
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;

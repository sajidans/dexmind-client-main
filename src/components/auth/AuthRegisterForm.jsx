// import { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import { registerUser, verifyRegisterOtp } from "../../api/auth-api";
// import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
// import { SwalError } from "../../utils/custom-alert";
// import { Button2 } from "../ui/Buttons";
// import PageLoader from "../ui/PageLoader";
// import TextInput from "../ui/TextInput";
// import "react-phone-input-2/lib/style.css";

// const AuthRegisterForm = () => {
//   const navigate = useNavigate();
//   const { search } = useLocation();

//   const [payload, setPayload] = useState({
//     name: "",
//     lastname: "",
//     email: "",
//     mobile: "",
//     countryCode: "+91",
//     password: "",
//     confirmPassword: "",
//     referredBy: "",
//     isAdult: false,
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(search);
//     const referralCode = params.get("referral") || "";
//     setPayload((prev) => ({ ...prev, referredBy: referralCode }));
//   }, [search]);


//   const handleNavigate = () => {
//     navigate(AuthenticatedRoutes.USER_DASHBOARD);
//     window.location.reload();
//   };

//   const handleSubmit = async () => {
//     if (loading) return;

//     const {
//       name,
//       lastname,
//       email,
//       mobile,
//       password,
//       confirmPassword,
//       isAdult,
//       referredBy,
//       countryCode,
//     } = payload;

//     if (!name || !lastname || !email || !mobile || !password || !confirmPassword) {
//       SwalError.fire({
//         icon: "error",
//         title: "Missing Fields",
//         text: "Please fill in all required fields.",
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       SwalError.fire({
//         icon: "error",
//         title: "Password Mismatch",
//         text: "Passwords do not match.",
//       });
//       return;
//     }

//     if (!isAdult) {
//       SwalError.fire({
//         icon: "error",
//         title: "Age Confirmation Required",
//         text: "You must confirm you're an adult.",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await registerUser({
//         name: `${name} ${lastname}`,
//         phone: `${countryCode}${mobile}`,
//         email: email.trim().toLowerCase(),
//         password: password.trim(),
//         referredBy: referredBy?.trim(),
//       });

//       await Swal.fire({
//         icon: "success",
//         title: "OTP Sent Successfully!",
//         text: "Check your email for the OTP.",
//         timer: 2000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });

//       let verified = false;
//       while (!verified) {
//         const { value: otp } = await Swal.fire({
//           title: "Enter OTP",
//           input: "text",
//           inputLabel: "Check your email and enter the OTP",
//           inputPlaceholder: "Enter OTP here",
//           showCancelButton: true,
//           inputAttributes: {
//             maxlength: 6,
//             autocapitalize: "off",
//             autocorrect: "off",
//           },
//         });

//         if (!otp) {
//           SwalError.fire({
//             icon: "error",
//             title: "No OTP Entered",
//             text: "Please enter the OTP to complete registration!",
//           });
//           return;
//         }

//         try {
//           const otpResponse = await verifyRegisterOtp({ email, otp });
//           localStorage.setItem("token", otpResponse.token);
//           localStorage.setItem("role", "User");

//           await Swal.fire({
//             icon: "success",
//             title: "Registration Complete!",
//             text: "You have been successfully registered and verified!",
//             timer: 2000,
//             timerProgressBar: true,
//           });

//           verified = true;
//           handleNavigate();
//         } catch (otpError) {
//           SwalError.fire({
//             icon: "error",
//             title: "Invalid OTP",
//             text:
//               otpError?.response?.data?.message || "OTP is incorrect, please try again.",
//           });
//         }
//       }
//     } catch (error) {
//       SwalError.fire({
//         icon: "error",
//         title: "Registration Failed",
//         text: error?.response?.data?.message || error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <PageLoader />}
//       <div className="mx-auto">
//         <h5
//           className="text-white text-center my-12 text-3xl font-semibold font-sofia"
//           data-aos="fade-up"
//         >
//           Welcome to <span className="text-[#45C66F]">zentor</span>
//         </h5>

//         <div className="bg-[#1e1f26] max-w-xl mx-auto p-6 rounded-[2rem] mb-20">
//           <p className="text-center text-2xl mb-4">Enter Account Details</p>

//           <div className="input-container space-y-2">
//             <TextInput
//               value={payload.name}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, name: e.target.value }))
//               }
//               placeholder="Enter First Name"
//             />
//             <TextInput
//               value={payload.lastname}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, lastname: e.target.value }))
//               }
//               placeholder="Enter Last Name"
//             />
//             <TextInput
//               value={payload.email}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, email: e.target.value }))
//               }
//               placeholder="Enter Email"
//             />
//             <TextInput
//               type="number"
//               value={payload.mobile}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, mobile: e.target.value }))
//               }
//               placeholder="Enter phone number"
//             />
//             <TextInput
//               type="password"
//               value={payload.password}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, password: e.target.value }))
//               }
//               placeholder="Create Password"
//               className="!bg-[#2b2e39]"
//             />
//             <TextInput
//               type="password"
//               value={payload.confirmPassword}
//               onChange={(e) =>
//                 setPayload((prev) => ({
//                   ...prev,
//                   confirmPassword: e.target.value,
//                 }))
//               }
//               placeholder="Confirm Password"
//               className="!bg-[#2b2e39]"
//             />
//             <TextInput
//               value={payload.referredBy}
//               onChange={(e) =>
//                 setPayload((prev) => ({
//                   ...prev,
//                   referredBy: e.target.value,
//                 }))
//               }
//               placeholder="Enter Referral Code (Optional)"
//               className="!bg-[#2b2e39]"
//             />
//           </div>

//           <div className="flex items-center space-x-2 mt-4">
//             <input
//               type="checkbox"
//               id="adult"
//               className="accent-green-500"
//               checked={payload.isAdult}
//               onChange={(e) =>
//                 setPayload((prev) => ({ ...prev, isAdult: e.target.checked }))
//               }
//             />
//             <label htmlFor="adult" className="text-lg font-semibold text-white">
//               I am an adult
//             </label>
//           </div>

//           <div className="btns w-full mt-6">
//             <Button2
//               onClick={handleSubmit}
//               name={"Register"}
//               disabled={loading}
//               className="!bg-green-500"
//             />
//           </div>

//           <p className="text-white text-center mt-4 text-lg font-semibold font-sofia">
//             Already have an account? &nbsp;
//             <Link to={AuthRoutes.LOGIN} className="text-[#45C66F] hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthRegisterForm;





import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser, verifyRegisterOtp } from "../../api/auth-api";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { SwalError } from "../../utils/custom-alert";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import TextInput from "../ui/TextInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";

const AuthRegisterForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [payload, setPayload] = useState({
    name: "",
    lastname: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    password: "",
    confirmPassword: "",
    referredBy: "",
    isAdult: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const referralCode = params.get("referralCode") || "";
    setPayload((prev) => ({ ...prev, referredBy: referralCode }));
  }, [search]);

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.USER_DASHBOARD);
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (loading) return;

    const {
      name,
      lastname,
      email,
      mobile,
      password,
      confirmPassword,
      isAdult,
      referredBy,
      countryCode,
    } = payload;

    if (!name || !lastname || !email || !mobile || !password || !confirmPassword) {
      SwalError.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      SwalError.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    if (!isAdult) {
      SwalError.fire({
        icon: "error",
        title: "Age Confirmation Required",
        text: "You must confirm you're an adult.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name: `${name} ${lastname}`,
        phone: `${countryCode}${mobile}`,
        email: email.trim().toLowerCase(),
        password: password.trim(),
        referredBy: referredBy?.trim(),
      });

      await Swal.fire({
        icon: "success",
        title: "OTP Sent Successfully!",
        text: "Check your email for the OTP.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      let verified = false;
      while (!verified) {
        const { value: otp } = await Swal.fire({
          title: "Enter OTP",
          input: "text",
          inputLabel: "Check your email and enter the OTP",
          inputPlaceholder: "Enter OTP here",
          showCancelButton: true,
          inputAttributes: {
            maxlength: 6,
            autocapitalize: "off",
            autocorrect: "off",
          },
        });

        if (!otp) {
          SwalError.fire({
            icon: "error",
            title: "No OTP Entered",
            text: "Please enter the OTP to complete registration!",
          });
          return;
        }

        try {
          const otpResponse = await verifyRegisterOtp({ email, otp });
          localStorage.setItem("token", otpResponse.token);
          localStorage.setItem("role", "User");

          await Swal.fire({
            icon: "success",
            title: "Registration Complete!",
            text: "You have been successfully registered and verified!",
            timer: 2000,
            timerProgressBar: true,
          });

          verified = true;
          handleNavigate();
        } catch (otpError) {
          SwalError.fire({
            icon: "error",
            title: "Invalid OTP",
            text:
              otpError?.response?.data?.message || "OTP is incorrect, please try again.",
          });
        }
      }
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="mx-auto">
        <h5
          className="text-white text-center my-12 text-3xl font-semibold font-sofia"
          data-aos="fade-up"
        >
          Welcome to <span className="text-[#45C66F]">Dexmind</span>
        </h5>

        <div className="bg-[#1e1f26] max-w-xl mx-auto p-6 rounded-[2rem] mb-20">
          <p className="text-center text-2xl mb-4">Enter Account Details</p>

          <div className="input-container space-y-2">
            <TextInput
              value={payload.name}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter First Name"
            />
            <TextInput
              value={payload.lastname}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, lastname: e.target.value }))
              }
              placeholder="Enter Last Name"
            />
            <TextInput
              value={payload.email}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter Email"
            />
            <TextInput
              type="number"
              value={payload.mobile}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, mobile: e.target.value }))
              }
              placeholder="Enter phone number"
            />
            <div className="relative w-full">
              <TextInput
                type={showPassword ? "text" : "password"}
                value={payload.password}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Create Password"
                className="!bg-[#2b2e39]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 text-3xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative w-full">
              <TextInput
                type={showConfirmPassword ? "text" : "password"}
                value={payload.confirmPassword}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm Password"
                className="!bg-[#2b2e39]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 text-3xl"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <TextInput
              value={payload.referredBy}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  referredBy: e.target.value,
                }))
              }
              placeholder="Enter Referral Code (Optional)"
              className="!bg-[#2b2e39]"
              readOnly={!!payload.referredBy}
            />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="adult"
              className="accent-green-500"
              checked={payload.isAdult}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, isAdult: e.target.checked }))
              }
            />
            <label htmlFor="adult" className="text-lg font-semibold text-white">
              I am an adult
            </label>
          </div>

          <div className="btns w-full mt-6">
            <Button2
              onClick={handleSubmit}
              name={"Register"}
              disabled={loading}
              className="!bg-green-500"
            />
          </div>

          <p className="text-white text-center mt-4 text-lg font-semibold font-sofia">
            Already have an account?  
            <Link to={AuthRoutes.LOGIN} className="text-[#45C66F] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthRegisterForm;
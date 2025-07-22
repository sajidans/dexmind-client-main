/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginWithUserIDApi } from "../../api/auth-api";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import TextInput from "../ui/TextInput";
import TextInputPassword from "../ui/TextInputPassword";


const AuthLoginForm = () => {
  const dispatch = useDispatch();
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setLoginPayload((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    const emailError = emailValidator(loginPayload.email);
    const passwordError = passwordValidator(loginPayload.password);

    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLoginSubmit = async () => {
    if (!validate()) return;
    if (loading) return;
    setLoading(true);

    try {
      const response = await loginWithUserIDApi({
        email: loginPayload.email.trim().toLowerCase(),
        password: loginPayload.password,
      });

      SwalSuccess.fire({
        icon: "success",
        title: "Login Success",
        text: "You have logged in successfully",
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "User");
      dispatch(setUserInfo(response?.data));


      if (rememberMe) {
        localStorage.setItem("savedEmail", loginPayload.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      setTimeout(() => {
        handleNavigate();
      }, 2000);
    } catch (error) {
      console.log("Login error:", error?.response?.data || error.message);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.USER_DASHBOARD);
    window.location.reload();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="">
        <h5
          className="text-white text-center mx-auto text-[2.0945rem] font-semibold leading-none font-sofia"
          data-aos="fade-up"
        >
          Welcome to{" "}
          <span className="text-[#45C66F] font-semibold text-[2.0945rem] leading-none font-sofia">
            zentor
          </span>
        </h5>

        <div
          data-aos="fade-up"
          className="input-container justify-center flex-col items-center bg-[#25272D] p-10 my-10 rounded-[1.875rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
        >
          <TextInput
            onChange={(e) =>
              setLoginPayload({
                ...loginPayload,
                email: e.target.value,
              })
            }
            value={loginPayload.email}
            placeholder="Email / Username"
            error={errors.email}
            disabled={loading}
            className="rounded-md border-2 border-[#313132] bg-[#2A2D37] opacity-80"
            onKeyDown={(e) => e.key === "Enter" && handleLoginSubmit()}
          />

          <TextInputPassword
            value={loginPayload.password}
            onChange={(e) =>
              setLoginPayload({
                ...loginPayload,
                password: e.target.value,
              })
            }
            placeholder="Password"
            error={errors.password}
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && handleLoginSubmit()}
          />

          {/* forget password */}
          <div className="flex items-center w-full justify-end space-x-2 mt-2 mb-2">
            <Link to={AuthRoutes.FORGET_PASSWORD} className="text-lg font-semibold text-white"
            >Forget Your Password?
            </Link>
          </div>

          <Button2
            onClick={handleLoginSubmit}
            name="SIGN IN"
            disabled={loading}
            className="!bg-[#45C66F]"
          />

          <span className="accontToggle text-white text-[1.125rem] font-semibold leading-none font-sofia text-center mt-4">
            Not a member? &nbsp;&nbsp;
            <Link
              to={AuthRoutes.REGISTER}
              className="text-[#45C66F] text-[1.125rem] font-semibold leading-none font-sofia"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default AuthLoginForm;

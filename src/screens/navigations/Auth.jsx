import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
import AuthMain from "../../components/auth/AuthMain";
import AuthRegisterForm from "../../components/auth/AuthRegisterForm";
import AuthLoginForm from "../../components/auth/AuthLoginForm";
import UserMain from "../website/UserMain";
import AuthAdminLoginForm from "../../components/auth/AuthAdminLoginForm";
import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";
import VerifyOtpForm from "../../components/auth/VerifyOtpForm";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
const Auth = () => {
  return (
    <>
      <Routes>
        <Route
          path={AuthRoutes.LOGIN}
          element={<AuthMain inner={<AuthLoginForm />} />}
        />
        <Route
          path={AuthRoutes.ADMIN_LOGIN}
          element={<AuthMain inner={<AuthAdminLoginForm />} />}
        />
        <Route
          path={AuthRoutes.REGISTER}
          element={<AuthMain inner={<AuthRegisterForm />} />}
        />
        <Route
          path={AuthRoutes.FORGET_PASSWORD}
          element={<AuthMain inner={<ForgetPasswordForm />} />}
        />
        <Route
          path={AuthRoutes.VERIFY_OTP}
          element={<AuthMain inner={<VerifyOtpForm />} />}
        />
        <Route
          path={AuthRoutes.RESET_PASSWORD}
          element={<AuthMain inner={<ResetPasswordForm />} />}
        />

        {/* <Route path="*" element={<AuthMain inner={<AuthLoginForm />} />} /> */}
        <Route path="*" element={<UserMain />} />
      </Routes>
    </>
  );
};

export default Auth;

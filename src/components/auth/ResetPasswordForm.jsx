import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputPassword from "../ui/TextInputPassword";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import { AuthenticatedRoutes } from "../../constants/Routes";

const ResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let formErrors = {};
        let isValid = true;

        if (!newPassword || newPassword.length < 6) {
            formErrors.newPassword = "Password must be at least 6 characters";
            isValid = false;
        }

        if (confirmPassword !== newPassword) {
            formErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // 🔁 Replace with your reset password API logic
            SwalSuccess.fire({
                icon: "success",
                title: "Password Reset",
                text: "Your password has been updated successfully!",
            });

            navigate(AuthenticatedRoutes.USER_DASHBOARD);
            window.location.reload();
        } catch (error) {
            SwalError.fire({
                icon: "error",
                title: "Reset Failed",
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
                    Reset Password
                </h2>

                <form
                    onSubmit={handleResetPassword}
                    className="input-container flex flex-col justify-center items-center bg-[#25272D] p-10 my-10 rounded-[1.875rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
                    data-aos="fade-up"
                >
                    <TextInputPassword
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        error={errors.newPassword}
                        disabled={loading}
                        className="rounded-md border-2 border-[#313132] bg-[#393d49] opacity-80"
                    />

                    <TextInputPassword
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        error={errors.confirmPassword}
                        disabled={loading}
                        className="rounded-md border-2 border-[#313132] bg-[#393d49] opacity-80 mt-4"
                    />

                    <Button2
                        type="submit"
                        name="Reset Password"
                        disabled={loading}
                        className="!bg-[#45C66F] mt-6"
                    />
                </form>
            </div>
        </>
    );
};

export default ResetPasswordForm;

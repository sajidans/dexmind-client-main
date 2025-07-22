import { useState } from "react";
import { ChangeRefrelPercentage } from "../../api/admin-api";
import Swal from "sweetalert2"; // Import SweetAlert2

const CommissionSetter = () => {
    const [commission, setCommission] = useState(5); // Default commission at 5%
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle commission input change
    const handleCommissionChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and decimals, ensure value is between 0 and 100
        if (value === "" || (/^\d*\.?\d*$/.test(value) && value >= 0 && value <= 100)) {
            setCommission(value);
            setError("");
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (commission === "" || commission < 0 || commission > 100) {
            setError("Referral percentage must be between 0 and 100");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                percentage: Number(commission), // Changed to match backend expectation
            };

            console.log(payload);

            // Call the ChangeRefrelPercentage API
            const response = await ChangeRefrelPercentage(payload);
            console.log(response);
            if (response?.success) {
                // Show SweetAlert2 success popup
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: response?.message || "Referral percentage set successfully!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#16a34a", // Tailwind green-600
                });
                setCommission(5); // Reset to default
            } else {
                setError(response?.message || "Failed to set referral percentage");
            }
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                error.message ||
                "An error occurred while setting the referral percentage"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-black/95 rounded-2xl shadow-xl p-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
                    Set Referral Percentage
                </h2>

                <div className="mb-10">
                    <label className="block text-xl md:text-2xl font-medium text-gray-300 mb-4">
                        Referral Percentage (%)
                    </label>
                    <input
                        type="number"
                        value={commission}
                        onChange={handleCommissionChange}
                        placeholder="Enter referral percentage"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full p-4 bg-gray-800 text-white text-xl md:text-2xl rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-lg md:text-xl mb-8 text-center">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-4 px-8 rounded-lg text-white text-xl md:text-2xl font-semibold ${
                        loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    } transition-colors`}
                >
                    {loading ? "Setting Percentage..." : "Set Referral Percentage"}
                </button>
            </div>
        </div>
    );
};

export default CommissionSetter;
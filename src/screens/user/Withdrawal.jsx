import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import { SwalError } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { sendWithdrawalresponse } from "../../api/payment-api";

const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const MIN_WITHDRAWAL_AMOUNT = 20;
  const PLATFORM_FEE_PERCENT = 10;
  const platformFee = (amount * PLATFORM_FEE_PERCENT) / 100;
  const netAmount = amount - platformFee;

  const handleWithdrawClick = async () => {
    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      return SwalError.fire({
        title: "Error",
        text: `Amount must be at least $${MIN_WITHDRAWAL_AMOUNT}`,
        confirmButtonText: "OK",
        timer: 4000,
      });
    } else if (amount > userInfo?.user?.currentEarnings) {
      return SwalError.fire({
        title: "Error",
        text: `Insufficient Wallet Balance`,
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask or SafePal wallet not found.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setLoading(true);
      const response = await sendWithdrawalresponse({
        amount,
        userWalletAddress: userAddress,
      });

      // ✅ Fix response structure handling
      const resData = response|| response;
      console.log(resData);

      if (resData?.success) {
        Swal.fire({
          icon: "success",
          title: "Withdraw Successful",
          text: `Transaction initiated for ${netAmount} USDT.`,
          confirmButtonText: "Ok",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        throw new Error(resData?.message || "Withdrawal failed.");
      }
    } catch (error) {
      console.error("Withdrawal Error:", error);
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong.",
        timer: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">
              Main Wallet: $
              {userInfo?.data?.currentEarnings?.toFixed(2) || 0}
            </h5>
          </div>
          <div className="input-container">
            <TextInput
              onChange={(e) =>
                setAmount(parseFloat(e.target.value) || 0)
              }
              placeholder={"Enter Amount"}
              labelName="Amount"
              value={amount}
            />
            <div
              style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}
            >
              <div style={{ color: "white", padding: "10px" }}>
                Platform Fee (10%): ${platformFee.toFixed(2)}
              </div>
              <div style={{ color: "white", padding: "10px" }}>
                Net You Receive: ${netAmount.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="btns">
            <Button5 onClick={handleWithdrawClick} name={"Withdraw"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;

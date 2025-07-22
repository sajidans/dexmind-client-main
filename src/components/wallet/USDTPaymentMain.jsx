import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import { buyPlanPackage } from "../../api/user-api";

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const USDTPaymentMain = ({ amount, onSuccess, onFailure, walletType }) => {
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");

  // Set recipient address from env on mount
  useEffect(() => {
    const addr = import.meta.env.VITE_PAYMENT_ADDRESS;
    console.log("Recipient Address from ENV:", addr);
    setRecipientAddress(addr || "");
  }, []);

  // Update investment amount when amount prop changes
  useEffect(() => {
    if (!amount || isNaN(amount)) return;
    console.log("Amount received in USDTPaymentMain:", amount);
    setInvestmentAmount(amount);
  }, [amount]);

  // Check pendingTx on load
  useEffect(() => {
    const savedTx = localStorage.getItem("pendingTx");
    if (savedTx) {
      const parsed = JSON.parse(savedTx);
      console.log("Found pendingTx in localStorage:", parsed);
      transactionHandler({
        txResponse: parsed.txHash,
        investmentAmount: parsed.investmentAmount,
        walletAddress: parsed.walletAddress,
      })
        .then(onSuccess)
        .catch((error) => {
          if (error.response?.status === 409 || error.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Duplicate Transaction",
              text: error?.message || "This transaction has already been processed.",
              background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
              color: "#fff",
            });
          } else {
            onFailure();
          }
        })
        .finally(() => {
          localStorage.removeItem("pendingTx");
        });
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask or SafePal is not installed.",
          background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
          color: "#fff",
        });
        return;
      }

      if (walletType === "safepal") {
        const isSafePal = window.ethereum.isSafePal || navigator.userAgent.toLowerCase().includes("safepal");
        if (!isSafePal) throw new Error("Please use SafePal wallet.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // BSC Mainnet
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x38",
              chainName: "Binance Smart Chain",
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: ["https://bsc-dataseed1.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com/"],
            }],
          });
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected wallet address:", userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
        background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
        color: "#fff",
      });
    }
  };

  const transactionHandler = async (payload) => {
    try {
      console.log("Calling API with payload:", payload);
      await buyPlanPackage(payload);
      localStorage.removeItem("pendingTx");

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${payload.investmentAmount} USDT.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) window.location.reload();
      });
    } catch (error) {
      console.error("Error during buyPlanPackage API:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    console.log('handlePayment clicked');
    if (!recipientAddress) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please enter a valid recipient address",
        background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
        color: "#fff",
      });
      return;
    }

    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("MetaMask or SafePal is not installed.");

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x38") throw new Error("Please connect to BSC network first");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("User Address:", userAddress);

      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

      const decimals = await usdtContract.decimals();
      const balance = await usdtContract.balanceOf(userAddress);
      const amountInUSDT = ethers.parseUnits(investmentAmount.toString(), decimals);

      console.log("User USDT balance:", ethers.formatUnits(balance, decimals));
      console.log("Amount to send:", investmentAmount);

      if (balance < amountInUSDT) throw new Error("Insufficient USDT balance");

      const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
      console.log("Transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction confirmed");

      localStorage.setItem("pendingTx", JSON.stringify({
        txHash: tx.hash,
        investmentAmount: investmentAmount,
        walletAddress: userAddress,
      }));

      await transactionHandler({
        txResponse: tx.hash,
        investmentAmount: investmentAmount,
        walletAddress: userAddress,
      });

      onSuccess();
    } catch (error) {
      console.error("Error during USDT transfer:", error);
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text: error.message || "Transfer failed. Please try again.",
        background: "linear-gradient(135deg, #2F4F4F, #1c1c1c)",
        color: "#fff",
      });
      onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {loading && <PageLoader />}
      <h3>
        Pay <b>{investmentAmount}</b> USDT
      </h3>

      <div className="btns">
        {!walletConnected ? (
          <Button2 onClick={handleConnectWallet} name="Connect Wallet" />
        ) : (
          <p style={{ color: "green", fontSize: "1.4rem" }}>
            Wallet is connected
          </p>
        )}

        {walletConnected && (
          // Temporarily removed disabled to test clicks
          <Button2
            onClick={handlePayment}
            name={"Pay USDT"}
            // disabled={loading || !walletConnected || !recipientAddress} 
          />
        )}
      </div>
    </div>
  );
};

export default USDTPaymentMain;

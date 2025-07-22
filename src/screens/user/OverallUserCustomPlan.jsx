import { useEffect, useState } from "react";
import "../../styles/user/CustomPlanCard.css";
import PageLoader from "../../components/ui/PageLoader";
import Swal from "sweetalert2";
import WalletOptionModal from "../../components/ui/WalletOptionModal";
import USDTPaymentMain from "../../components/wallet/USDTPaymentMain";
import { Modal } from "react-bootstrap";
import { Button2 } from "../../components/ui/Buttons";
import { MainContent } from "../../constants/content/MainContent";

const OverallUserCustomPlan = () => {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [amount, setAmount] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConfirm = () => {
    const value = parseInt(amount, 10);
  
    if (!value || value < 30) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Minimum deposit amount should be at least 30.",
      });
      return;
    }
  
    setAmount(value); // Convert to number
    setShowWalletModal(true);
  };
  

  return (
    <>
      {loading && <PageLoader />}

      {showWalletModal && (
        <WalletOptionModal
          hide={() => setShowWalletModal(false)}
          connectWallet={(walletName) => {
            setWalletType(walletName);
            setShowPaymentModal(true);
          }}
          className="grey-wallet-modal"
        />
      )}

      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        size="md"
        centered
        scrollable
        className="BNBPaymentModal"
      >
        <Modal.Body className="grey-modal-body btn3 rounded-3xl">
          <div className="inner bg-black rounded-3xl px-2 py-4">
            <h4>{MainContent.appName}</h4>
            <USDTPaymentMain
              amount={Number(amount)}
              walletType={walletType}
              packageId={null}
              onSuccess={() => setShowPaymentModal(false)}
              onFailure={() => setShowPaymentModal(false)}
            />
            <div className="btns">
              <Button2
                className="closeBtn"
                name={"Close"}
                onClick={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="MatrimonyUserCustomPlan OverallUserCustomPlan">
        <div className="glass-card">
          <h2>Enter Custom Amount</h2>
         <p>Enter an amount (minimum 30, no maximum limit)</p>

          <input
            type="number"
            min="30 "
            step="100"
            value={amount}
            onChange={handleInputChange}
            placeholder="e.g., 100, 200..."
            className="text-black"
          />
          <button onClick={handleConfirm}>Proceed to Payment</button>
        </div>
      </div>
    </>
  );
};

export default OverallUserCustomPlan;

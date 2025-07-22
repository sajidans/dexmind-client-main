import { FaDownload, FaHandshake, FaShareAlt, FaUsers } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaRobot, FaUser } from "react-icons/fa6";
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './walletNew.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { fetchCryptoData, fundTransfer, requestOtp, swap, getFundTransferHistory, getTeamData, getBanner } from "../api/user-api";
import Timg from "../assets/Group 1321317431.png";
import bcard1 from "../assets/aaa.png";
import bcard2 from "../assets/iconn.png";
import bcard3 from "../assets/iconnn.png";
import sideimg from "../assets/website/Rectangle 40450.png";
import sideimg2 from "../assets/website/bgImageLogin.jpg"
import sideimg3 from "../assets/website/bgImageLogin.jpg"
import { useNavigate } from "react-router-dom";
import AiTradeBot from "./handlers/AiTradeBot";
// import PageLoader from "./ui/PageLoader";
import ConnectWallet from "./ConnectWallet";

const Walletnew = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fundTransfers, setFundTransfers] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const [images, setImages] = useState([])


  const teamDatas = async () => {
    try {
      const res = await getTeamData();

      setTeamData(res?.data);
    } catch (error) {
      console.error("Failed to fetch team data:", error);
    }
  }

  const handleShare = async (userinfo) => {
    // Use the live base URL (replace with your deployed URL or use window.location.origin)
    const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin; // e.g., https://yourapp.com
    // const referralCode = userinfo?.referralCode || "defaultCode"; // Fallback if referralCode is missing
    const shareUrl = `${baseUrl}/register?referralCode=${encodeURIComponent(userInfo.referralCode)}`;

    // Define share data
    const shareData = {
      title: "Invite to Our App",
      text: "Join this awesome app with my referral code!",
      url: shareUrl,
    };

    if (!window.isSecureContext) {
      console.error("Web Share API requires a secure context (HTTPS or localhost).");
      alert(`Sharing is only supported on secure websites. Please copy the link manually: ${shareData.url}`);
      return;
    }

    if (navigator.share && typeof navigator.share === "function") {
      try {
        console.log("Attempting to share via Web Share API...");
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (error) {
        console.error("Web Share API failed:", error.message);
        if (error.name === "NotAllowedError") {
          alert("Sharing is blocked. Please allow sharing permissions.");
        } else {
          alert(`Failed to share: ${error.message}`);
        }
      }
    } else {
      console.log("Web Share API not supported. Falling back to clipboard...");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(shareData.url);
          console.log("Link copied to clipboard");
          alert("Link copied to clipboard! Paste it to share.");
        } catch (error) {
          console.error("Clipboard copy failed:", error.message);
          alert(`Failed to copy link. Please copy manually: ${shareData.url}`);
        }
      } else {
        console.log("Clipboard API not supported. Prompting manual copy...");
        alert(`Sharing not supported. Please copy this link: ${shareData.url}`);
      }
    }
  };

  const fundHistory = async () => {
    try {
      const res = await getFundTransferHistory();
      console.log("Fund History:", res.data?.data);
      setFundTransfers(res.data?.data);
    } catch (error) {
      console.error("Failed to fetch fund history:", error);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await getBanner()
      setImages(res?.data)

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadFundHistory = async () => {
      try {
        setLoading(true);
        const res = await getFundTransferHistory();
        setFundTransfers(res.data?.data);
      } catch (error) {
        console.error("Failed to fetch fund history:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    loadFundHistory();
    teamDatas();
    fetchBanner()
  }, []);

  const userInfo = useSelector((state) => state.userInfo.userInfo?.user);


  const swapHandler = async () => {

    if (userInfo?.level < 1) {
      Swal.fire({
        icon: "warning",
        title: "Level Too Low",
        text: "You need to be on level 2 to get this swap feature",
        width: "90%",
        confirmButtonText: "OK",
        customClass: {
          popup: 'custom-swal-popup',
          title: 'swal-title-white',
          text: 'swal-text-white',
        },
      });
      return;
    }

    let selectedWalletType = "main-to-additional";
    let amountValue = "";

    const { value: formValues } = await Swal.fire({
      title: "Swap Wallet",
      html: `
        <input type="number" id="swap-amount" class="swal2-input" placeholder="Enter amount" />
        <select id="wallet-type" class="swal2-select" style="margin-top: 10px;">
          <option value="main-to-additional">Main ➡ Additional</option>
          <option value="additional-to-main">Additional ➡ Main</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
      width: "90%",
      customClass: {
        popup: 'custom-swal-popup',
        title: 'swal-title-white',
        htmlContainer: 'swal-text-white',
      },
      preConfirm: () => {
        amountValue = document.getElementById("swap-amount").value;
        selectedWalletType = document.getElementById("wallet-type").value;

        if (!amountValue || isNaN(amountValue) || Number(amountValue) <= 0) {
          Swal.showValidationMessage("Please enter a valid amount.");
        }
        return { walletType: selectedWalletType, amount: amountValue };
      },
    });

    if (!formValues) return;

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to swap ₹${formValues.amount} (${formValues.walletType.replace("-", " → ")})`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, swap it!",
      cancelButtonText: "Cancel",
      width: "90%",
      customClass: {
        popup: 'custom-swal-popup',
        title: 'swal-title-white',
        text: 'swal-text-white',
      },
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await swap(formValues);
      console.log(response)// { walletType, amount }
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Funds Swapped!",
          text: response?.message || "Your funds have been swapped successfully.",
          timer: 2000,
          showConfirmButton: false,
          width: "90%",
          customClass: {
            popup: 'custom-swal-popup',
            title: 'swal-title-white',
            text: 'swal-text-white',
          },
        });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Swap Failed!",
          text: response?.data?.message || "Swap failed. Please try again.",
          timer: 2500,
          showConfirmButton: false,
          width: "90%",
          customClass: {
            popup: 'custom-swal-popup',
            title: 'swal-title-white',
            text: 'swal-text-white',
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Swap Failed",
        text: error?.response?.data?.message || error.message || "Something went wrong during the swap.",
        confirmButtonText: "OK",
        width: "90%",
        customClass: {
          popup: 'custom-swal-popup',
          title: 'swal-title-white',
          text: 'swal-text-white',
        },
      });
    }
  };

  const transferHandler = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Transfer Funds",
        html: `
        <div class="flex flex-col gap-4 px-6">
          <input id="username" class="swal2-input bg-gray-700 text-white outline-none border-none" placeholder="Enter Username">
          <input id="amount" type="number" class="swal2-input bg-gray-700 text-white outline-none border-none" placeholder="Enter Amount">
          <div class="flex flex-row">
            <input id="emailOtp" class="swal2-input bg-gray-700 text-white outline-none w-1/2 border-none" placeholder="Enter Email OTP">
            <button id="getOtpBtn" class="bg-blue-600 text-white px-3 py-1 w-[10rem] rounded">Get OTP</button>
          </div>
          <div id="otpMessage" class="text-green-500 text-sm mt-2 hidden"></div>
        </div>
    `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Transfer Fund",
        width: "90%",
        didOpen: () => {
          const getOtpBtn = document.getElementById("getOtpBtn");
          const otpMessage = document.getElementById("otpMessage");

          getOtpBtn.addEventListener("click", async () => {
            getOtpBtn.disabled = true;
            getOtpBtn.innerText = "Sending...";

            try {
              const otpResponse = await requestOtp({ email: userInfo.email });

              if (!otpResponse?.success) {
                throw new Error(otpResponse?.message || "Failed to send OTP");
              }

              otpMessage.innerText = "OTP has been sent to your registered email.";
              //  getOtpBtn.innerText = "OTP Sent";
              otpMessage.classList.remove("hidden");
              otpMessage.classList.add("text-green-500");

              setTimeout(() => {
                otpMessage.classList.add("hidden");
                otpMessage.innerText = "";
              }, 3000);
            } catch (err) {
              otpMessage.innerText = err.message || "Failed to send OTP";
              otpMessage.classList.remove("hidden");
              otpMessage.classList.remove("text-green-500");
              otpMessage.classList.add("text-red-500");

              setTimeout(() => {
                otpMessage.classList.add("hidden");
                otpMessage.innerText = "";
              }, 3000);
            } finally {
              getOtpBtn.disabled = false;
              getOtpBtn.innerText = "Get OTP";
            }
          });
        },
        preConfirm: () => {
          const username = document.getElementById("username").value;
          const amount = document.getElementById("amount").value;
          const emailOtp = document.getElementById("emailOtp").value;

          if (!username || !amount || !emailOtp) {
            Swal.showValidationMessage("All fields are required.");
            return;
          }

          return { username, amount, emailOtp };
        },
        customClass: {
          popup: 'custom-swal-popup',
          title: 'swal-title-white',
          text: 'swal-text-white',
        },
      });

      if (formValues) {
        const { isConfirmed } = await Swal.fire({
          title: "Are you sure?",
          text: `Transfer ₹${formValues.amount} to ${formValues.username}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          width: "90%",
          customClass: {
            popup: 'custom-swal-popup',
            title: 'swal-title-white',
            text: 'swal-text-white',
          },
        });

        if (isConfirmed) {
          try {
            setLoading(true);

            const payload = {
              username: formValues.username,
              amount: Number(formValues.amount),
              otp: formValues.emailOtp,
            };

            const res = await fundTransfer(payload);

            if (res?.success) {
              Swal.fire({
                icon: "success",
                title: "Transfer Successful",
                text: res?.data?.message || "Funds transferred successfully!",
                timer: 2000,
                showConfirmButton: false,
                width: "90%",
                customClass: {
                  popup: 'custom-swal-popup',
                  title: 'swal-title-white',
                  text: 'swal-text-white',
                },
              });
              setTimeout(() => window.location.reload(), 2000);
            } else {
              Swal.fire({
                icon: "warning",
                title: "Transfer Failed",
                text: res?.message || "Could not complete transfer",
                width: "90%",
                customClass: {
                  popup: 'custom-swal-popup',
                  title: 'swal-title-white',
                  text: 'swal-text-white',
                },
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error?.response?.data?.message || error.message || "An unexpected error occurred.",
              width: "90%",
              customClass: {
                popup: 'custom-swal-popup',
                title: 'swal-title-white',
                text: 'swal-text-white',
              },
            });
          } finally {
            setLoading(false);
          }
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An unexpected error occurred",
        width: "90%",
        customClass: {
          popup: 'custom-swal-popup',
          title: 'swal-title-white',
          text: 'swal-text-white',
        },
      });
    }
  };

  const agentHandler = async () => {
    navigate("/ai-agent");
  };

  const handleDownload = () => {
    Swal.fire({
      icon: "success",
      title: "Coming Soon 🚀",
      text: "The app is under development. Stay tuned!",
      confirmButtonColor: "#28a745", // Greenish color
      background: "#e6f4ea",          // Light green background
    });
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row  flex-wrap gap-4">
        <div className="flex-1 overflow-hidden card">
          <div className="card-inner">
            <h2 className="text-2xl font-semibold mb-4 mx-8">News & Notification</h2>
            <div className="dashed-card">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-xl mb-4">Main Wallet Balance</p>
                  <p className="text-4xl flex items-center">
                    <img src={Timg} lazy={loading}
                      alt="img" className="timg mr-4" />
                    ${userInfo?.mainWallet.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xl mb-4">Today Overall</p>
                  <p className="text-4xl flex items-center">
                    <img src={Timg} lazy={loading} alt="" className="timg mr-4" />
                    ${userInfo?.currentEarnings.toFixed(2)}
                  </p>
                </div>
              </div>
              <hr className="border-gray-600 mb-4 h-1" />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl mb-4">Additional Balance</p>
                  <p className="text-2xl font-bold text-green-300">
                    ₮ ${userInfo?.additionalWallet.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center text-sm" onClick={swapHandler}>
                    <div className="border rounded-full p-4">
                      <FaArrowRightArrowLeft className="text-xl mb-1" />
                    </div>
                    <button className="text-lg">Swap</button>
                  </div>
                  <div className="flex flex-col items-center text-sm" onClick={transferHandler}>
                    <div className="border rounded-full p-4">
                      <FaUser className="text-xl mb-1" />
                    </div>
                    <p className="text-lg">Transfer</p>
                  </div>
                  <div className="flex flex-col items-center text-sm" onClick={agentHandler}>
                    <div className="border rounded-full p-4">
                      <FaRobot className="text-xl mb-1" />
                    </div>
                    <p className="text-lg">AIAgent</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <button onClick={() => navigate("/our-plans")} className="w-1/2 btn">DEPOSIT</button>
              <button
                onClick={() => navigate("/withdrawal")}
                className="w-1/2 text-2xl py-4 bg-gray-600 text-white font-bold rounded-br-lg"
              >
                WITHDRAW
              </button>
            </div>
          </div>
        </div>

        <div className="sm:w-1/5 w-full card">
          <div className="card-inner">
            <h2 className="text-2xl font-semibold mb-4 mx-8">OTHER ASSET</h2>
            <div className="dashed-card">
              <div>
                <h6 className="text-lg font-bold">Total Trade Profit</h6>
                <div className="flex mt-4 items-center">
                  <img src={Timg} lazy={loading} alt="" className="timg mr-4" />
                  <p className="text-2xl">{userInfo?.totalRoi}</p>
                </div>
              </div>
              <div>
                <h6 className="text-lg font-bold mt-4">Today Trade Profit</h6>
                <div className="flex mt-4 items-center">
                  <img src={Timg} lazy={loading} alt="" className="timg mr-4" />
                  <p className="text-2xl">{userInfo?.dailyRoi}</p>
                </div>
              </div>
              <div>
                <h6 className="text-lg font-bold mt-4">Ai Credits</h6>
                <div className="flex mt-4 items-center">
                  <img src={Timg} lazy={loading} alt="" className="timg mr-4" />
                  <p className="text-2xl">{userInfo?.aiCredits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-1/3 w-full card">
          <AiTradeBot />
        </div>
      </div>

      {/* Second part */}
      <div className="mar-top flex flex-col md:flex-row">
        {/* Left */}
        <div className="left sm:flex-1 w-full">
          {/* Crypto */}
          <div className="w-full mb-8 card">
            <div className="card-inner p-8">
              <h2 className="text-2xl font-semibold mb-4 mx-8">Crypto</h2>
              <div className="space-y-2">
                {cryptoData.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between bg-[#1d1e23] p-3 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <img src={coin.image} lazy={loading} alt={coin.name} className="w-6 h-6" />
                      <div>
                        <p className="font-semibold text-sm">{coin.symbol.toUpperCase()}</p>
                        <p className="text-xs text-gray-400">{coin.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">₹{coin.current_price.toLocaleString()}</p>
                      <p
                        className={`text-xs flex items-center justify-end gap-1 ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            {/* Transactions */}
            <div className="sm:w-[35rem] w-full card">
              <div className="card-inner">
                <div className="text-2xl font-semibold ml-8 mb-4">TRANSACTIONS</div>
                <div className="dashed-card h-[39vh] overflow-y-auto">
                  {fundTransfers?.map((tx) => (
                    <div
                      key={tx._id}
                      className="flex flex-col sm:flex-row w-full sm:w-auto items-start gap-4 sm:gap-6 border-b border-gray-700 py-4 sm:py-6"
                    >
                      <div className="w-full sm:w-1/2">
                        <div className="font-semibold text-lg">{tx.to.username}</div>
                      </div>
                      <div className="w-full sm:w-1/2 flex flex-col sm:flex-row items-end sm:items-center text-right sm:text-left gap-2 sm:gap-4">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-lg font-bold">{tx.amount}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(tx.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connect Wallet */}
            <div className="w-full card">
              <div className="card-inner p-4">
                <h2 className="text-xl font-semibold mb-4 mx-4">CONNECT TO WALLET</h2>
                <div className="dashed-card flex flex-col items-center p-4">
                  {/* Responsive image container for small screens */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <img
                      src={bcard2}
                      lazy={loading}
                      alt="wallet"
                      className="w-16 h-16 sm:w-[7rem] sm:h-[7rem] object-contain"
                    />
                    <img
                      src={bcard1}
                      lazy={loading}
                      alt="wallet"
                      className="w-20 h-20 sm:w-[10rem] sm:h-[10rem] object-contain"
                    />
                    <img
                      src={bcard3}
                      lazy={loading}
                      alt="wallet"
                      className="w-16 h-16 sm:w-[8rem] sm:h-[8rem] object-contain"
                    />
                  </div>
                  {/* Ensure ConnectWallet is centered and visible */}
                  <div className="w-full flex justify-center mt-4">
                    <ConnectWallet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Notification Section */}
        <div className="w-full sm:w-[36rem] sm:pl-4">
          <div className="card mb-4">
            <div className="card-inner p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold mb-4">Team Notification</h2>
                <span className="text-xl" onClick={() => navigate("/activity")}>
                  ↗
                </span>
              </div>
              {/* Team counts grid */}
              <div className="grid grid-cols-5 gap-2 text-center mb-4">
                <div>
                  <p className="text-3xl font-bold">{teamData?.teamA ?? 0}</p>
                  <p className="text-sm text-gray-300">Team A</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{teamData?.teamB ?? 0}</p>
                  <p className="text-sm text-gray-300">Team B</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{teamData?.teamC ?? 0}</p>
                  <p className="text-sm text-gray-300">Team C</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{teamData?.teamD ?? 0}</p>
                  <p className="text-sm text-gray-300">Team D</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{teamData?.totalTeam ?? 0}</p>
                  <p className="text-sm text-gray-300">Total</p>
                </div>
              </div>
              <hr className="border-gray-500 mb-4" />
              <div className="grid grid-cols-4 text-center gap-2">
                <div className="flex flex-col items-center" onClick={() => navigate("/activity")}>
                  <FaUsers className="text-5xl mb-1" />
                  <span className="text-lg">Team</span>
                </div>
                <div className="flex flex-col items-center" onClick={() => navigate("/activity")}>
                  <FaHandshake className="text-5xl mb-1" />
                  <span className="text-lg">Commission</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaShareAlt onClick={handleShare} className="text-5xl mb-1" />
                  <span className="text-lg">Invite</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaDownload className="text-5xl mb-1" onClick={() => handleDownload()} />
                  <span className="text-lg text-center">Download App</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-inner p-4">
              <h2 className="text-2xl font-semibold mb-4">News & Notifications</h2>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                className="w-full h-[38rem] rounded-xl overflow-hidden"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img?.imageUrl}
                      loading="lazy"
                      alt={`Slide ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default Walletnew;
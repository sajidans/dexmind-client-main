import img1 from "../assets/website/11111.png";
import img2 from "../assets/website/22222.png";
import img3 from "../assets/website/333 1.png";
import img4 from "../assets/website/4444.png";
import img5 from "../assets/website/Group 1321317493.png";
import img6 from "../assets/website/Group 1321317522.png";
// import bcard1 from "../assets/aaa.png";
// import bcard2 from "../assets/iconn.png";
// import bcard3 from "../assets/iconnn.png";
// import bcard4 from "../assets/66.png";
// import bcard5 from "../assets/555.png";
// import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { GlowButton } from "./ui/Buttons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DappWallet = () => {
    // const [selectedWallet, setSelectedWallet] = useState(null);
    // const [isConnecting, setIsConnecting] = useState(false);
    const userInfo = useSelector(store => store?.userInfo?.userInfo?.user);
    console.log(userInfo)
    const navigate = useNavigate();

    const data = [
        { title: "Total Investment", amount: userInfo?.totalInvestment || "0", icon: img1 },
        { title: "Main Wallet", amount: userInfo?.mainWallet || "0", icon: img1 },
        { title: "Refferal Income", amount: userInfo?.directReferalAmount || "0", icon: img3 },
        { title: "Additional Wallet", amount: userInfo?.additionalWallet || "0", icon: img1 },
        { title: "Total Earning", amount: userInfo?.totalEarnings || "0", icon: img2 },
        { title: "Total Level Income", amount: userInfo?.levelIncome || "0", icon: img2 },
        { title: " Today Trade Income", amount: userInfo?.dailyRoi || "0", icon: img2 },
        { title: " Total Trade Income", amount: userInfo?.totalRoi || "0", icon: img2 },
        { title: "Ai credits", amount: userInfo?.aiCredits || "0", icon: img2 },
        { title: "Total Withdrawal", amount: userInfo?.totalPayouts || "0", icon: img3 },
        // { title: "UNDRAWN", amount: userInfo?., icon: img4 },
    ];

    // const data = userInfo
    // console.log(data);

    // const bcardData = [
    //     { title: "Trust Wallet", icon: bcard1, id: "trustwallet" },
    //     { title: "Binance Smart Chain", icon: bcard2, id: "binance" },
    //     { title: "SafePal", icon: bcard3, id: "safepal" },
    //     { title: "TokenPocket", icon: bcard4, id: "tokenpocket" },
    //     { title: "MetaMask", icon: bcard5, id: "metamask" },
    // ];

    useEffect(() => {
        const handleEthereum = () => {
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log("MetaMask initialized");
            }
        };
        window.addEventListener("ethereum#initialized", handleEthereum, { once: true });
        return () => window.removeEventListener("ethereum#initialized", handleEthereum);
    }, []);

    // const handleConnectClick = async () => {
    //     if (!selectedWallet) return alert("Please select a wallet first");
    //     setIsConnecting(true);
    //     try {
    //         switch (selectedWallet) {
    //             case "metamask": await connectMetaMask(); break;
    //             case "trustwallet": await connectTrustWallet(); break;
    //             case "safepal": await connectSafePal(); break;
    //             case "binance": await connectBinanceWallet(); break;
    //             case "tokenpocket": await connectTokenPocket(); break;
    //             default: alert("Unsupported wallet");
    //         }
    //     } finally {
    //         setIsConnecting(false);
    //     }
    // };

    // const connectMetaMask = async () => { ... };
    // const connectTrustWallet = async () => connectWallet(window.ethereum?.isTrust, "Trust Wallet");
    // const connectSafePal = async () => connectWallet(window.safepal || window.ethereum?.isSafePal, "SafePal");
    // const connectBinanceWallet = async () => connectWallet(window.BinanceChain || window.ethereum?.isBinance, "Binance Wallet");
    // const connectTokenPocket = async () => connectWallet(window.ethereum?.isTokenPocket, "TokenPocket");

    // const connectWallet = async (condition, name) => { ... };

    return (
        <div className="h-full w-full">
            <div className="w-full px-4">
                <div className="p-4 sm:p-8">
                    <div className="mb-4">
                        <GlowButton text="Main Wallet Balance" onClick={() => { }} />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {data.map((item, index) => (
                            <div key={index} className="card2 w-[15rem] h-[15rem] flex flex-col items-center justify-center">
                                <img src={item.icon} alt={item.title} className="w-[6rem] h-[6rem] mb-2" />
                                <p className="text-lg font-semibold text-white/80 mb-1 text-center">{item.title}</p>
                                <p className="text-2xl font-bold text-white">${item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="p-4 sm:p-8">
                    <div className="mb-4">
                        <GlowButton text="Additional Balance" onClick={() => { }} />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center ">
                        {data.map((item, index) => (
                            <div key={index} className="card2 w-[15rem] h-[15rem] flex flex-col items-center justify-center">
                                <img src={item.icon} alt={item.title} className="w-[6rem] h-[6rem] mb-2" />
                                <p className="text-lg font-semibold text-white/80 mb-1 text-center">{item.title}</p>
                                <p className="text-2xl font-bold text-white">${item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            <div className="w-full flex flex-col sm:flex-row relative">
                {/* <div className="sm:w-1/2 w-full px-4 py-8 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[30rem]">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                            <img src={img5} alt="USDT TRC-20" className="w-[4rem] h-[4rem]" />
                            <h5 className="font-bold text-2xl sm:text-3xl text-white">USDT (TRC-20)</h5>
                        </div>
                        <button className="w-full rounded-[0.625rem] border border-[#01EBE0] px-6 py-3 font-bold text-xl text-white hover:bg-[#01EBE0] hover:text-black transition-colors" onClick={() => navigate("/usdt-trc")}>
                            Chain Setting
                        </button>
                        <div className="w-[2px] h-[4rem] mx-auto my-8" style={{ borderLeft: "2px dotted #01EBE0" }} />
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                            <img src={img6} alt="USDT BEP-20" className="w-[4rem] h-[4rem]" />
                            <h5 className="font-bold text-2xl sm:text-3xl text-white">USDT (BEP-20)</h5>
                        </div>
                        <button className="w-full rounded-[0.625rem] border border-[#01EBE0] px-6 py-3 font-bold text-xl text-white hover:bg-[#01EBE0] hover:text-black transition-colors" onClick={() => navigate("/usdt-bep")}>
                            Chain Setting
                        </button>
                    </div>
                </div> */}

                {/* Commented out DAPP Wallet Connect Section */}
                {/*
                <div className="hidden md:hidden sm:block h-[40rem] w-[2px] absolute top-0 left-1/2 transform -translate-x-1/2" style={{ borderLeft: "2px dotted #01EBE0" }} />
                <div className="sm:w-1/2 w-full px-4 py-8">
                    <h3 className="font-bold text-2xl sm:text-3xl my-4 text-white text-center sm:text-left">
                        DAPP WALLET CONNECT
                    </h3>
                    <div className="rounded-3xl border border-[#155F5C] p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bcardData.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedWallet(item.id)}
                                    className={`card2 p-4 rounded-lg border-2 flex flex-col items-center cursor-pointer transition-all duration-300
                                        ${selectedWallet === item.id ? "border-[#01EBE0]" : "border-[#155F5C]"}
                                    `}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className={`mb-4 ${item.id === "safepal" ? "w-[6rem] h-[6rem]" : "w-[5rem] h-[5rem]"}`}
                                    />
                                    <h3 className="text-lg font-semibold text-white text-center">{item.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleConnectClick}
                        disabled={isConnecting}
                        className={`regadiant-btn w-full mt-8 text-xl sm:text-2xl text-black font-bold ${isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isConnecting ? "Connecting..." : "CONNECT"}
                    </button>
                </div>
                */}
            </div>
        </div>
    );
};

export default DappWallet;

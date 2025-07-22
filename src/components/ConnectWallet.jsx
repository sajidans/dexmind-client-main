import { useEffect, useState } from "react";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import { updateAccount } from "../api/user-api";
import Swal from "sweetalert2";

const ConnectWallet = () => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const connectWallet = async () => {
        setIsLoading(true);
        try {
            const wcProvider = await EthereumProvider.init({
                projectId: import.meta.env.VITE_INFURA_ID,
                chains: [56],
                rpcMap: {
                    56: "https://bsc-dataseed.binance.org",
                },
                showQrModal: true,
            });

            await wcProvider.enable();
            const ethersProvider = new ethers.BrowserProvider(wcProvider);
            const signer = await ethersProvider.getSigner();
            const userAddress = await signer.getAddress();

            setAccount(userAddress);
            setProvider(wcProvider);

            wcProvider.on("disconnect", handleAutoDisconnect);
        } catch (err) {
            console.error("Connection failed:", err);
            Swal.fire({
                title: "❌ Connection Error",
                text: err?.message || "Failed to connect wallet.",
                icon: "error",
                background: "#0f172a",
                color: "#f87171",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = async () => {
        setIsLoading(true);
        try {
            const res = await updateAccount(null);

            if (res?.success) {
                Swal.fire({
                    title: '🔌 Wallet Disconnected',
                    text: res?.message || 'Wallet address removed.',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fcd34d',
                });
            } else {
                Swal.fire({
                    title: '❌ Disconnect Failed',
                    text: res?.message || 'Could not update wallet info.',
                    icon: 'error',
                    background: '#0f172a',
                    color: '#f87171',
                });
            }

            if (provider?.disconnectSession) {
                await provider.disconnectSession();
            } else if (provider?.disconnect) {
                await provider.disconnect();
            }

            localStorage.removeItem("walletconnect");
            localStorage.removeItem("walletconnect_connector");
            localStorage.removeItem("wc@2:client:0.3//session");
            if (provider?.wc?.sessionStorage?.clear) {
                provider.wc.sessionStorage.clear();
            }

            setAccount(null);
            setProvider(null);
        } catch (err) {
            console.error("Disconnect error:", err);
            Swal.fire({
                title: '🚫 Error',
                text: err?.response?.data?.message || err?.message || 'Server error',
                icon: 'error',
                background: '#0f172a',
                color: '#f87171',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetAccount = async (walletAddress) => {
        setIsLoading(true);
        try {
            const res = await updateAccount(walletAddress);
            if (res?.success) {
                Swal.fire({
                    title: '✅ Account Connected!',
                    text: res?.message || 'Account info saved.',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#22d3ee',
                });
            } else {
                if (res?.message?.toLowerCase().includes("already connected")) {
                    Swal.fire({
                        title: 'ℹ️ Already Connected',
                        text: res.message,
                        icon: 'info',
                        background: '#0f172a',
                        color: '#fde68a',
                    });
                } else {
                    Swal.fire({
                        title: '⚠️ Connection Failed',
                        text: res?.message || 'Something went wrong.',
                        icon: 'error',
                        background: '#0f172a',
                        color: '#f87171',
                    });
                }
            }
        } catch (err) {
            console.error("Account error:", err);
            Swal.fire({
                title: '🚫 Error',
                text: err?.response?.data?.message || err?.message || 'Server error',
                icon: 'error',
                background: '#0f172a',
                color: '#f87171',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAccount = async () => {
            if (account) {
                await handleSetAccount(account);
            }
        };
        fetchAccount();
    }, [account]);

    useEffect(() => {
        if (!provider) return;

        const handleDisconnect = () => {
            handleAutoDisconnect();
        };

        provider.on("disconnect", handleDisconnect);

        return () => {
            provider.removeListener("disconnect", handleDisconnect);
        };
    }, [provider]);

    const handleAutoDisconnect = () => {
        setAccount(null);
        setProvider(null);
        localStorage.removeItem("walletconnect");

        Swal.fire({
            title: '🔌 Wallet Disconnected',
            text: 'Session expired or manually disconnected.',
            icon: 'info',
            background: '#0f172a',
            color: '#fcd34d',
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            {isLoading ? (
                <p className="text-white text-xl animate-pulse">⏳ Please wait...</p>
            ) : !account ? (
                <button
                    onClick={connectWallet}
                    className="bg-[#14C9C0] text-white px-12 py-6 text-[1.7rem] rounded hover:bg-[#2f9e98]"
                >
                    Connect BSC Wallet
                </button>
            ) : (
                <>
                    <p className="text-green-600 mt-4 px-12 py-6 md:text-[2rem] text-[1rem]">
                        ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </p>
                    <button
                        onClick={disconnectWallet}
                        className="mt-4 bg-red-500 text-white px-12 py-6 text-[2rem] rounded hover:bg-red-600"
                    >
                        Disconnect
                    </button>
                </>
            )}
        </div>
    );
};

export default ConnectWallet;

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiSearch } from 'react-icons/fi';
import PageLoader from '../../components/ui/PageLoader';
export const CryptoList = ({ category }) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://rest.coincap.io/v3/assets?limit=10', {
                    headers: {
                        Authorization: 'Bearer 420d8a495eb2c591e41e492fe1c19061b31695f4b4c19a7eff8c3c2ab9b57389',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setCoins(result.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching coins:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle loading state
    if (loading) {
        return <PageLoader />;
    }

    // Handle error state
    if (error) {
        return <p className="text-red-400 text-center text-2xl">Error: {error}</p>;
    }

    // Filter data based on category
    let filteredData = [];

    switch (category) {
        case 'All':
            filteredData = coins;
            break;
        case 'Top Gainers':
            filteredData = coins.filter(coin => parseFloat(coin.changePercent24Hr) > 0);
            break;
        case 'Top Losers':
            filteredData = coins.filter(coin => parseFloat(coin.changePercent24Hr) < 0);
            break;
        case 'Watchlist':
        case 'Futures':
        case 'Penny Coins':
        case 'Newly Listed Coins':
        case 'Memes':
        case 'AI':
        case 'Real World Assets':
        case 'DePIN & Storage':
        case 'Gaming NFT':
        case 'Infra':
        case 'Layer 1/Layer 2':
            filteredData = [];
            break;
        default:
            filteredData = coins;
    }

    // Map API data to the required format
    const formattedData = filteredData.map(coin => ({
        icon: coin.symbol,
        name: coin.symbol,
        fullName: coin.name,
        price: `$${parseFloat(coin.priceUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: `${Math.abs(parseFloat(coin.changePercent24Hr)).toFixed(2)}%`,
        up: parseFloat(coin.changePercent24Hr) > 0,
    }));

    // Define coin symbol to color mapping
    const coinColors = {
        BTC: '#FFD700', // Gold for Bitcoin
        ETH: '#C0C0C0', // Silver for Ethereum
        XRP: '#00AAE4', // Cyan for XRP
        USDT: '#26A17B', // Green for Tether
        BNB: '#F3BA2F', // Yellow for BNB
        SOL: '#9945FF', // Purple for Solana
        USDC: '#2775CA', // Blue for USDC
        DOGE: '#C2A633', // Light Gold for Dogecoin
        ADA: '#26A17B', // Teal for Cardano
        TRX: '#FF0000', // Red for TRON
    };

    // Filter data based on search query
    const searchedData = formattedData.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle empty data after search
    if (searchedData.length === 0) {
        return (
            <div>
                {/* Search Input */}
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search coins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#1d1e23] text-white border border-[#01EBE0] focus:outline-none focus:ring-2 focus:ring-[#01EBE0]"
                    />

                    <button className="p-2 bg-[#01EBE0] text-black rounded-lg">
                        <FiSearch size={20} />
                    </button>
                </div>
                <p className="text-gray-400 text-center text-2xl">
                    {searchQuery ? `No results found for "${searchQuery}" in ${category}` : `No data available for ${category}`}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Search Input */}
            <div className="mb-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search coins..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#1d1e23] text-white text-2xl border border-[#01EBE0] focus:outline-none focus:ring-2 focus:ring-[#01EBE0]"
                />
                <button className="p-2 bg-[#01EBE0] text-black rounded-lg">
                    <FiSearch size={20} />
                </button>
            </div>

            {/* Coin List */}
            <div className="space-y-2">
                {searchedData.map((coin, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-[#1d1e23] p-3 rounded-md"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="text-xl bg-gray-700 h-16 w-16 flex items-center justify-center rounded-full"
                                style={{ color: coinColors[coin.name] || '#FFFFFF' }} // Default to white if no color defined
                            >
                                {coin.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{coin.name}</p>
                                <p className="text-xl text-gray-400">{coin.fullName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-lg">{coin.price}</p>
                            <p
                                className={`text-xl flex items-center justify-end gap-1 ${coin.up ? 'text-green-400' : 'text-red-400'
                                    }`}
                            >
                                {coin.up ? <FiTrendingUp /> : <FiTrendingDown />}
                                {coin.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const BotTradehistoryDetails = () => {
//   const { state } = useLocation(); // Get trade data from navigation state
//   const trade = state?.trade;
//   const navigate = useNavigate(); // Hook to navigate back

//   // Handle missing trade data
//   if (!trade) {
//     return (
//       <div className="text-white p-4">
//         <p>No trade data found.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-700 mt-4 px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Use the same coins as in the image for consistency
//   const coins = ['SOL', 'ALGO', 'S', 'BCH', 'ARB', 'NTRN', 'XRP', 'GALA', 'GMT'];
//   const coinCount = coins.length;
//   const amountPerCoin = trade.tradeAmount / coinCount; // Equal distribution per coin

//   // Calculate random profit/loss for each coin, ensuring the total matches trade.profit
//   const coinResults = coins.map((coin, idx) => {
//     // Random profit/loss for each coin between -10% and +10% of the invested amount
//     const maxVariation = amountPerCoin * 0.1; // ±10% of invested amount
//     const randomProfit = Math.random() * 2 * maxVariation - maxVariation; // Random between -maxVariation and +maxVariation
//     return {
//       coin,
//       invested: amountPerCoin,
//       profit: randomProfit,
//       returned: amountPerCoin + randomProfit,
//     };
//   });

//   // Adjust profits so the total matches trade.profit
//   const currentTotalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);
//   const adjustment = (trade.profit - currentTotalProfit) / coinCount; // Distribute the difference equally
//   coinResults.forEach((result) => {
//     result.profit += adjustment;
//     result.returned = result.invested + result.profit;
//   });

//   // Verify the total profit matches trade.profit
//   const totalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);

//   return (
//     <div className="bg-[#1a1a1a] text-white p-4 mx-auto rounded-lg shadow-lg">
//       {/* Header section matching the image */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2">
//           <div className="relative w-7 h-7">
//             <svg className="text-red-500 absolute left-0 top-0 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//             <svg className="text-green-500 absolute left-3 top-0 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
//             </svg>
//           </div>
//           <div>
//             <p className="text-lg">Invest: ${trade.tradeAmount.toFixed(2)}</p>
//             <p className="text-lg">Return: ${trade.returnAmount.toFixed(2)}</p>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className={`text-lg ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//             Profit: ${trade.profit.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-400">Date: {trade.date}</p>
//         </div>
//       </div>

//       {/* Coin breakdown section matching the image */}
//       <div className="space-y-3">
//         {coinResults.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg"
//           >
//             <div className="flex items-center gap-3">
//               {/* Placeholder for coin icon - replace with actual icon path */}
//               <img
//                 src={`/icons/${item.coin.toLowerCase()}.png`}
//                 alt={`${item.coin} icon`}
//                 className="w-8 h-8"
//                 onError={(e) => (e.target.src = '/icons/default.png')} // Fallback icon
//               />
//               <div>
//                 <p className="text-white">Invest on {item.coin}</p>
//                 <p className="text-green-400">Collect from {item.coin}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-gray-300">${item.invested.toFixed(6)}</p>
//               <p className={item.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
//                 ${item.returned.toFixed(6)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-gray-700 mt-4 px-4 py-2 rounded w-full"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default BotTradehistoryDetails;





// import  { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const BotTradehistoryDetails = () => {
//   const { state } = useLocation(); // Get trade data from navigation state
//   const trade = state?.trade;
//   const navigate = useNavigate(); // Hook to navigate back
//   const [coins, setCoins] = useState([]); // Store fetched coins
//   const [loading, setLoading] = useState(true); // Loading state for API fetch
//   const [error, setError] = useState(null); // Error state for API fetch

//   // Fallback coin list in case API fails
//   const fallbackCoins = [
//     { symbol: 'BTC', name: 'Bitcoin' },
//     { symbol: 'ETH', name: 'Ethereum' },
//     { symbol: 'SOL', name: 'Solana' },
//     { symbol: 'XRP', name: 'Ripple' },
//     { symbol: 'ADA', name: 'Cardano' },
//     { symbol: 'DOGE', name: 'Dogecoin' },
//     { symbol: 'USDT', name: 'Tether' },
//     { symbol: 'BNB', name: 'BNB' },
//     { symbol: 'LINK', name: 'Chainlink' },
//     { symbol: 'LTC', name: 'Litecoin' },
//   ];

//   // Fetch coin data from CoinCap API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.coincap.io/v2/assets?limit=50', {
//           headers: {
//             Authorization: 'Bearer 420d8a495eb2c591e41e492fe1c19061b31695f4b4c19a7eff8c3c2ab9b57389',
//           },
//         });
//         if (!response.ok) {
//           // Log the status and status text for debugging
//           console.error(`API Error: ${response.status} ${response.statusText}`);
//           throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
//         }
//         const result = await response.json();
//         // Randomly select 10 coins from the fetched list
//         const shuffledCoins = result.data.sort(() => Math.random() - 0.5);
//         const selectedCoins = shuffledCoins.slice(0, 10);
//         setCoins(selectedCoins);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching coins:', error);
//         setError(error.message);
//         // Use fallback coins if API fails
//         const shuffledFallback = fallbackCoins.sort(() => Math.random() - 0.5);
//         setCoins(shuffledFallback.slice(0, 10));
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle missing trade data
//   if (!trade) {
//     return (
//       <div className="text-white p-4">
//         <p>No trade data found.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-700 mt-4 px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Handle loading state
//   if (loading) {
//     return <div className="text-white p-4">Loading coins...</div>;
//   }

//   // Handle error state (but still render with fallback coins)
//   if (error) {
//     console.warn(`Using fallback coins due to error: ${error}`);
//   }

//   // If no coins are available (shouldn't happen with fallback)
//   if (coins.length === 0) {
//     return (
//       <div className="text-white p-4">
//         <p>No coins available.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-700 mt-4 px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const coinCount = coins.length;
//   const amountPerCoin = trade.tradeAmount / coinCount; // Equal distribution per coin

//   // Calculate random profit/loss for each coin, ensuring the total matches trade.profit
//   const coinResults = coins.map((coin, idx) => {
//     // Random profit/loss for each coin between -10% and +10% of the invested amount
//     const maxVariation = amountPerCoin * 0.1; // ±10% of invested amount
//     const randomProfit = Math.random() * 2 * maxVariation - maxVariation; // Random between -maxVariation and +maxVariation
//     return {
//       symbol: coin.symbol, // e.g., 'SOL'
//       fullName: coin.name, // e.g., 'Solana'
//       invested: amountPerCoin,
//       profit: randomProfit,
//       returned: amountPerCoin + randomProfit,
//     };
//   });

//   // Adjust profits so the total matches trade.profit
//   const currentTotalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);
//   const adjustment = (trade.profit - currentTotalProfit) / coinCount; // Distribute the difference equally
//   coinResults.forEach((result) => {
//     result.profit += adjustment;
//     result.returned = result.invested + result.profit;
//   });

//   // Verify the total profit matches trade.profit
//   const totalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);

//   // Function to map coin symbols to Crypto Logos URLs
//   const getCoinIconUrl = (coinSymbol) => {
//     // Map coin symbols to their names as expected by Crypto Logos
//     const coinNameMap = {
//       BTC: 'bitcoin',
//       ETH: 'ethereum',
//       USDT: 'tether',
//       BNB: 'binance-coin',
//       SOL: 'solana',
//       XRP: 'ripple',
//       USDC: 'usd-coin',
//       DOGE: 'dogecoin',
//       TON: 'toncoin',
//       ADA: 'cardano',
//       AVAX: 'avalanche',
//       SHIB: 'shiba-inu',
//       BCH: 'bitcoin-cash',
//       LINK: 'chainlink',
//       DOT: 'polkadot-new',
//       TRX: 'tron',
//       LEO: 'leo-token',
//       DAI: 'multi-collateral-dai',
//       LTC: 'litecoin',
//       NEAR: 'near-protocol',
//       MATIC: 'polygon',
//       KAS: 'kaspa',
//       UNI: 'uniswap',
//       PEPE: 'pepe',
//       ICP: 'internet-computer',
//       APT: 'aptos',
//       XLM: 'stellar',
//       ETC: 'ethereum-classic',
//       XMR: 'monero',
//       FET: 'fetch',
//       STX: 'stacks',
//       FIL: 'filecoin',
//       RNDR: 'render-token',
//       OKB: 'okb',
//       CRO: 'crypto-com-coin',
//       ARB: 'arbitrum',
//       IMX: 'immutable-x',
//       SUI: 'sui',
//       HBAR: 'hedera',
//       ATOM: 'cosmos',
//       TAO: 'bittensor',
//       VET: 'vechain',
//       MKR: 'maker',
//       INJ: 'injective',
//       GRT: 'the-graph',
//       OP: 'optimism-ethereum',
//       LDO: 'lido-dao',
//       AR: 'arweave',
//       FLOKI: 'floki-inu',
//       THETA: 'theta-network',
//     };
//     const coinName = coinNameMap[coinSymbol] || coinSymbol.toLowerCase(); // Use symbol as fallback name
//     const url = `https://cryptologos.cc/logos/${coinName}-${coinSymbol.toLowerCase()}-logo.png`;
//     // Log the URL for debugging
//     console.log(`Fetching icon for ${coinSymbol}: ${url}`);
//     return url;
//   };

//   return (
//     <div className="bg-[#1a1a1a] text-white p-4 mx-auto rounded-lg shadow-lg">
//       {/* Header section matching the image */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2">
//           <div className="relative w-7 h-7">
//             <svg className="text-red-500 absolute left-0 top-0 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//             <svg className="text-green-500 absolute left-3 top-0 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l-7-7m0 0l7 7m-7-7v18" />
//             </svg>
//           </div>
//           <div>
//             <p className="text-lg">Invest: ${trade.tradeAmount.toFixed(2)}</p>
//             <p className="text-lg">Return: ${trade.returnAmount.toFixed(2)}</p>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className={`text-lg ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//             Profit: ${trade.profit.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-400">Date: {trade.date}</p>
//         </div>
//       </div>

//       {/* Coin breakdown section matching the image */}
//       <div className="space-y-3">
//         {coinResults.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded-lg"
//           >
//             <div className="flex items-center gap-3">
//               {/* Dynamically load coin icon from Crypto Logos using the symbol */}
//               <img
//                 src={getCoinIconUrl(item.symbol)}
//                 alt={`${item.fullName} icon`}
//                 className="w-8 h-8"
//                 onError={(e) => {
//                   console.error(`Failed to load icon for ${item.symbol}`);
//                   e.target.src = '/icons/fallback-coin.png'; // Use local fallback image
//                 }}
//               />
//               <div>
//                 {/* Show full name instead of symbol */}
//                 <p className="text-white">Invest on {item.fullName}</p>
//                 <p className="text-green-400">Collect from {item.fullName}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-gray-300">${item.invested.toFixed(6)}</p>
//               <p className={item.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
//                 ${item.returned.toFixed(6)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-gray-700 mt-4 px-4 py-2 rounded w-full"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default BotTradehistoryDetails;







import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BotTradehistoryDetails = () => {
  const { state } = useLocation(); // Get trade data from navigation state
  const trade = state?.trade;
  const navigate = useNavigate(); // Hook to navigate back
  const [coins, setCoins] = useState([]); // Store fetched coins
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [error, setError] = useState(null); // Error state for API fetch
  const [coinImages, setCoinImages] = useState({}); // Store coin images from CoinGecko API

  // Fallback coin list in case API fails
  const fallbackCoins = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BNB', name: 'BNB' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'LTC', name: 'Litecoin' },
  ];

  // Fetch coin data from CoinCap API (first API call)
  useEffect(() => {
    const fetchCoinCapData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets?limit=50', {
          headers: {
            Authorization: 'Bearer 420d8a495eb2c591e41e492fe1c19061b31695f4b4c19a7eff8c3c2ab9b57389',
          },
        });
        if (!response.ok) {
          console.error(`CoinCap API Error: ${response.status} ${response.statusText}`);
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log('CoinCap API Response:', result); // Log the response
        const shuffledCoins = result.data.sort(() => Math.random() - 0.5);
        const selectedCoins = shuffledCoins.slice(0, 10);
        setCoins(selectedCoins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins from CoinCap:', error);
        setError(error.message);
        const shuffledFallback = fallbackCoins.sort(() => Math.random() - 0.5);
        setCoins(shuffledFallback.slice(0, 10));
        setLoading(false);
      }
    };

    // Fetch coin images from CoinGecko API (second API call)
    const fetchCoinGeckoData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
        if (!response.ok) {
          console.error(`CoinGecko API Error: ${response.status} ${response.statusText}`);
          throw new Error(`Failed to fetch data from CoinGecko: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        console.log('CoinGecko API Response:', result); // Log the response
        // Map coin symbols to image URLs
        const imageMap = {};
        result.forEach(coin => {
          imageMap[coin.symbol.toUpperCase()] = coin.image;
        });
        setCoinImages(imageMap);
      } catch (error) {
        console.error('Error fetching coin images from CoinGecko:', error);
      }
    };

    fetchCoinCapData();
    fetchCoinGeckoData();
  }, []); // Empty dependency array ensures this runs only once

  // Handle missing trade data
  if (!trade) {
    return (
      <div className="text-white p-4">
        <p>No trade data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 mt-4 px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Handle loading state
  if (loading) {
    return <div className="text-white p-4">Loading coins...</div>;
  }

  // Handle error state (but still render with fallback coins)
  if (error) {
    console.warn(`Using fallback coins due to error: ${error}`);
  }

  // If no coins are available (shouldn't happen with fallback)
  if (coins.length === 0) {
    return (
      <div className="text-white p-4">
        <p>No coins available.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 mt-4 px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const coinCount = coins.length;
  const amountPerCoin = trade.tradeAmount / coinCount; // Equal distribution per coin

  // Calculate random profit/loss for each coin, ensuring the total matches trade.profit
  const coinResults = coins.map((coin, idx) => {
    const maxVariation = amountPerCoin * 0.1; // ±10% of invested amount
    const randomProfit = Math.random() * 2 * maxVariation - maxVariation; // Random between -maxVariation and +maxVariation
    return {
      symbol: coin.symbol, // e.g., 'SOL'
      fullName: coin.name, // e.g., 'Solana'
      invested: amountPerCoin,
      profit: randomProfit,
      returned: amountPerCoin + randomProfit,
    };
  });

  // Adjust profits so the total matches trade.profit
  const currentTotalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);
  const adjustment = (trade.profit - currentTotalProfit) / coinCount; // Distribute the difference equally
  coinResults.forEach((result) => {
    result.profit += adjustment;
    result.returned = result.invested + result.profit;
  });

  // Verify the total profit matches trade.profit
  const totalProfit = coinResults.reduce((acc, cur) => acc + cur.profit, 0);

  return (
    <div className="bg-[#1a1a1a] text-white p-4 mx-auto rounded-lg shadow-lg">
      {/* Header section matching the image */}
    <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-3 ">
    <div className="relative w-10 h-7">
      <svg
        className="text-red-500 absolute left-0 top-0 w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
      <svg
        className="text-green-500 absolute left-5 top-0 w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
      
    </div>
   
    <div className='flex flex-col gap-2' >
      <p className="text-xl font-bold">Invest: ${trade.tradeAmount.toFixed(2)}</p>
      <p className="text-xl font-bold">Return: ${trade.returnAmount.toFixed(2)}</p>
       <p className="text-xl font-bold text-gray-400">Date: {trade.date}</p>
    </div>
  </div>
  <div className="text-right">
    <p
      className={`text-xl border !border-green-600 py-2 px-3 rounded-full ${
        trade.profit >= 0 ? 'text-green-500' : 'text-red-500'
      }`}
    >
      Profit: ${trade.profit.toFixed(2)}
    </p>
    
  </div>
</div>


      {/* Coin breakdown section matching the image */}
     <div className="space-y-3">
  {coinResults.map((item, idx) => (
    <div
      key={idx}
      className="flex items-center justify-between p-3 rounded-lg  border-b border-gray-700"
    >
      <div className="flex items-center gap-3">
        <img
          src={coinImages[item.symbol] || '/icons/fallback-coin.png'}
          alt={`${item.fullName} icon`}
          className="w-14 h-14"
          onError={(e) => {
            e.target.src = '/icons/fallback-coin.png';
          }}
        />
        <div>
          <p className="text-white text-xl">Invest on {item.fullName}</p>
          <p className="text-green-400 text-lg">Collect from {item.fullName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-300 text-xl">${item.invested.toFixed(6)}</p>
        <p className={item.profit >= 0 ? 'text-green-500 text-lg' : 'text-red-500 text-lg'}>
          ${item.returned.toFixed(6)}
        </p>
      </div>
    </div>
  ))}
</div>


      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className=" mt-4 px-6 py-3 bg-gray-500 text-xl rounded w-full"
      >
        Go Back
      </button>
    </div>
  );
};

export default BotTradehistoryDetails;
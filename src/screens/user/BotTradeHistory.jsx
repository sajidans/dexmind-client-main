// import React from 'react';
// import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const tradeData = [
//   {
//     tradeAmount: 100,
//     returnAmount: 102,
//     date: '31 May 25 (14:26)',
//     profit: 2.0,
//   },
//   {
//     tradeAmount: 190,
//     returnAmount: 193.8,
//     date: '20 April 25 (23:19)',
//     profit: 3.8,
//   },
//   {
//     tradeAmount: 100,
//     returnAmount: 105,
//     date: '20 April 25 (04:41)',
//     profit: 5.0,
//   },
//   {
//     tradeAmount: 100,
//     returnAmount: 100.2,
//     date: '20 April 25 (03:30)',
//     profit: 0.2,
//   },
//   {
//     tradeAmount: 100,
//     returnAmount: 102,
//     date: '31 May 25 (14:26)',
//     profit: 2.0,
//   },
//   {
//     tradeAmount: 190,
//     returnAmount: 193.8,
//     date: '20 April 25 (23:19)',
//     profit: 3.8,
//   },
//   {
//     tradeAmount: 100,
//     returnAmount: 105,
//     date: '20 April 25 (04:41)',
//     profit: 5.0,
//   },
//   {
//     tradeAmount: 100,
//     returnAmount: 100.2,
//     date: '20 April 25 (03:30)',
//     profit: 0.2,
//   },
// ];

// const BotTradeHistory = () => {
//     const navigate = useNavigate()
//   return (
//     <div className="bg-black text-white p-4 mx-auto rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-4">Bot Trade History</h2>
//       <div className="space-y-4">
//         {tradeData.map((trade, index) => (
//           <div key={index}>
//             {/* Trade Card */}
//             <div className="flex items-start  justify-between bg-black p-3 rounded-md">
//               <div className="flex items-center gap-5">
//                 {/* ⬇️⬆️ Larger Icons */}
//                 <div className="relative w-7 h-7 "> {/* Increased icon container size */}
//                   <FaArrowDown className="text-red-500 absolute left-0 top-0 text-3xl" /> 
//                   <FaArrowUp className="text-green-500 absolute left-5 top-0 text-3xl" /> 
//                 </div>

//                 {/* Trade Info */}
//                 <div className="flex flex-col gap-1">
//                   <span className="text-xl">
//                     Trade Amount: ${trade.tradeAmount.toFixed(2)}
//                   </span>
//                   <span className="text-xl">
//                     Return Amount: ${trade.returnAmount.toFixed(2)}
//                   </span>
//                   <span className="text-xl">Date: {trade.date}</span>
//                 </div>
//               </div>

//               {/* Profit Info & Button */}
//               <div className="flex flex-col items-end gap-2">
//                 <span className="text-green-600 border !border-green-700 text-xl px-3 py-1 rounded-full mb-2">
//                   Profit: ${trade.profit.toFixed(2)}
//                 </span>
//                <button
//   className="bg-gray-700 hover:bg-gray-600 text-white text-lg px-3 py-1 rounded"
//   onClick={() =>
//     navigate("/bot_trade_history_details", {
//       state: {
//         trade: trade,
//       },
//     })
//   }
// >
//   See Details
// </button>

//               </div>
//             </div>

//             {/* 🔽 Horizontal line after each entry */}
//             <hr className="border-gray-400 my-2" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BotTradeHistory;w



import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getBotTradeHistory } from '../../api/user-api';
import PageLoader from '../../components/ui/PageLoader';

const BotTradeHistory = () => {
  const navigate = useNavigate();

  const [tradeData, setTradeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBotTradeHistory();
        if (response?.success) {
          setTradeData(response.data || []);
        } else {
          console.error('Failed to load trade data');
        }
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="bg-black text-white p-4 mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Bot Trade History</h2>
      <div className="space-y-4">
        {tradeData.map((trade) => {
          const tradeAmount = trade.investment || 0;
          const profit = trade.roiAmount || 0;
          const returnAmount = tradeAmount + profit;
          const date = new Date(trade.creditedOn).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }); // Format: "09 Jun 25, 18:24"

          return (
            <div key={trade._id}>
              <div className="flex items-start justify-between bg-black p-3 rounded-md">
                <div className="flex items-center gap-5">
                  <div className="relative w-7 h-7">
                    <FaArrowDown className="text-red-500 absolute left-0 top-0 text-3xl" />
                    <FaArrowUp className="text-green-500 absolute left-5 top-0 text-3xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">
                      Trade Amount: ${tradeAmount.toFixed(2)}
                    </span>
                    <span className="text-xl">
                      Return Amount: ${returnAmount.toFixed(2)}
                    </span>
                    <span className="text-xl">Date: {date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`text-xl px-3 py-1 rounded-full border ${
                      profit >= 0
                        ? 'text-green-600 border-green-700'
                        : 'text-red-600 border-red-700'
                    }`}
                  >
                    Profit: ${profit.toFixed(2)}
                  </span>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xl px-3 py-1 rounded"
                    onClick={() =>
                      navigate('/bot-trade-history-details', {
                        state: {
                          trade: {
                            tradeAmount,
                            returnAmount,
                            profit,
                            date,
                            ...trade,
                          },
                        },
                      })
                    }
                  >
                    See Details
                  </button>
                </div>
              </div>
              <hr className="border-gray-400 my-2" />
            </div>
          );
        })}
      </div>
      <div className="h-20" />
    </div>
  );
};

export default BotTradeHistory;

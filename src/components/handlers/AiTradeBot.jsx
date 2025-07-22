import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getcollectProfit } from '../../api/user-api'; // ✅ imported API function


const AiTradeBot = () => {
  const [orderBook, setOrderBook] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isTrading, setIsTrading] = useState(false);
  const [showProfitButton, setShowProfitButton] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo?.user?.level);
  // console.log(userInfo)

  // WebSocket Connection to Binance for BTC/USDT
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth5@100ms');
    ws.onmessage = (event) => {
        const depth = JSON.parse(event.data);
        
       
      const bids = depth.bids.slice(0, 5);
      const asks = depth.asks.slice(0, 5);
      setOrderBook(bids.map((bid, i) => ({
        bidQty: bid[1],
        bidPrice: bid[0],
        askPrice: asks[i]?.[0] || '',
        askQty: asks[i]?.[1] || ''
      })));
    };
    return () => ws.close();
  }, []);

  const startTrade = () => {
    setIsTrading(true);
    setTimer(50);
    setShowProfitButton(false);
  };

  useEffect(() => {
    if (isTrading && timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && isTrading) {
      setShowProfitButton(true);
    }
  }, [isTrading, timer]);

  const collectProfit = async () => {
    try {
      const response = await getcollectProfit(); // ✅ imported API function
  
      if (response.success) {
        Swal.fire({
          title: '✅ Profit Collected!',
          text: response.message || 'You have collected your profit.',
          icon: 'success',
          background: '#0f172a',
          color: '#22d3ee',
        });
  
        setIsTrading(false);
        setShowProfitButton(false);
      } else {
        Swal.fire({
          title: ' Failed!',
          text: response.message || 'Something went wrong!',
          icon: 'error',
          background: '#0f172a',
          color: '#f87171',
        });
      }
    } catch (error) {
      Swal.fire({
        title: '🚫 Error!',
        text: error.response?.data?.message || error.message || 'API request failed.',
        icon: 'error',
        background: '#0f172a',
        color: '#f87171',
      });
    }
  };
  
  const profitRangeMap = {
    0: "0.8% - 1.2%",
    1: "1.5% - 2.1%",
    2: "2.0% - 2.8%",
    3: "2.5% - 3.5%",
    4: "3.0% - 4.2%",
    5: "4.0% - 5.5%",
    6: "5.0% - 6.5%",
  };

  return (
    <div className="bg-black  text-white font-mono p-4 flex flex-col items-center animate-fade-in">
      {/* Header */}
      <div className="w-full bg-zinc-900/80 p-4 rounded-xl shadow-lg border border-teal-500">
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-teal-400 text-xl font-bold tracking-wide">⚡ AI TRADE BOT</h1>
      <span className="bg-green-700 text-xs px-3 py-1 rounded-full">
        LEVEL {userInfo}
      </span>
    </div>

    <div className="flex justify-between text-xs text-gray-400">
      <span>Profit Range:</span>
      <span className="text-green-300">
        {profitRangeMap[userInfo] || "N/A"}
      </span>
    </div>
  </div>
);

      {/* Order Book */}
      <div className="mt-4 w-full  bg-zinc-900/70 p-4 rounded-xl border border-gray-700 shadow-inner">
        <div className="text-[1.1rem] text-center text-gray-300 mb-2">🧮 Live BTC/USDT Order Book</div>
        <div className="grid grid-cols-4 text-xs text-gray-500 border-b border-gray-700 pb-1 mb-1">
          <span>Qty</span>
          <span>Price</span>
          <span>Price</span>
          <span>Qty</span>
        </div>
        {orderBook.map((item, i) => (
          <div key={i} className="grid grid-cols-4 text-[1.1rem] py-1 animate-pulse">
            <span className="text-green-400">{parseFloat(item.bidQty).toFixed(3)}</span>
            <span className="text-green-300">{parseFloat(item.bidPrice).toFixed(2)}</span>
            <span className="text-red-300">{parseFloat(item.askPrice).toFixed(2)}</span>
            <span className="text-red-400">{parseFloat(item.askQty).toFixed(3)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-6 items-center justify-center">
  {/* Ai Trade Button */}
  <button onClick={startTrade} className="btn1 flex items-center justify-center gap-2 w-1/2">
 AI Trade
  </button>

  {/* Timer */}
  <div className="text-2xl text-green-400 font-mono w-12 text-center">
    {isTrading ? `${timer}s` : ''}
  </div>

  {/* Collect Profit Button (always visible, enabled only after timer = 0) */}
  <button
    onClick={collectProfit}
    disabled={timer > 0}
    className={`btn2 font-semibold px-4 py-2  shadow-md transition-all duration-300 ${
      timer > 0
        ? 'bg-gray-400 cursor-not-allowed text-white'
        : 'bg-green-500 hover:bg-green-400 text-black animate-pulse ring-2 ring-green-500 ring-offset-2'
    }`}
  >
    Collect Profit
  </button>
</div>



      {/* Description */}
      <div className="mt-4 text-center text-[1.1rem] text-gray-400 ">
        Your trade profit will be automatically calculated after 30 seconds based on market depth. Level up to increase daily yield.
      </div>

      
    </div>
  );
};


export default AiTradeBot;

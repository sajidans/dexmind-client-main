import React, { useState } from 'react';
import { CryptoList } from '../screens/user/CryptoList';

const categories = [
  'All',
  'Top Gainers',
  'Top Losers',
  'Watchlist',
  'Futures',
  'Penny Coins',
  'Newly Listed Coins',
  'Memes',
  'AI',
  'Real World Assets',
];

const Market = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="p-4 min-h-screen rounded-2xl text-white">
      <div className="w-full mb-8 bg-[#151515] rounded-2xl shadow-lg">
        <div className="p-8">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#01EBE0] text-black'
                    : 'bg-[#1a3c4d] text-white hover:bg-[#01EBE0] hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-[2rem] font-semibold mb-4">Crypto</h2>

          {/* Crypto List Component */}
          <CryptoList category={activeCategory} />
        </div>
      </div>
    </div>
  );
};

export default Market;

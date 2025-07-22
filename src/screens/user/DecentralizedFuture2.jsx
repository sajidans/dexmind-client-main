import React from "react";
import b1 from "../../assets/website/Group 1321317423.png";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChevronDown } from "react-icons/fa";

const data = [
  { name: "Mon", value: 41000 },
  { name: "Tue", value: 34500 },
  { name: "Wed", value: 50000 },
  { name: "Thu", value: 62500 },
  { name: "Fri", value: 47500 },
  { name: "Sat", value: 32500 },
  { name: "Sun", value: 62458 },
];

const DecentralizedFuture2 = () => {
  return (
    <>
      {/* Section 1: Chart */}
      <section className="bg-[#151515] overflow-x-hidden text-white py-16 px-6 md:px-[13rem]">
        <div className="text-center mb-12">
          <h6 className="gradient-text text-lg font-semibold">
            Decentralized Future
          </h6>
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-bold mt-4">
            Real-Time Exchange Rates
          </h2>
          <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Track Bitcoin's market price live and explore our interactive chart to stay informed and make smarter crypto decisions.
          </p>
        </div>

        <div className="bg-[#1E1E1E] mx-auto rounded-2xl p-6 sm:p-10 w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <img src={b1} alt="BTC" className="w-[3.5rem]" />
              <p className="text-xl font-medium">1 BTC = $32,458.00</p>
            </div>
            <div className="flex items-center text-white border border-[#3a3a3a] px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#2c2c2c]">
              This Week <FaChevronDown className="ml-2" />
            </div>
          </div>

          {/* Chart */}
          <div className="h-[300px] w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF5F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00FF5F" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#999" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#333" }}
                  labelStyle={{ color: "#00FF5F" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00FF5F"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 2: CTA */}
      <section className="bg-[#1D1E1E] text-white py-16 px-6 md:px-[13rem] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h6 className="gradient-text text-lg font-semibold">DIGITAL EXPERIENCE</h6>
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-bold mt-4 leading-tight">
            Join the Web3 <br />
            Revolution with Next3Gen
          </h2>
          <p className="text-xl text-gray-300 mt-4">
            Discover a new era of digital finance powered by blockchain. Experience decentralization, security, and control like never before with our user-friendly Web3 platform.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="custom-gradient-button text-white px-6 py-3 text-lg rounded-full font-medium">
              Get Started For Free
            </button>
            <button className="px-7 text-lg py-3 rounded-full bg-[#292929] hover:bg-[#383838] text-white font-semibold transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DecentralizedFuture2;

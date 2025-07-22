import React from "react";

const Investplans = () => {
  return (
    <div className="bg-[#25272D] h-[40rem] w-[25rem] rounded-3xl overflow-hidden">
      <div className="bg-[#34384C] h-1/2 py-4  flex-col justify-center items-center text-3xl">
        <h4 className="text-center ">Ethereum Staking</h4>
        <h5 className="text-center mt-4 text-[#C4C4C4]">ETH</h5>
      </div>
      <div className=" bg-[#25272D] h-1/2 p-10">
        <div className="flex justify-between items-center text-xl mb-4">
          <p>Monthly Profit </p>
          <p>0.24</p>
        </div>
        <div className="flex justify-between items-center text-xl mb-4">
          <p>Required Amount </p>
          <p>3 ETH</p>
        </div>
        <div className="flex justify-between items-center text-xl mb-4">
          <p>Hold Period, Days </p>
          <p>60</p>
        </div>
        <button className="px-4 py-4 w-full text-2xl  border  rounded-3xl">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Investplans;

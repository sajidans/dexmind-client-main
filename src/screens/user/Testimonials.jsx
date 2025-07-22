import React from "react";
import cardimg from "../../assets/website/Group 1321317301.png";

const Testimonials = () => {
  return (
    <section className="bg-[#151515] text-white py-16 px-6 md:px-[13rem]">
      {/* Top Heading */}
      <div className="flex flex-col items-center mb-10 text-center">
        <h6 className="gradient-text text-lg font-semibold">Testimonials</h6>
        <h2 className="text-[2.5rem] sm:text-[3.5rem] font-bold mt-4">
          What our customers say
        </h2>
        <p className="text-xl sm:text-2xl mt-4 max-w-3xl">
          Web3Go has transformed how our team interacts with blockchain. The
          platform’s simplicity and powerful tools make it a must-have for
          anyone exploring decentralized tech.
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="border border-[#333] rounded-3xl p-10 sm:p-[5rem] flex flex-col items-center text-center mt-5">
        <img src={cardimg} alt="User Avatar" className="w-[4rem] mb-8" />
        <h4 className="text-2xl sm:text-[2rem] font-semibold">
          Web3Go is my go-to platform for all things blockchain
        </h4>
        <p className="text-lg sm:text-xl mt-4 max-w-2xl">
          From real-time analytics to intuitive UI, Web3Go makes it easy to
          explore the decentralized world. Highly recommend it to developers
          and enthusiasts alike!
        </p>
      </div>
    </section>
  );
};

export default Testimonials;

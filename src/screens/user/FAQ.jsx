import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import countrybgimg2 from "../../assets/countrybgimg2.png";

const faqs = [
  {
    question: "The expense windows adapted sir. Wrong widen drawn.",
    answer:
      "Offending belonging promotion provision an be oh consulted ourselves it. Blessing welcomed ladyship she met humoured sir breeding her.",
  },
  {
    question: "Six curiosity day assurance bed necessary?",
    answer:
      "Unlike volatile assets like Bitcoin or Ethereum, NexoCoin is a stablecoin — designed to maintain a consistent value, offering a reliable option for trading, hedging, and DeFi use cases.",
  },
  {
    question: "Produce say the ten moments parties?",
    answer:
      "Details about its stability mechanism are crucial — whether it is pegged to fiat currencies or backed by assets. Always research to understand how NexoCoin maintains its consistent value.",
  },
  {
    question: "Simple innate summer fat appear basket his desire joy?",
    answer:
      "Currently, NexoCoin is exclusively available for trading on the official NexoInvest platform: www.nexoinvest.org.",
  },
  {
    question: "Outward clothes promise at gravity do excited?",
    answer:
      "Before investing, it's important to check for transparency, the team's credibility, platform security, and the regulatory status of NexoCoin in your region.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#151515] sm:min-h-screen py-14 flex items-center justify-center px-4 relative">
      <div className="w-full max-w-6xl z-20">
        <h6 className="text-center gradient-text text-lg font-semibold">
          Frequently Asked Questions
        </h6>
        <h2 className="text-white text-[2.5rem] sm:text-[4rem] font-bold text-center mb-4">
          Questions & Answers
        </h2>
        <p className="text-center text-lg sm:text-xl my-4 max-w-3xl mx-auto text-gray-300">
          Everything you need to know about NexoCoin, its stability, usage, and
          availability. If you have more questions, feel free to reach out.
        </p>

        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 relative z-50">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full bg-[#232323] hover:bg-[#1b1b1b] text-white text-left p-5 rounded-xl flex justify-between items-center text-xl transition duration-300"
            >
              <span>{faq.question}</span>
              <FaChevronDown
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="bg-[#1a1a1a] text-gray-300 text-lg p-5 rounded-b-xl transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {/* Optional background image if needed */}
        {/* <img
          src={countrybgimg2}
          className="absolute bottom-0 right-0 z-10 w-[70rem] opacity-10 pointer-events-none"
          alt=""
        /> */}
      </div>
    </div>
  );
}

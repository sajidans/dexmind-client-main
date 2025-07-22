import t1 from "../../assets/website/t1.png";
import t2 from "../../assets/website/t2.png";
import t3 from "../../assets/website/t3.png";
import tl from "../../assets/website/Group 1321317279.png";
import t4 from "../../assets/website/t4.png";
import t5 from "../../assets/website/t5.png";
import t6 from "../../assets/website/t6.png";
import "../../styles/buttons.css";

const AdvancedFeatures = () => {

  const advancedFeaturedData = [
    {
      id: 1,
      src: t1,
      value: "+34.89%",
    },
    {
      id: 2,
      src: t2,
      value: "$3.67",
    },
    {
      id: 3,
      src: t3,
      value: "$3.67",
    },
  ];


  const tokenData = [
    { img: t1, value: "+34.89" },
    { img: t2, value: "+3.67" },
    { img: t3, value: "+3.67" },
    { img: t4, value: "+34.89" },
    { img: t5, value: "+3.67" },
    { img: t6, value: "+3.67" },
  ];

  return (
    <section className="bg-[#151515] relative text-white py-16 px-6 md:px-[13rem] ">
      {/* Top  Heading */}
      <div className="flex-col justify-center items-center mb-10">
        <h6 className="text-center gradient-text">ADVANCED FEATURES</h6>
        <h2 className="text-[3.5rem] text-center mt-4">
          Explore the Decentralized Future
        </h2>
        <p className="text-center text-2xl mt-4 ">
          Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci.
          <br /> At feugiat duis parturient amet scelerisque enim vulputate
          tortor.
        </p>
      </div>

      {/* part 1 */}

      <div
        id="part1"
        className="w-full h-full flex mt-10 max-sm:flex-col max-sm:gap-8"
      >
        {/* left */}
        <div className="w-1/2 p-10 max-sm:w-full max-sm:px-4">
          <div className="border border-[#494848] p-10 rounded-3xl">
            <div className="border border-[#464646] p-10 rounded-3xl">
              <h6 className="text-[2rem]">Transactions</h6>
              <p className="text-[1.5rem] mt-10">Today</p>
              <div>
                {advancedFeaturedData.map((item) => (
                  <div className="border border-[#464646] p-8 mt-10 rounded-3xl flex items-center justify-between" key={item.id}>
                    <img src={item.src} alt="" className="w-[3rem]" />
                    <p className="text-xl">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-1/2 p-10 flex items-center max-sm:w-full max-sm:p-4">
          <div className="bg-[#1F1F20B2] p-10 max-sm:p-6">
            <h3 className="text-[2.7rem] max-sm:text-[2rem]">
              Access Cutting-Edge Financial Tools and Services
            </h3>
            <p className="text-[1.6rem] mt-10 max-sm:text-sm">
              Access and interact with multiple blockchains
            </p>

            <div className="w-full flex items-center justify-center gap-10 mt-10 max-sm:flex-col max-sm:gap-4">
              <div className="w-1/2 max-sm:w-full">
                <img src={tl} alt="" className="w-[7rem] max-sm:w-[5rem]" />
                <h6 className="text-[1.5rem] mt-4 max-sm:text-base">
                  Yield Farming
                </h6>
                <p className="text-[1rem] mt-4 max-sm:text-sm">
                  Participants in Yield farming have the opportunity to earn
                  returns
                </p>
              </div>
              <div className="w-1/2 max-sm:w-full">
                <img src={tl} alt="" className="w-[7rem] max-sm:w-[5rem]" />
                <h6 className="text-[1.5rem] mt-4 max-sm:text-base">
                  Yield Farming
                </h6>
                <p className="text-[1rem] mt-4 max-sm:text-sm">
                  Participants in Yield farming have the opportunity to earn
                  returns
                </p>
              </div>
            </div>

            <button className="black_btn px-6 py-3 text-[1rem] mt-10 max-sm:px-4 max-sm:py-2">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* part 2 */}

      <div
        id="part2"
        className="w-full h-full flex mt-10 max-sm:flex-col max-sm:gap-8"
      >
        {/* part2 left */}
        <div className="w-1/2 p-10 flex items-center max-sm:w-full max-sm:px-4">
          <div>
            <h3 className="text-[2.7rem] max-sm:text-2xl">
              Seamless Multi- <br />
              Chain Integration
            </h3>
            {/* Points */}
      <div className="text-[1.4rem] max-sm:text-xl max-w-2xl">
        {[
          "Connect effortlessly to Ethereum, Polygon, and Binance Smart Chain from one platform.",
          "Access a variety of dApps across chains without switching networks.",
          "Enjoy faster, cheaper transactions by leveraging each blockchain’s strengths.",
          "Transfer, stake, or swap tokens across chains with full interoperability.",
          "Explore DeFi, NFTs, and more with a unified, user-friendly interface.",
        ].map((item, index) => (
          <p key={index} className="mt-4 leading-snug">
            {item}
          </p>
        ))}
      </div>
            <button className="black_btn px-6 py-3 text-[1.2rem] rounded-full mt-10 max-sm:px-4 max-sm:py-2">
              Learn More
            </button>
          </div>
        </div>

        {/* part3 right */}
        <div className="w-1/2 p-10 max-sm:w-full max-sm:px-4">
          <div className="border border-[#494848] p-10 rounded-3xl">
            {tokenData.map((token, index) => (
              <div
                key={index}
                className="bg-[#262626] px-6 py-4 rounded-3xl flex items-center justify-between mt-4"
              >
                <img src={token.img} alt={`token-${index + 1}`} className="w-[3rem]" />
                <p className="text-[1rem] mr-[3rem]">{token.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* part 3 */}

      <div
        id="part3"
        className="w-full h-full flex mt-10 max-sm:flex-col-reverse max-sm:gap-8"
      >
        {/* part3 left */}
       <div className="w-full lg:w-3/5 p-6 sm:p-10 max-sm:px-4">
  <div className="border border-[#494848] p-8 sm:p-10 rounded-3xl">
    <div className="border border-[#464646] p-8 sm:p-10 rounded-3xl">
      <p className="text-2xl sm:text-3xl font-semibold">Selling</p>
      <div className="flex gap-5 items-center mt-6">
        <img src={t1} alt="" className="w-[3rem] sm:w-[4rem]" />
        <p className="text-lg sm:text-xl">Learn More</p>
      </div>
    </div>

    <div className="border border-[#464646] p-8 sm:p-10 rounded-3xl mt-6">
      <p className="text-2xl sm:text-3xl font-semibold">Selling</p>
      <div className="flex gap-5 items-center mt-6">
        <img src={t1} alt="" className="w-[3rem] sm:w-[4rem]" />
        <p className="text-lg sm:text-xl">Learn More</p>
      </div>
    </div>
  </div>
</div>


        {/* part3 right */}
        <div className="w-1/2 p-10 flex items-center max-sm:w-full max-sm:px-4 max-sm:flex-col">
          <div>
            <h3 className="text-[2.7rem] max-sm:text-xl">
              Seamless Multi- <br />
              Chain Integration
            </h3>
           <div>
  {[
    "Effortlessly connect and operate across multiple blockchains. Enjoy smooth compatibility and interoperability with leading networks.",
    "Experience secure and efficient transactions, no matter which chain you prefer. Our platform adapts to your needs with ease.",
    "Unlock the full potential of decentralized ecosystems with one-click integration and cross-chain functionality."
  ].map((item, index) => (
    <p key={index} className="mt-4 text-xl max-sm:text-sm">
      {item}
    </p>
  ))}
</div>


            <button className="black_btn px-6 py-3 text-[1.2rem] mt-10 max-sm:px-4 max-sm:py-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;

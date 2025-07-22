import aboutimg1 from "../../assets/aboutimg1.png";
import vector from "../../assets/Vector.png";
import cardbg from "../../assets/website/bgcard.png";
import card1 from "../../assets/website/card1.png";
import card2 from "../../assets/website/card2.png";

const About = () => {
  return (
    <>
      <section className="bg-[#151515] relative text-white py-16 px-6 md:px-[13rem] ">
        <div className="w-full h-full bg-[#1f2022] rounded-3xl ">
          {/* top  */}
          <div
            id="top"
            className="flex w-full mt-[5rem] h-full max-sm:flex-col max-sm:items-center max-sm:text-center"
          >
            <div
              id="top-left"
              className="w-1/2 pt-[10rem] pl-20 max-sm:w-full max-sm:pt-10 max-sm:pl-4 max-sm:pr-4"
            >
              <h6 className="gradient-text text-xl sm:text-2xl">
                Digital Experience
              </h6>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl mt-4 max-sm:text-3xl">
                Intuitive design for navigation and interaction.
              </h3>
              <p className="text-xl sm:text-2xl mt-4 max-sm:text-lg">
                Whether You are a beginner or an expert, our platform supports
                various popular wallets to ensure easy integration.
              </p>
            </div>

            <div
              id="topright"
              className="w-1/2 relative top-[-12rem] max-sm:top-0 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:mt-6"
            >
              <img
                src={aboutimg1}
                alt="about image"
                className="abslute z-90 ml-20 w-[37rem] max-sm:ml-0 max-sm:w-64"
              />
            </div>
          </div>

          {/* bottom  */}
          <div
            id="bottom"
            className="w-full relative flex justify-center items-center h-[15rem] pl-20 max-sm:flex-col max-sm:pl-4 max-sm:pr-4 max-sm:h-auto max-sm:gap-6"
          >
            <div id="bleft" className="w-1/3 max-sm:w-full max-sm:text-center">
              <button className="custom-gradient-button text-lg sm:text-xl max-sm:w-full">
                Get Started For Free
              </button>
              <p className="text-xl sm:text-2xl mt-4 max-sm:text-lg">
                No Account Needed to Start
              </p>
            </div>

            <div
              id="bright"
              className="w-2/3 flex h-full gap-10 p-10 bg-[#151515] rounded-tl-3xl 
               max-sm:w-full max-sm:flex-col max-sm:gap-4 max-sm:p-4 max-sm:rounded-tl-xl"
            >
              <div className="w-full sm:w-3/4 md:w-1/2 bg-[#1f2022] rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg max-sm:w-full">
                <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                  <img
                    src={vector}
                    alt="Wallet connection icon"
                    className="w-5 sm:w-6 md:w-7 h-auto"
                  />
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    Connect Your Wallet
                  </h4>
                </div>
                <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-white/80 max-sm:text-sm">
                  Securely connect your crypto wallet to start managing your assets and accessing exclusive features. Fast, safe, and seamless.
                </p>
              </div>
              <div className="w-full sm:w-3/4 md:w-1/2 bg-[#1f2022] rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg max-sm:w-full">
                <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                  <img
                    src={vector}
                    alt="Wallet connection icon"
                    className="w-5 sm:w-6 md:w-7 h-auto"
                  />
                  <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    Explore Decentralized Apps
                  </h4>
                </div>
                <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-white/80 max-sm:text-sm">
                  Explore Decentralized Apps
Discover and interact with powerful decentralized applications. Seamlessly connect your wallet to experience the future of Web3 technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DECENTRALIZED FUTURE */}
        <div className="relative h-[25rem] py-24">
          {/* overlay  rotate  */}
          <div
            id="overlay"
            className="w-[16rem]  h-[16rem] rounded-full bg-[#2a2a2a] absolute opacity-50 animate-orbit"
          ></div>
          {/* DECENTRALIZED FUTUREs */}

          <div className="absolute text-center text-white">
            <h6 className="text-start text-[#86D9EE] text-2xl sm:text-3xl mt-10">
              DECENTRALIZED FUTURE
            </h6>
            <h2 className="text-white font-poppins text-5xl sm:text-6xl lg:text-7xl font-semibold leading-normal text-start mt-4">
              Empower your digital <br /> experience with Web3Go
            </h2>

            <p className="text-start text-xl sm:text-2xl mt-4">
              Whether you are a beginner or an expert, our platform supports{" "}
              <br /> various popular wallets to ensure easy integration.
            </p>
          </div>
        </div>
      </section>
      {/* cards  */}
      <section className="bg-[#151515] relative text-white py-16 px-6 md:px-[13rem]">
        <div
          id="cards"
          className="flex justify-center items-center gap-20 mt-20 max-sm:flex-col max-sm:gap-8 max-sm:mt-8"
        >
          <div className="w-1/2 max-sm:w-full">
            <div
              id="leftcard"
              className="bg-[#1f1f20] rounded-3xl p-8 relative"
            >
              <p className="gradient-text text-xl sm:text-2xl">MULTI-CHAIN INTEGRATION</p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl max-sm:text-3xl">
                Seamless Multi-Chain Integration
              </h3>
              <p className="text-start text-xl sm:text-2xl mt-4 max-sm:text-lg">
                Access and interact with multiple blockchains effortlessly,
                allowing users to explore and interact with various ecosystems.
              </p>
              <div
                style={{
                  backgroundImage: `url(${cardbg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="flex justify-center items-center mt-10 max-sm:mt-6"
              >
                <img
                  src={card1}
                  alt=""
                  className="w-[35rem] max-sm:w-full max-sm:h-[200px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 max-sm:w-full">
            <div
              id="leftcard"
              className="bg-[#1f1f20] rounded-3xl p-8 relative"
            >
              <p className="text-start gradient-text text-xl sm:text-2xl">
                MULTI-CHAIN INTEGRATION
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl max-sm:text-3xl">
                Seamless Multi-Chain Integration
              </h3>
              <p className="text-start text-xl sm:text-2xl mt-4 max-sm:text-lg">
                Access and interact with multiple blockchains effortlessly,
                allowing users to explore and interact with various ecosystems.
              </p>
              <div
                style={{
                  backgroundImage: `url(${cardbg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="flex justify-center items-center mt-10 max-sm:mt-6"
              >
                <img
                  src={card2}
                  alt=""
                  className="w-[29rem] max-sm:w-full max-sm:h-[200px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
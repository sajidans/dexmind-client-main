import { Link } from 'react-router-dom';

import img1 from "../../assets/website/img6.png";
import img2 from "../../assets/website/img7.png";
import img3 from "../../assets/website/img8.png";

const Benefits = () => {
const cardData = [
  {
    img: img1,
    title: "Decentralized Identity",
    desc: "Take control of your digital identity with secure and tamper-proof blockchain authentication. No more central authority—your identity is truly yours.",
    link: "/",
    imgWidth: "w-[16rem]",
  },
  {
    img: img2,
    title: "Decentralized Finance",
    desc: "Experience financial freedom through DeFi platforms that offer lending, borrowing, and trading without intermediaries or centralized control.",
    link: "/",
    imgWidth: "w-[16rem]",
  },
  {
    img: img3,
    title: "Decentralized Data Storage",
    desc: "Store your files and data securely on decentralized networks. Enjoy privacy, redundancy, and resilience beyond traditional cloud services.",
    link: "/",
    imgWidth: "w-[14rem]",
  },
];



  return (
    <section className="bg-[#151515] relative text-white py-16 px-6 md:px-[13rem] ">
      {/* Top  Heading */}
      <div className="flex-col justify-center items-center mb-10">
        <h6 className="text-center gradient-text">BENEFITS</h6>
        <h2 className="text-[3.5rem] text-center mt-4">
          Web3 revolution with Next3Gen{" "}
        </h2>
        {/* <p className="text-center text-xl mt-4 ">
          Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci.
          At feugiat <br />
          duis parturient amet scelerisque enim vulputate tortor.
        </p> */}
      </div>

      <div className="w-full gap-[5rem] flex justify-between items-center max-sm:flex-col max-sm:gap-8 max-sm:px-4">
        {cardData.map((card, index) => (
          <div key={index} className="w-1/3 p-4 border rounded-2xl max-sm:w-full">
            <img
              src={card.img}
              alt={`card-${index + 1}`}
              className={`${card.imgWidth} max-sm:w-full max-sm:h-auto`}
            />
            <h3 className="text-[1.8rem] mt-4">{card.title}</h3>
            <p className="text-[1.3rem] my-4">{card.desc}</p>
            <Link to={card.link} className="text-[1.2rem] text-blue-400 hover:underline">
              Learn More <span>&gt;</span>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Benefits;

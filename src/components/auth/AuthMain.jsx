/* eslint-disable react/prop-types */
import img from "../../assets/Rectangle 001.png";
import logo from "../../assets/logo.png";

const AuthMain = ({ inner }) => {
  return (
    <div
      data-aos="fade-right"
      className="min-h-screen p-4 md:p-10 bg-[#141518] flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl border-2 rounded-[2.5rem] border-[#06C755] bg-[#141518] overflow-hidden">

        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-4 md:p-10">
          <img
            src={img}
            alt="side img"
            className="w-full h-64 md:h-full object-cover rounded-2xl"
          />
          <img
            src={logo}
            alt="T_image"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 md:w-48"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10">
          <div className="w-full">{inner}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthMain;

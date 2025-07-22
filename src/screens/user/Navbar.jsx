import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="text-white px-4 py-3 shadow-md relative z-50">
      <div className="mx-auto flex items-center justify-between w-full px-4 py-4">
        {/* Logo */}
        <div className="flex items-center w-1/3 relative">
          <img src={logo} alt="T_image" className="w-[12rem] mt-2 p-4 absolute" />
        </div>

        {/* Center Nav (visible on large and up) */}
        <div
          className="w-full hidden lg:flex justify-center px-4 lg:space-x-8 py-4 rounded-2xl bg-transparent backdrop-blur-sm"
          style={{
            borderRadius: "1.10438rem",
            boxShadow: `
              0px -16.934px 18.407px 0px rgba(255, 255, 255, 0.10) inset,
              0px -26.505px 22.088px 0px rgba(0, 0, 0, 0.15) inset,
              0px -58.165px 29.451px 0px rgba(0, 0, 0, 0.10) inset,
              0px 1.473px 0.736px 0px rgba(0, 0, 0, 0.06),
              0px 2.945px 1.473px 0px rgba(0, 0, 0, 0.09),
              0px 5.89px 2.945px 0px rgba(0, 0, 0, 0.09),
              0px 11.78px 5.89px 0px rgba(0, 0, 0, 0.09),
              0px 23.56px 11.78px 0px rgba(0, 0, 0, 0.09)
            `,
          }}
        >
          <a
            href="#"
            className="text-[#00d5e6] text-[1.5rem] font-semibold text-shadow-sm"
          >
            All Pages
          </a>
          <a
            href="#about"
            className="hover:text-[#00d5e6] text-[1.5rem] font-semibold text-shadow-sm"
          >
            Company
          </a>
          <a
            href="#faq"
            className="hover:text-[#00d5e6] text-[1.5rem] font-semibold text-shadow-sm"
          >
            Solutions
          </a>
          <a
            href="#contact"
            className="hover:text-[#00d5e6] text-[1.5rem] font-semibold text-shadow-sm"
          >
            Contact us
          </a>
        </div>

        {/* Button (visible on large and up) */}
        <div className="hidden lg:flex justify-end w-1/3">
          <button
            onClick={() => navigate(`${token ? "/dashboard" : "/login"}`)}
            className="ml-4 px-6 py-3 font-semibold rounded-xl text-[1.5rem] bg-transparent border border-[#00d5e6] hover:bg-[#0B020D]/20 transition backdrop-blur-sm text-shadow-sm"
            style={{
              borderRadius: "1.10438rem",
              boxShadow: `
                0px -16.934px 18.407px 0px rgba(255, 255, 255, 0.10) inset,
                0px -26.505px 22.088px 0px rgba(0, 0, 0, 0.15) inset,
                0px -58.165px 29.451px 0px rgba(0, 0, 0, 0.10) inset,
                0px 1.473px 0.736px 0px rgba(0, 0, 0, 0.06),
                0px 2.945px 1.473px 0px rgba(0, 0, 0, 0.09),
                0px 5.89px 2.945px 0px rgba(0, 0, 0, 0.09),
                0px 11.78px 5.89px 0px rgba(0, 0, 0, 0.09),
                0px 23.56px 11.78px 0px rgba(0, 0, 0, 0.09)
              `,
            }}
          >
            {token ? "Dashboard" : "Join for free"}
          </button>
        </div>

        {/* Mobile/Tablet Menu Button (shown below lg) */}
        <div className="lg:hidden z-50">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Mobile/Tablet Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-2/4 max-w-[300px] bg-transparent text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col items-center ease-in-out lg:hidden px-5 py-12 space-y-12 text-left text-[1.8rem] backdrop-blur-sm`}
      >
        <img src={logo} className="w-[80%]" alt="logo" />
        <a
          href="#"
          className="block text-[#00d5e6] font-semibold text-shadow-sm"
          onClick={() => setIsOpen(false)}
        >
          All Pages
        </a>
        <a
          href="#about"
          className="block hover:text-[#00d5e6] font-semibold text-shadow-sm"
          onClick={() => setIsOpen(false)}
        >
          Company
        </a>
        <a
          href="#faq"
          className="block hover:text-[#00d5e6] font-semibold text-shadow-sm"
          onClick={() => setIsOpen(false)}
        >
          Solutions
        </a>
        <a
          href="#contact"
          className="block hover:text-[#00d5e6] font-semibold text-shadow-sm"
          onClick={() => setIsOpen(false)}
        >
          Contact us
        </a>

        <button
          onClick={() => handleNavigate(token ? "/dashboard" : "/login")}
          className="mt-4 w-full py-4 font-semibold rounded-xl transition-all duration-300 bg-transparent border border-[#00d5e6] hover:bg-[#0B020D]/20 backdrop-blur-sm text-shadow-sm"
        >
          {token ? "Dashboard" : "Log in"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
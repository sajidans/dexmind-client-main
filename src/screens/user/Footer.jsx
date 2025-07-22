import { FaFacebook, FaPinterest, FaTelegram } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#151515] relative text-white py-[7rem] px-6 md:px-[13rem] ">
      <div className="mx-auto flex flex-col gap-10 md:flex-row md:justify-between md:items-start">
        {/* Company */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center w-1/3 my-5"  >
            <img src={logo} alt="T_image" className="w-[12rem] p-4 mb-5 absolute" />
          </div>

          <p className="lg:w-[25vw] text-start text-sm sm:text-base">
            Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.
            Gravida massa volutpat aenean odio erat nullam fringilla.
          </p>
          <div className="flex space-x-4 mt-5">
            <FaFacebookF className=" text-2xl" />
            <FaInstagram className=" text-2xl" />
            <FaTwitter className=" text-2xl" />
            <FaLinkedinIn className=" text-2xl" />
            <FaWhatsapp className=" text-2xl" />
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-semibold text-[1.5rem] mb-3 text-start md:text-left z-20">
            Menu
          </h3>
          <ul className="space-y-2 flex sm:flex-col gap-4  items-center sm:items-start text-[1.4rem] text-gray-300 text-start md:text-left z-20">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Solution Details </a>
            </li>
          </ul>
        </div>

        {/* Account / Socials */}
        <div>
          <h3 className="font-semibold text-[1.5rem] mb-3 text-start md:text-left z-20">
            Info
          </h3>
          <ul className="space-y-2 flex sm:flex-col gap-4  items-center sm:items-start text-[1.4rem] text-gray-300 text-start md:text-left z-20">
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Resourse  */}
        <div className="relative mr-[10rem]">
          <h3 className="font-semibold text-[1.5rem] mb-3 text-start md:text-left z-50 absolute">
            Resourse
          </h3>
          <ul className="space-y-2 flex sm:flex-col gap-4  items-center sm:items-start text-[1.4rem] text-gray-300 text-start md:text-left z-50 absolute mt-5">
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Blog Details</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
            <li>
              <a href="#">404</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright
      <div className="border-t border-gray-600 mt-10 pt-6 text-start text-[1.4rem] text-gray-400">
        © 2025 Nexo Coin. All Rights Reserved
      </div> */}
    </footer>
  );
}

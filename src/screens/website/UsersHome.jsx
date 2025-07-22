import React from "react";
import Navbar from "../user/Navbar";
import Hero from "../user/Hero";
import About from "../user/About";
import MT from "../user/MT";
import FAQ from "../user/FAQ";
import Footer from "../user/Footer";
import "../../styles/website/UserHome.css";
import AiBot from "../user/AiBot";
import Country from "../user/Country";
import Trades from "../user/Trades";
import Profitable from "../user/Profitable";
import AdvancedFeatures from "../user/AdvancedFeatures";
import Benefits from "../user/Benefits";
import DecentralizedFuture from "../user/DecentralizedFuture";
import Testimonials from "../user/Testimonials";
import DecentralizedFuture2 from "../user/DecentralizedFuture2";
import bottomimg from "../../assets/bottomimg.png";


const UsersHome = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <div id="about"><About /></div>
      <AdvancedFeatures/>
      <Benefits/>
      <DecentralizedFuture/>
      <Testimonials/>

      


      {/* <AiBot />
      <Country />
      <MT />
      <Trades />
      <Profitable /> */}
      <div id="faq"><FAQ /></div>
      <DecentralizedFuture2/>

      <div id="contact" className="relative">
        <img
          src={bottomimg}
          alt=""
          className="absolute bottom-[-25rem] w-[48rem] right-0 z-10 hidden sm:block"
        />
      </div>

      <div id="contact"><Footer /></div>
    </>
  );
};

export default UsersHome;

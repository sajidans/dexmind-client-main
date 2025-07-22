import React, { useRef, useEffect, useState } from "react";
import fram from "../../assets/website/fram.png";
import "../../styles/website/UserHome.css";
import countrybgimg2 from "../../assets/countrybgimg2.png";
import Navbar from "./Navbar";
import "../../styles/buttons.css";
// import video1 from "../../assets/0_Circuit Board_Technology_1920x1080.mp4";
import SupportForm from "../user/SupportForm"; // Ensure correct path
import { useNavigate } from "react-router-dom";
import AnnouncementBanner from "./AnnouncementBanner ";
import AnnouncementBannerPopup from "./AnnouncementBannerPopup";

const Hero = () => {
  const videoRef = useRef(null);
  const [isSupportFormOpen, setIsSupportFormOpen] = useState(false);
  const navigate =useNavigate();

  // Lazy load video when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Autoplay failed:", error);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full h-[100vh] text-white overflow-hidden"
      style={{
        backgroundImage: `url(${fram})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <img
        src={countrybgimg2}
        className="absolute bottom-0 right-0 z-10 w-[70rem]"
        alt="Background decoration"
      />
      {/* Overlay */}
      <div className="absolute w-full h-full py-16 px-6 bg-black opacity-50 z-10" />

      <Navbar />
      <AnnouncementBanner/>
      <AnnouncementBannerPopup/>
      {/* Content */}
      <div className="relative w-full py-5 sm:mt-0 z-20 px-6 md:px-[10rem] flex items-center justify-center sm:gap-20 gap-5 h-full max-sm:flex-col">
        {/* Left */}
        <div className="w-full sm:w-1/2 flex-col justify-center">
          <h1 className="text-white text-center md:!text-left font-switzer sm:font-bold font-semibold text-[5.625rem] max-sm:text-[3.5rem] max-sm:mt-20 sm:leading-normal leading-[5.625rem] max-sm:leading-tight">
            Unlock New Possibilities With Blockchain
          </h1> 
          <p className="text-[1.8rem] max-sm:text-[1.2rem] leading-10 max-sm:leading-6 mt-5 text-center md:!text-left">
            Experience the Future of the Internet with Secure, Transparent Solution
          </p>
          <div className="mt-5 flex items-center justify-center flex-col sm:flex-row sm:justify-start gap-5 w-full">
            <button onClick={()=>navigate("/login")} className="custom-gradient-button w-full sm:w-fit py-4">
              Get Started
            </button>
            {/* <button className="black_btn px-7 text-[1.5rem] w-full sm:w-fit py-4 text-white font-semibold">
              Get Started
            </button> */}
            <button
              className="black_btn px-7 text-[1.5rem] w-full sm:w-fit py-4 text-white font-semibold bg-black border border-white"
              onClick={() => {
                console.log("Support button clicked");
                setIsSupportFormOpen(true);
              }}
            >
              Support
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="w-full sm:py-[8rem] mb-[10rem] sm:w-1/2 md:w-[50%] md:h-[70%] flex justify-center items-center h-full">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/path/to/poster.jpg" // Replace with actual poster image path
            className="h-full w-full rounded-3xl shadow-lg !relative"
          >
            <source src={"https://ik.imagekit.io/sic56m8r1/0_Circuit%20Board_Technology_1920x1080%20copy.mp4?updatedAt=1748005670738"} type="video/mp4" />
            <p>
              Your browser does not support the video tag. Please{" "}
              <a href={"https://ik.imagekit.io/sic56m8r1/0_Circuit%20Board_Technology_1920x1080%20copy.mp4?updatedAt=1748005670738"}>download the video</a>.
            </p>
          </video>
        </div>
      </div>

      {/* Support Form */}
      {isSupportFormOpen && (
        <SupportForm onClose={() => setIsSupportFormOpen(false)} />
      )}
    </section>
  );
};

export default Hero;
/* eslint-disable react/prop-types */
// import bgVideo from '../assets/website/bgVideo.mp4';
import DashboardHeader from "../components/ui/DashboardHeader";
import Sidebar from "../components/ui/Sidebar";
import "../styles/DashboardMain.css";
const DashboardMain = ({ inner, name }) => {
  return (
    <>
      <div className="AuthMain1 bg-[linear-gradient(270deg,_#000909_6.06%,_#000908_55.87%,_#0C4132_99.95%)]">
         {/* <video autoPlay loop muted playsInline>
                  <source src={bgVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
        <div className="DashboardMain">
        <Sidebar />
        
        <div className="right-wrapper">
          <DashboardHeader name={name} />
          {inner}
        </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMain;

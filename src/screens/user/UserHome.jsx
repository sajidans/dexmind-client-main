import Swal from "sweetalert2";
import "../../styles/user/UserHome.css";
import SSDataTable from "../../components/SSDataTable";
import { Button5 } from "../../components/ui/Buttons";
import { useState, useEffect } from "react";
import cardImg from "../../assets/cardImg.png";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFunctions";
import { FaRegCopy } from "react-icons/fa6";
import { backendConfig } from "../../constants/content/MainContent";
import { claimRoi } from "../../api/user-api";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChevronDown } from "react-icons/fa";

const data = [
  { name: "Mon", value: 41000 },
  { name: "Tue", value: 34500 },
  { name: "Wed", value: 50000 },
  { name: "Thu", value: 62500 },
  { name: "Thu", value: 47500 },
  { name: "Thu", value: 32500 },
  { name: "Fri", value: 61800 },
  { name: "Sat", value: 43000 },
  { name: "Sun", value: 62458 },
];

const UserHome = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [copiedText1, setCopiedText1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClaimedToday, setIsClaimedToday] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );

  const location = window.location.origin;
  const referCode = `${location}/register?referral=${userInfo?.data?.referralCode}`;
  const user = userInfo?.data;

  const clickHandler = async () => {
    if (loading || isClaimedToday) return;

    setLoading(true);
    try {
      const res = await claimRoi();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data?.message || "ROI claimed successfully!",
      });
      setIsClaimedToday(true);
    } catch (error) {
      Swal.fire({
        icon: "info",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isClaimedToday) return;

    const currentTime = new Date();
    const nextMidnight = new Date(currentTime);
    nextMidnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = nextMidnight - currentTime;

    setTimeout(() => {
      setIsClaimedToday(false);
    }, timeUntilMidnight);
  }, [isClaimedToday]);

  const userData = {
    username: user?.username,
    date_of_joining: formatDate(user?.createdAt) || "NA",
    date_of_activation: user?.activeDate ? formatDate(user?.activeDate) : "NA",
    renewal_status: user?.status ? "Active" : "Inactive",
  };

  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const incomeData = [
    {
      title: "Total Balance",
      value: (user?.totalEarnings ?? 0).toFixed(2),
      img: "https://img.icons8.com/3d-fluency/94/money.png",
    },
    {
      title: "Total Depost",
      value: (user?.currentEarnings ?? 0).toFixed(2),
      img: "https://img.icons8.com/3d-fluency/94/coin-wallet.png",
    },
    {
      title: "Total Withdraw",
      value: (user?.totalInvestment ?? 0).toFixed(2),
      img: "https://img.icons8.com/3d-fluency/94/growing-money.png",
    },
    {
      title: "Returnal Earning",
      value: (user?.directReferalAmount ?? 0).toFixed(2),
      img: "https://img.icons8.com/3d-fluency/94/expensive-price.png",
    },
    {
      title: "Total Invest",
      value: (user?.totalRoi ?? 0).toFixed(2),
      img: "https://img.icons8.com/3d-fluency/94/business-management.png",
    },
    {
      title: "Total Running Invest",
      value: (user?.levelIncome ?? 0).toFixed(2),
      img: "https://img.icons8.com/isometric/50/no-connection.png",
    },
    {
      title: "Total Invest Completed",
      value: user?.referedUsers?.length ?? 0,
      img: "https://img.icons8.com/isometric/50/user.png",
    },
    {
      title: "Total Profit + Capital",
      value: user?.currentRank || "Beginner",
      img: "https://img.icons8.com/3d-fluency/94/prize.png",
    },
  ];

  const IncomeCard = ({ title, value, img }) => (
    <div className="income-card ss-card">
      <div className="left">
        <h5>{title}</h5>
        <p>{value}</p>
      </div>
      <div className="right">
        <img src={img} alt={title} />
      </div>
    </div>
  );

  return (
    <div className="UserHome px-4 sm:px-6 md:px-8">
      <div className="w-full flex flex-col md:flex-row md:gap-6 gap-4">
        {/* Income Cards */}
        <div className="income-wrapper w-full md:w-1/2 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-4">
          {incomeData.map((item, index) => (
            <IncomeCard
              key={index}
              title={item.title}
              value={item.value}
              img={item.img}
            />
          ))}
        </div>

        {/* Chart */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="bg-[#1E1E1E] rounded-2xl pt-6 pb-4 px-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-semibold text-xl sm:text-2xl">
                Exchange rate dynamics
              </p>
              {/* <div className="custom-gradient-button flex justify-between items-center">
                This Week <FaChevronDown className="ml-2 text-sm" />
              </div> */}
            </div>
            <div className="h-[20rem] sm:h-[24rem] md:h-[28rem] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#429461" stopOpacity={0.6} />
                      <stop
                        offset="90%"
                        stopColor="#439063"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00FF5F"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="ss-card mar-top mt-6">
        <div className="head">
          <h5 className="cardHeading">Direct Referral History</h5>
        </div>
        <SSDataTable data={user?.referedUsers} />
      </div>
    </div>
  );
};

export default UserHome;
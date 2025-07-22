import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdKeyboardDoubleArrowRight, MdOutlineQrCodeScanner } from 'react-icons/md';
import { CardSection } from './income-pages/CardSection';
import dollar from '../../assets/Dashboard/dollar.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import PageLoader from '../../components/ui/PageLoader';
import { dateWiseTeamActivity, sentInvitation } from '../../api/user-api';
import { QRCodeSVG } from 'qrcode.react';
import { RWebShare } from 'react-web-share';
import { backendConfig, MainContent } from '../../constants/content/MainContent';

const Activity = () => {
  const [filter, setFilter] = useState('ALL');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [referralEmail, setReferralEmail] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [rebateCards, setRebateCards] = useState([]);

  // Access user data from Redux store
  const userInfo = useSelector((state) => state.userInfo.userInfo?.user);
  const name = userInfo?.username || 'Guest';
  console.log('User Info:', userInfo);

  const baseUrl = window.location.origin;

  const referralUrl = userInfo?.referralCode
    ? `${window.location.origin}/register?referral=${userInfo.referralCode}`
    : '';



  useEffect(() => {
    setReferralEmail(referralUrl);
  }, [referralUrl]);

  useEffect(() => {
    const fetchRebateData = async () => {
      setLoading(true);
      try {
        const response = await dateWiseTeamActivity({});
        console.log('Rebate API Response:', response);

        if (!response.data) {
          throw new Error('No rebate data returned');
        }

        const apiData = response.data;
        const newRebateCards = [
          {
            title: 'Total Rebates',
            amount: (apiData?.totalInvestmentAll),
            icon: '💵',
          },
          // {
          //   title: 'Total Rebates',
          //   amount: apiData.additionalWallet || userInfo?.additionalWallet || 0,
          //   icon: '💵',
          // },
          {
            title: 'Rebates A',
            amount: apiData?.totalInvestmentA,
            icon: '💵',
          },
          {
            title: 'Rebates B',
            amount: apiData?.totalInvestmentB,
            icon: '💵',
          },
          {
            title: 'Rebates C',
            amount: apiData?.totalInvestmentC,
            icon: '💵',
          },
          {
            title: 'Rebates D',
            amount: apiData?.totalInvestmentD,
            icon: '💵',
          },
        ];

        setRebateCards(newRebateCards);
      } catch (error) {
        console.error('Error fetching rebate data:', error.message);
        setError('Failed to fetch rebate data: ' + error.message);
        setRebateCards([
          {
            title: 'All Rebates',
            amount: (userInfo?.BonusCredit || 0) + (userInfo?.additionalWallet || 0),
            icon: '💵',
          },
          {
            title: 'Total Rebates',
            amount: userInfo?.additionalWallet || 0,
            icon: '💵',
          },
          {
            title: 'Rebates A',
            amount: userInfo?.BonusCredit || 0,
            icon: '💵',
          },
          {
            title: 'Rebates B',
            amount: Math.round((userInfo?.additionalWallet || 0) * 0.4),
            icon: '💵',
          },
          {
            title: 'Rebates C',
            amount: Math.round((userInfo?.additionalWallet || 0) * 0.267),
            icon: '💵',
          },

        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRebateData();
  }, [userInfo]);

  // Distribute referedUsers into three teams
  const referedUsers = userInfo?.referedUsers || [];
  const usersPerTeam = Math.ceil(referedUsers.length / 3);
  const teamData = [
    {
      teamName: 'Team A',
      rebates: referedUsers.slice(0, usersPerTeam).map(user => ({
        name: user.username || 'N/A',
        username: user.name || 'N/A',
        amount: user.totalEarnings || 0,
      })),
    },
    {
      teamName: 'Team B',
      rebates: referedUsers.slice(usersPerTeam, usersPerTeam * 2).map(user => ({
        name: user.username || 'N/A',
        username: user.name || 'N/A',
        amount: user.totalEarnings || 0,
      })),
    },
    {
      teamName: 'Team C',
      rebates: referedUsers.slice(usersPerTeam * 2).map(user => ({
        name: user.username || 'N/A',
        username: user.name || 'N/A',
        amount: user.totalEarnings || 0,
      })),
    },
    {
      teamName: 'Team D',
      rebates: referedUsers.slice(usersPerTeam * 2).map(user => ({
        name: user.username || 'N/A',
        username: user.name || 'N/A',

        amount: user.totalEarnings || 0,
      })),
    },
  ];

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Handle filter button clicks and API calls
  const handleFilterClick = async (filterValue) => {
    setFilter(filterValue);
    setStartDate(null);
    setEndDate(null);
    setDateData(null);
    setError(null);
    setLoading(true);

    try {
      let payload = {};
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (filterValue === 'TODAY') {
        payload = { date: formatDate(today) };
      } else if (filterValue === 'YESTERDAY') {
        payload = { date: formatDate(yesterday) };
      } else if (filterValue === 'ALL') {
        payload = {};
      }

      console.log(`Sending payload for ${filterValue}:`, payload);
      const response = await dateWiseTeamActivity(payload);
      // console.log(response)
      console.log(`Response for ${filterValue}:`, response);

      if (!response.data) {
        throw new Error(`No data returned for ${filterValue}`);
      }

      setDateData(response.data);
    } catch (error) {
      console.error(`Error fetching ${filterValue} data:`, error.message);
      setError(`Failed to fetch ${filterValue.toLowerCase()} data: ${error.message}`);
      setDateData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle date range selection
  const handleDateChange = async (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFilter('DATE_RANGE');
    setError(null);

    if (start && end) {
      setLoading(true);
      const payload = {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };

      console.log('Sending payload for DATE_RANGE:', payload);
      try {
        const response = await dateWiseTeamActivity(payload);
        console.log('Response for DATE_RANGE:', response);

        if (!response.data) {
          throw new Error('No data returned for date range');
        }

        setDateData(response.data);
      } catch (error) {
        console.error('Error fetching date range data:', error.message);
        setError(`Failed to fetch date range data: ${error.message}`);
        setDateData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle email input and send invitation for referral link
  const handleEmail = async () => {
    console.log('Referral Email:', referralEmail);

    if (!referralEmail) {
      console.error('Email is required');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter an email address',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(referralEmail)) {
      console.error('Invalid email format');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid email address',
      });
      return;
    }

    try {
      setLoading(true);
      const payload = { email: referralEmail, name };
      console.log('Sending payload:', payload);
      const response = await sentInvitation(payload);
      console.log('Response:', response);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Invitation sent successfully!',
        });
        setReferralEmail(referralUrl);
      } else {
        console.error('Error sending invitation:', response.data.error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to send invitation: ${response.data.error || 'Unknown error'}`,
        });
      }
    } catch (error) {
      console.error('Error sending invitation:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle email input for "Invite your friends" section
  const handleInviteEmail = async () => {
    console.log('Invite Email:', inviteEmail);
    console.log('Username:', name);

    if (!inviteEmail) {
      console.error('Email is required');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter an email address',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      console.error('Invalid email format');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid email address',
      });
      return;
    }

    try {
      setLoading(true);
      const payload = { email: inviteEmail, name };
      console.log('Sending payload:', payload);
      const response = await sentInvitation(payload);
      console.log('Response:', response);

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'Invitation sent successfully!',
        });
        setInviteEmail('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to send invitation: ${response.data?.error?.message || 'Unknown error'}`,
        });
      }
    } catch (error) {
      console.error('Error sending invitation:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle QR code popup
  const toggleQRCode = () => {
    setShowQRCode((prev) => !prev);
  };

  // Close popup after sharing
  const closePopup = () => {
    setShowQRCode(false);
  };

  return (
    <div className="p-6 min-h-screen text-white bg-black/30 rounded-2xl">
      {loading && <PageLoader />}
      <button className="bg-[#40d3cc] rounded-md mb-4 text-[1.5rem] px-4 py-3">
        Team Activity
      </button>

      <div className="flex flex-col lg:flex-row gap-5 mt-4">
        {/* Left Section */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-[2rem]">My Community</h1>
            <div className="flex flex-wrap gap-3 text-[#01EBE0] text-[1rem] mt-4 md:mt-0">
              {['ALL', 'TODAY', 'YESTERDAY'].map((item) => (
                <h2
                  key={item}
                  onClick={() => handleFilterClick(item)}
                  className={`uppercase px-4 py-2 border-2 border-[#01EBE0] hover:bg-[#01EBE0] hover:text-white transition-all duration-300 rounded-lg cursor-pointer ${filter === item ? 'bg-[#01EBE0] text-white' : ''
                    }`}
                >
                  {item}
                </h2>
              ))}
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                className="uppercase px-4 py-2 border-2 border-[#01EBE0] bg-transparent text-[#01EBE0] rounded-lg cursor-pointer text-[1rem] w-full sm:w-auto"
                placeholderText="SELECT DATE RANGE"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="border-2 border-[#01EBE0] rounded-lg p-4 my-4">
            {loading ? (
              <p className="text-center text-xl">Loading...</p>
            ) : error ? (
              <p className="text-center text-xl text-red-500">{error}</p>
            ) : (
              <CardSection filter={filter} dateData={dateData} />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[40%] border-2 border-[#01EBE0] rounded-lg p-4 h-fit">
          <h1 className="text-[2rem]">Invite your friends</h1>
          <p className="text-lg">
            Add your friends email addresses and send them invitations to join!
          </p>
          <div className="py-3 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              className="w-full bg-transparent rounded-lg px-4 py-2 text-xl placeholder:text-gray-300 border-2 border-[#01EBE0]"
              placeholder="Enter Email Id"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <div
              className="bg-[#01EBE0] p-2 flex items-center justify-center rounded-lg sm:rounded-l-none sm:rounded-r-lg cursor-pointer"
              onClick={handleInviteEmail}
            >
              <MdKeyboardDoubleArrowRight className="text-[3rem] text-black" />
            </div>
          </div>
          <div className="h-1 w-full bg-[#01EBE0] my-10"></div>
          <h1 className="text-[2rem]">Share the referral link</h1>
          <p className="text-lg">
            You can also share your referral link by copying and sending it to your friends or sharing it on social media.
          </p>
          <div className="py-3 flex flex-col sm:flex-row gap-2">

            <input
              type="text"
              className="w-full bg-transparent rounded-lg px-4 py-2 text-xl placeholder:text-gray-300 border-2 border-[#01EBE0]"
              placeholder="Your referral link"
              value={`${referralEmail}`}
              onChange={(e) => setReferralEmail(e.target.value.replace(baseUrl + '/', ''))}
            />

            <div
              className="bg-[#01EBE0] p-2 flex items-center justify-center rounded-lg sm:rounded-l-none sm:rounded-r-lg cursor-pointer"
              onClick={toggleQRCode}
            >
              <MdOutlineQrCodeScanner className="text-[3rem] text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Popup */}
      {showQRCode && userInfo?.referralCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black border-2 border-[#01EBE0] rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl text-[#01EBE0] mb-4 text-center">Share Referral QR</h2>
            <div className="flex justify-center mb-4">
              <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
                <QRCodeSVG
                  value={referralUrl}
                  size={150}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                />
              </div>
            </div>
            <RWebShare
              data={{
                text: `Join me using my referral link!`,
                url: referralUrl,
                title: `${name}'s Referral Link`,
              }}
              onClick={() => {
                console.log('Shared successfully!');
                closePopup();
              }}
            >
              <button className="w-full bg-[#01EBE0] px-4 py-2 rounded-lg text-black text-xl">
                Share QR 🔗
              </button>
            </RWebShare>
            <button
              className="w-full mt-2 bg-gray-500 px-4 py-2 rounded-lg text-white text-xl"
              onClick={toggleQRCode}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full p-4">
        {rebateCards.map((card, i) => (
          <div
            key={`${card.title}-${i}`}
            role="group"
            aria-label={`Rebate card: ${card.title} - $${card.amount}`}
            className="bg-black text-white border border-[#01EBE0] rounded-xl px-6 py-6 flex items-center shadow-[inset_0px_-10px_10px_-10px_rgba(1,235,224,0.5)] w-full max-w-sm mx-auto hover:shadow-[inset_0px_-10px_20px_-5px_rgba(1,235,224,0.8)] transition-shadow duration-300"
          >
            <div className="w-16 h-16 mr-4 flex items-center justify-center bg-white rounded-full">
              <img src={dollar} alt="" className="w-14 h-14 object-contain" />
            </div>
            <div className="text-left">
              <p className="text-xl text-[#01EBE0] mb-1 uppercase tracking-wide">{card.title}</p>
              <h1 className="text-3xl font-bold">${card.amount}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Team Rebates Section */}
      <section className="mt-10 px-4">
        <h1 className="text-[2rem] mb-6">Team Rebates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((team, index) => (
            <div
              key={`${team.teamName}-${index}`}
              className="relative border-2 border-[#01EBE0] rounded-lg p-4 text-white bg-black"
            >
              <button className="absolute top-0 left-0 bg-[#01EBE0] text-black px-4 py-2 rounded-tl-lg rounded-br-lg font-semibold text-xl">
                {team.teamName}
              </button>
              <h2 className="text-2xl font-semibold mt-12 mb-2 text-center">
                {team.teamName.toUpperCase()} | REBATES
              </h2>
              {team.rebates.length > 0 ? (
                team.rebates.map((member, i) => (
                  <div
                    key={`${member.name}-${i}`}
                    className="mb-1 border-b border-[#01EBE0] pb-1 flex justify-between text-xl"
                  >
                    <span>{member.name}</span>
                    <span>{member.username}</span>
                    <span>${member.amount.toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-xl text-gray-400">No members in {team.teamName}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Activity;
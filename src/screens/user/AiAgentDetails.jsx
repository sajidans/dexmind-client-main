import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlowButton } from '../../components/ui/Buttons';
import AiAgentCard from '../../components/AiAgentCard';
import { getAiAgentDetails, hireAiAgent, aiAgentHistory,redeemReward  } from '../../api/user-api';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const getColorByIndex = (index) => {
    const colorSchemes = [
        { bgColor: 'from-indigo-500 to-blue-500', barColor: 'bg-blue-700' },
        { bgColor: 'from-purple-500 to-pink-500', barColor: 'bg-pink-700' },
        { bgColor: 'from-green-500 to-teal-500', barColor: 'bg-teal-700' },
        { bgColor: 'from-yellow-500 to-orange-500', barColor: 'bg-yellow-600' },
        { bgColor: 'from-red-500 to-rose-500', barColor: 'bg-rose-700' },
    ];
    return colorSchemes[index % colorSchemes.length];
};

const AiAgentDetails = () => {
    const { id } = useParams();
    const planId = id;
    const navigate = useNavigate();
    const [aiAgentDetails, setAiAgentDetails] = useState(null);
    const [activePlans, setActivePlans] = useState([]);
    const userInfo = useSelector((state) => state?.userInfo?.userInfo?.user);
    const [usdt, setUsdt] = useState('');
    const [remainingTime, setRemainingTime] = useState(null); // Store remaining time in seconds
    const [hireTime, setHireTime] = useState(null); // Store hire timestamp
    const [timerCompleted, setTimerCompleted] = useState(false); // Track if timer is completed

    const maxHandler = () => {
        setUsdt(userInfo?.additionalWallet || '');
    };

    const handleRedeem = async () => {
        try {
          const response = await redeemReward(); // API call
      
          if (response?.success) {
            Swal.fire({
              icon: 'success',
              title: 'Redeemed Successfully!',
              text: response?.message || 'Your reward has been redeemed.',
              background: '#2e2e2e',
              color: '#ffffff',
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Failed to Redeem',
              text: response?.message || 'Redemption failed. Try again later.',
              background: '#2e2e2e',
              color: '#ffffff',
            });
          }
        } catch (error) {
          console.error('Redeem Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: error?.response?.data?.message || 'Something went wrong.',
            background: '#2e2e2e',
            color: '#ffffff',
          });
        }
      };

    // Check if the plan is matured
    const isPlanMatured = activePlans.find(
        (plan) => plan.plan === planId && plan.isActive
    )?.isMatured || false;

    // Load timer data from localStorage or activePlans on mount
    useEffect(() => {
        const storedHireTime = localStorage.getItem(`hireTime_${planId}`);
        const storedDuration = localStorage.getItem(`duration_${planId}`);
        if (storedHireTime && storedDuration) {
            const hireTimestamp = parseInt(storedHireTime);
            const durationInSeconds = parseInt(storedDuration) * 24 * 60 * 60;
            const elapsed = Math.floor((Date.now() - hireTimestamp) / 1000);
            const newRemainingTime = Math.max(0, durationInSeconds - elapsed);
            if (newRemainingTime > 0) {
                setHireTime(hireTimestamp);
                setRemainingTime(newRemainingTime);
            } else {
                setTimerCompleted(true);
                localStorage.removeItem(`hireTime_${planId}`);
                localStorage.removeItem(`duration_${planId}`);
            }
        } else if (activePlans.length > 0 && aiAgentDetails) {
            // Check for active plan matching planId
            const activePlan = activePlans.find(
                (plan) => plan.plan === planId && plan.isActive
            );
            if (activePlan) {
                const investedAt = new Date(activePlan.investedAt).getTime();
                const durationInSeconds = parseInt(aiAgentDetails.duration) * 24 * 60 * 60;
                const elapsed = Math.floor((Date.now() - investedAt) / 1000);
                const newRemainingTime = Math.max(0, durationInSeconds - elapsed);
                if (newRemainingTime > 0) {
                    setHireTime(investedAt);
                    setRemainingTime(newRemainingTime);
                    // Store in localStorage
                    localStorage.setItem(`hireTime_${planId}`, investedAt);
                    localStorage.setItem(`duration_${planId}`, aiAgentDetails.duration);
                } else {
                    setTimerCompleted(true);
                }
            }
        }
    }, [activePlans, aiAgentDetails, planId]);

    const hireAiAgentHandler = async () => {
        if (!usdt || parseFloat(usdt) < 100) {
            return Swal.fire({
                icon: 'warning',
                title: 'Invalid Amount',
                text: 'Please enter a valid USDT amount. Minimum is $100.',
            });
        }

        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to hire this AI Agent with ${usdt} USDT.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, hire',
            cancelButtonText: 'Cancel',
        });

        if (!confirmed.isConfirmed) return;

        const payload = {
            planId,
            investmentAmount: usdt,
        };

        try {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const res = await hireAiAgent(payload);

            if (res?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res?.message || 'AI Agent hired successfully!',
                });
                // Start timer with durationInDays from aiAgentDetails
                if (aiAgentDetails?.duration) {
                    const durationInDays = parseInt(aiAgentDetails.duration);
                    const durationInSeconds = durationInDays * 24 * 60 * 60;
                    setRemainingTime(durationInSeconds);
                    const hireTimestamp = Date.now();
                    setHireTime(hireTimestamp);
                    setTimerCompleted(false);
                    // Store in localStorage
                    localStorage.setItem(`hireTime_${planId}`, hireTimestamp);
                    localStorage.setItem(`duration_${planId}`, durationInDays);
                }
                // Refetch active plans
                const response = await aiAgentHistory();
                if (response.success) {
                    setActivePlans(response.data);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: res?.message || 'Something went wrong. Please try again.',
                });
            }
        } catch (error) {
            console.error('Hire AI Agent Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error?.response?.message || 'Something went wrong.',
            });
        }
    };

    // Timer countdown logic
    useEffect(() => {
        if (hireTime && remainingTime !== null && !timerCompleted) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - hireTime) / 1000);
                const newRemainingTime = Math.max(0, parseInt(aiAgentDetails?.duration || 0) * 24 * 60 * 60 - elapsed);
                setRemainingTime(newRemainingTime);
                if (newRemainingTime <= 0) {
                    setTimerCompleted(true);
                    clearInterval(interval);
                    localStorage.removeItem(`hireTime_${planId}`);
                    localStorage.removeItem(`duration_${planId}`);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hireTime, remainingTime, timerCompleted, aiAgentDetails, planId]);

    // Format timer as days, hours, minutes, seconds
 const formatTimer = (seconds) => {
  if (seconds === null) return 'Not started';
  if (seconds <= 0) return 'Completed';

  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};


    // Show alert on green dot click
    const handleActiveDotClick = () => {
        Swal.fire({
            icon: 'info',
            title: 'Agent Status',
            text: 'This AI Agent is currently active.',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    useEffect(() => {
        const fetchAiAgentHistory = async () => {
            try {
                const response = await aiAgentHistory();
                if (!response.success) throw new Error("Failed to fetch AI Agent history");
                setActivePlans(response.data);
                console.log("Active Plans:", response.data);
            } catch (error) {
                console.error("Error fetching AI Agent history:", error);
            }
        };

        fetchAiAgentHistory();
    }, []);

    useEffect(() => {
        const fetchAiAgentDetails = async () => {
            try {
                const response = await getAiAgentDetails(id);
                console.log("AI Agent Details Response:", response);

                if (!response.success) throw new Error('Failed to fetch AI agent details');

                const data = response.plans;
                const { bgColor, barColor } = getColorByIndex(parseInt(id));

                const isActive = activePlans.some(
                    (plan) => plan.plan === data._id && plan.isActive
                );

                const mappedData = {
                    id: data._id,
                    name: data.agentName,
                    duration: data.durationInDays, // Store as number
                    income: `${data.incomePercent}%`,
                    investment: `$${data.minInvestment} - $${data.maxInvestment}`,
                    fee: data.aiAgentFee || '5%',
                    skill: data.computingSkills,
                    bgColor,
                    barColor,
                    isActive,
                };

                setAiAgentDetails(mappedData);
            } catch (error) {
                console.error('Error fetching AI agent details:', error);
            }
        };

        fetchAiAgentDetails();
    }, [id, activePlans]);

    if (!aiAgentDetails) {
        return (
            <div className="p-4 md:p-10">
                <h1 className="text-3xl text-white">Agent Not Found</h1>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate('/ai-agent')}
                >
                    Back to AI Agents
                </button>
            </div>
        );
    }

    return (
        <div className='p-4 md:p-10 max-w-screen-xl mx-auto space-y-10'>
            <GlowButton text="Ai Agent" />

            <div className='border-2 border-[#00d5e6] rounded-3xl p-6 sm:p-8 md:p-10 bg-black/20'>
                <button
                    className="mb-5 px-4 py-2 bg-blue-500 text-white text-xl sm:text-2xl rounded"
                    onClick={() => navigate('/ai-agent')}
                >
                    Back
                </button>

                <div className='flex flex-col lg:flex-row gap-6'>
                    <div className='w-full lg:w-1/2'>
                        {/* Agent Name + Green Dot */}
                        <div className="flex items-center space-x-3 mb-4 relative">
                            <h1 className="text-3xl font-bold text-white">{aiAgentDetails.name}</h1>
                            {aiAgentDetails.isActive && (
                                <button
                                    title="Agent is active"
                                    onClick={handleActiveDotClick}
                                    className="w-5 h-5 rounded-full bg-green-400 animate-pulse border-2 border-white cursor-pointer"
                                />
                            )}
                        </div>

                        <AiAgentCard agent={aiAgentDetails} />

                        {/* Amount + Summary */}
                        <div className='py-5'>
                            <h1 className='text-xl sm:text-2xl'>AMOUNT USDT</h1>
                            <div className='py-2 flex flex-col sm:flex-row gap-3'>
                                <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 border-2 border-[#00d5e6] rounded-lg p-4 text-lg sm:text-xl text-white flex items-center justify-center relative overflow-hidden">
                                    {timerCompleted ? (
                                        <span className="text-green-400 font-bold text-xl sm:text-2xl animate-pulse">
                                            Completed
                                        </span>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-300 text-base sm:text-lg">Time remaining</span>
                                            <span className="font-mono text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                                {formatTimer(remainingTime)}
                                            </span>
                                        </div>
                                    )}
                                    {/* Subtle glowing effect */}
                                    <div className="absolute inset-0 bg-[#00d5e6]/20 animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <input
                                    onChange={(e) => setUsdt(e.target.value)}
                                    value={usdt}
                                    type="text"
                                    placeholder='0.00'
                                    className='w-full px-4 py-2 bg-transparent border-2 border-white text-lg sm:text-xl rounded-lg placeholder:text-gray-300'
                                />
                                <button onClick={maxHandler} className='px-6 py-2 bg-[#00cda1] hover:bg-[#64e0e9] transition duration-300 text-white text-xl sm:text-2xl rounded'>
                                    MAX
                                </button>
                            </div>

                            <div className='mt-5 rounded-2xl border border-gray-200 p-4 space-y-4'>
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between text-lg sm:text-xl'>
                                    <h2>Available Balance: {userInfo?.additionalWallet}</h2>
                                    <button className='text-[#00cda1]' onClick={() => navigate("/dashboard")}>Deposit {">"}</button>
                                </div>
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between text-lg sm:text-xl'>
                                    <h2>Level:</h2>
                                    <button>LV1 - LV6</button>
                                </div>
                                <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                                    <button
                                        onClick={() => handleRedeem()}
                                        disabled={!isPlanMatured}
                                        className={`w-full sm:w-1/2 px-8 py-2 text-xl sm:text-2xl rounded transition duration-300 ${
                                            isPlanMatured
                                                ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Redeem
                                    </button>
                                    <button
                                        onClick={hireAiAgentHandler}
                                        className='w-full sm:w-1/2 px-8 py-2 bg-[#00cda1] hover:bg-[#64e0e9] transition duration-300 text-white text-xl sm:text-2xl rounded'
                                    >
                                        Hire AI Agent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE DESCRIPTION */}
                    <div className='w-full lg:w-1/2 space-y-6'>
                        <div>
                            <h2 className='text-xl sm:text-3xl mb-2'>1. Fund Overview</h2>
                            <p className='text-base sm:text-2xl font-normal text-gray-300'>
                                1Trade Fund is an innovative digital asset management plan based on AI Agent liquidity income...
                            </p>
                        </div>

                        <div>
                            <h2 className='text-xl sm:text-3xl mb-2'>2. Fund Rules</h2>
                            <div className='text-lg sm:text-2xl font-normal text-gray-300 space-y-4'>
                                <p>a. Fund Pool Classification and Term...</p>
                                <p>b. Income Calculation Method...</p>
                                <p>c. Principal and Income Withdrawal...</p>
                                <p>d. Minimum Investment Amount is $100.</p>
                                <p>e. Fund Pool Fund Limitation...</p>
                                <p>f. Applicable Users: LV1 - LV6</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiAgentDetails;
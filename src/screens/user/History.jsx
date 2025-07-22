import React, { useState, useEffect } from 'react';
import { GlowButton } from '../../components/ui/Buttons';
import HistoryTable from '../../components/HistoryTable';
import { AiFillMoneyCollect } from 'react-icons/ai';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { LuBrainCircuit } from 'react-icons/lu';
import { IoGiftSharp } from 'react-icons/io5';
import { SiLevelsdotfyi } from 'react-icons/si';
import { FiShare2 } from 'react-icons/fi';
import PageLoader from '../../components/ui/PageLoader';
import {
  getWithdrawalHistory,
  getDepositHistory,
  getLevelIncomeHistory,
  getReferralIncomeHistory,
} from '../../api/user-api';

// Configuration for each category
const historyBottomData = [
  {
    title: 'Deposit',
    icon: <AiFillMoneyCollect className="text-2xl sm:text-3xl text-[#06C755]" />,
    fetcher: getDepositHistory,
    mapData: (data, icon) =>
      data?.map((item, index) => ({
        type: 'Deposit',
        from: item?.userId?.username || '-',
        username: item?.userId?.username || '-',
        investmentAmount: item?.investmentAmount || '-',
        investmentDate: item?.investmentDate?.split('T')?.[0] || '-',
        txResponse: item?.walletAddress || `D${index + 1}`,
        icon,
      })) || [],
    columns: [
      { field: 'type', header: 'Transaction', body: 'typeTemplate', minWidth: '200px' },
      { field: 'username', header: 'Username', minWidth: '200px' },
      { field: 'investmentAmount', header: 'Investment Amount', body: 'amountTemplate' },
      { field: 'investmentDate', header: 'Investment Date' },
      { field: 'txResponse', header: 'Wallet Address' },

    ],
  },
  {
    title: 'Withdraw',
    icon: <BiMoneyWithdraw className="text-2xl sm:text-3xl text-[#06C755]" />,
    fetcher: getWithdrawalHistory,
    mapData: (data, icon) =>
      data?.map((item) => ({
        from: item?.method || 'Bank',
        investmentAmount: item?.amount || '-',
        investmentDate: item?.createdAt?.split('T')?.[0] || '-',
        txResponse: item?.transactionHash || '-',
        createdAt: item?.createdAt?.split('T')?.[0] || '-',
        walletAddress: item?.walletAddress || '-',
        icon,
      })) || [],
    columns: [
      { field: 'investmentAmount', header: 'Amount', body: 'amountTemplate' },
      { field: 'investmentDate', header: 'Date' },
      { field: 'txResponse', header: 'Transaction ID' },
      { field: 'createdAt', header: 'Created At' },
      { field: 'walletAddress', header: 'Wallet Address' },
    ],
  },
  // {
  //   title: 'AI Agent',
  //   icon: <LuBrainCircuit className="text-2xl sm:text-3xl text-[#06C755]" />,
  //   fetcher: async () => ({
  //     message: 'Mock AI Agent data',
  //     success: true,
  //     data: [{ task: 'AI Task 1', reward: 50, date: '2025-05-15', id: 'AI1' }],
  //   }),
  //   mapData: (data, icon) =>
  //     data?.map((item, index) => ({
  //       from: item?.task || '-',
  //       reward: item?.reward || '-',
  //       date: item?.date || '-',
  //       id: item?.id || `#${index + 1}`,
  //       icon,
  //     })) || [],
  //   columns: [
  //     { field: 'reward', header: 'Reward', body: 'amountTemplate' },
  //     { field: 'date', header: 'Date' },
  //     { field: 'id', header: 'Task ID' },
  //   ],
  // },
  // {
  //   title: 'Rewards',
  //   icon: <IoGiftSharp className="text-2xl sm:text-3xl text-[#06C755]" />,
  //   fetcher: async () => ({
  //     message: 'Mock Rewards data',
  //     success: true,
  //     data: [{ reason: 'Signup Bonus', reward: 10, date: '2025-05-14', id: 'R1' }],
  //   }),
  //   mapData: (data, icon) =>
  //     data?.map((item, index) => ({
  //       from: item?.reason || '-',
  //       reward: item?.reward || '-',
  //       date: item?.date || '-',
  //       id: item?.id || `#${index + 1}`,
  //       icon,
  //     })) || [],
  //   columns: [
  //     { field: 'reward', header: 'Reward', body: 'amountTemplate' },
  //     { field: 'date', header: 'Date' },
  //     { field: 'id', header: 'Reward ID' },
  //   ],
  // },
  {
    title: 'Levels',
    icon: <SiLevelsdotfyi className="text-2xl sm:text-3xl text-[#06C755]" />,
    fetcher: getLevelIncomeHistory,
    mapData: (data, icon) =>
      data?.map((item, index) => ({
        type: 'Level Income',
        from: item?.userId?.username || '-',
        userId: item?.userId?.username || item?.userId?._id || '-', // Extract username or _id from userId object
        commissionAmount: item?.commissionAmount || '-',
        commissionPercentage: item?.commissionPercentage || '-',
        createdAt: item?.createdAt?.split('T')?.[0] || '-',
        level: item?.level?.toString?.() || '-',
        icon,
      })) || [],
    columns: [
      { field: 'type', header: 'Transaction', body: 'typeTemplate', minWidth: '200px' },
      { field: 'userId', header: 'Username' },
      { field: 'commissionAmount', header: 'Commission Amount', body: 'amountTemplate' },
      { field: 'commissionPercentage', header: 'Commission %' },
      { field: 'level', header: 'Level' },
      { field: 'createdAt', header: 'Date' },
    ],
  },
  {
    title: 'Referral',
    icon: <FiShare2 className="text-2xl sm:text-3xl text-[#06C755]" />,
    fetcher: getReferralIncomeHistory,
    mapData: (data, icon) =>
      data?.map((item, index) => ({
        type: 'Referral Income',
        userId: item?.userId?.username || item?.userId?._id || '-', // Extract username or _id from userId object
        amount: item?.amount || '-',
        from: item?.fromUser?.username || item?.fromUser?._id || '-', // Extract username or _id from fromUser object
        investmentId: item?.investmentId?.investmentAmount || '-',
        date: item?.date?.split('T')?.[0] || item?.investmentDate?.split('T')?.[0] || '-',
        id: item?.id?.toString?.() || item?.referralId || `R${index + 1}`,
        icon,
      })) || [],
    columns: [
      { field: 'type', header: 'Transaction', body: 'typeTemplate', minWidth: '200px' },
      { field: 'userId', header: 'Username' },
      { field: 'amount', header: 'Bonus', body: 'amountTemplate' },
      { field: 'investmentId', header: 'Investment Amount' },
      { field: 'date', header: 'Date' },
    ],
  },
];

const History = () => {
  const [selectedCategory, setSelectedCategory] = useState('Deposit');
  const [rowData, setRowData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async ({ title, fetcher, mapData, columns }) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching data for ${title}...`);
      const response = await fetcher();
      console.log(`[${title} API Response]:`, response);
      if (!response?.success) throw new Error(response?.message || `Failed to fetch ${title}`);
      const mappedData = mapData(response?.data || [], historyBottomData.find(item => item.title === title)?.icon);
      setRowData(mappedData);
      setColumns(columns);
    } catch (error) {
      console.error(`Error fetching ${title} data:`, error);
      setError(error?.message || `Failed to load ${title} data`);
      setRowData([]);
      setColumns(columns);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    console.log(`Clicked category: ${category?.title}`);
    setSelectedCategory(category?.title);
    fetchData(category);
  };

  useEffect(() => {
    const defaultCategory = historyBottomData.find(item => item?.title === 'Deposit');
    if (defaultCategory) {
      fetchData(defaultCategory);
    }
  }, []);

  return (
    <div className="space-y-10 p-4 md:p-10 max-w-screen-xl mx-auto">
      <GlowButton text="Asset History" onClick={() => { }} />

      <div className="border-2 border-[#00d5e6] rounded-3xl p-4 sm:p-6 bg-black/20">
        {selectedCategory && (
          <h2 className="text-lg font-semibold text-white mb-4">
            Showing: {selectedCategory}
          </h2>
        )}

        {loading ? (
          <PageLoader />
        ) : error ? (
          <div className="text-red-500 text-[1.6rem] text-center p-4 rounded-lg">{error}</div>
        ) : (
          <HistoryTable data={rowData} columns={columns} />
        )}

        <div className="mt-10 flex flex-wrap gap-5 justify-center sm:justify-start">
          {historyBottomData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 min-w-[120px]"
            >
              <div className="border-2 border-[#06C755] p-2 rounded-full">
                {item?.icon}
              </div>
              <GlowButton
                text={item?.title}
                onClick={() => handleCategoryClick(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
import eid from '../assets/eid.png';
import level0 from '../assets/level0.png';
import level1 from '../assets/level1.png';
import level2 from '../assets/level2.png';
import level3 from '../assets/level3.png';
import level4 from '../assets/level4.png';
import level5 from '../assets/level5.png';
import level6 from '../assets/level6.png';

export const aiAgentsData = [
  {
    id: 1,
    name: "Agent 1",
    duration: "10 Days",
    income: "1%",
    investment: "$100 - $5000",
    handlingFee: "5%",
    skill: 20,
    bgColor: "from-yellow-400 to-orange-500",
    barColor: "bg-orange-600",
  },
  {
    id: 2,
    name: "Agent 2",
    duration: "30 Days",
    income: "1.5%",
    investment: "$100 - $2000",
    handlingFee: "5%",
    skill: 35,
    bgColor: "from-indigo-500 to-blue-500",
    barColor: "bg-blue-800",
  },
  {
    id: 3,
    name: "Agent 3",
    duration: "60 Days",
    income: "2.1%",
    investment: "$100 - $2000",
    handlingFee: "5%",
    skill: 50,
    bgColor: "from-pink-500 to-purple-500",
    barColor: "bg-pink-300",
  },
  {
    id: 4,
    name: "Agent 4",
    duration: "90 Days",
    income: "2.6%",
    investment: "$100 - $2000",
    handlingFee: "5%",
    skill: 75,
    bgColor: "from-orange-400 to-red-500",
    barColor: "bg-red-500",
  },
  {
    id: 5,
    name: "Agent 5",
    duration: "120 Days",
    income: "3.2%",
    investment: "$100 - $2000",
    handlingFee: "5%",
    skill: 95,
    bgColor: "from-cyan-400 to-blue-500",
    barColor: "bg-blue-500",
  },
];

export const announcementsCardData = [
  {
    title: 'About Trade notice on new update',
    tag: 'Announcement',
    date: '01/01/2023',
    image: eid,
    desc: "About zentor notice on new updates.",
  },
  {
    title: 'System Maintenance Notification',
    tag: 'System',
    date: '15/02/2023',
    image: eid,
    desc: "About 2 Trade notice on new updates.",
  },
  {
    title: 'New Feature Release: Trading Bot',
    tag: 'Release',
    date: '10/03/2023',
    image: eid,
    desc: "About 3 Trade notice on new updates.",
  },
];

export const levelCardData = [
  {
    level: 0,
    round: 'Round 1',
    threshold: 0,
    badgeImage: level0,
    bgColor: 'linear-gradient(to right, #434343, #bcbcbc)',
    progressColor: '#ffffff',
  },
  {
    level: 1,
    round: 'Round 1',
    threshold: 100,
    badgeImage: level1,
    bgColor: 'linear-gradient(to right, #FFD700, #bcbcbc)',
    progressColor: '#FF6600',
  },
  {
    level: 2,
    round: 'Round 2',
    threshold: 100,
    badgeImage: level2,
    bgColor: 'linear-gradient(to right, #7F00FF, #bcbcbc)',
    progressColor: '#7F00FF',
  },
  {
    level: 3,
    round: 'Round 2',
    threshold: 200,
    badgeImage: level3,
    bgColor: 'linear-gradient(to right, #FF0080, #bcbcbc)',
    progressColor: '#FF0080',
  },
  {
    level: 4,
    round: 'Round 2',
    threshold: 300,
    badgeImage: level4,
    bgColor: 'linear-gradient(to right, #FF512F, #bcbcbc)',
    progressColor: '#FF512F',
  },
  {
    level: 5,
    round: 'Round 3',
    threshold: 500,
    badgeImage: level5,
    bgColor: 'linear-gradient(to right, #FFA500, #bcbcbc)',
    progressColor: '#FF4500',
  },
  {
    level: 6,
    round: 'Round 3',
    threshold: 1000,
    badgeImage: level6,
    bgColor: 'linear-gradient(to right, #00C9FF, #bcbcbc)',
    progressColor: '#00C9FF',
  },
];

// Legacy data for pages using the original levelCardData structure
export const legacyLevelCardData = [
  {
    level: 0,
    round: 1,
    credits: 0,
    maxCredits: 0,
    progress: 100,
    badgeImage: level0,
    bgColor: 'linear-gradient(to right, #434343, #bcbcbc)',
    progressColor: '#ffffff',
  },
  {
    level: 1,
    round: 1,
    credits: 0,
    maxCredits: 100,
    progress: 90,
    badgeImage: level1,
    bgColor: 'linear-gradient(to right, #FFD700, #bcbcbc)',
    progressColor: '#FF6600',
  },
  {
    level: 2,
    round: 2,
    credits: 0,
    maxCredits: 100,
    progress: 0,
    badgeImage: level2,
    bgColor: 'linear-gradient(to right, #7F00FF, #bcbcbc)',
    progressColor: '#7F00FF',
  },
  {
    level: 3,
    round: 2,
    credits: 0,
    maxCredits: 200,
    progress: 0,
    badgeImage: level3,
    bgColor: 'linear-gradient(to right, #FF0080, #bcbcbc)',
    progressColor: '#FF0080',
  },
  {
    level: 4,
    round: 2,
    credits: 0,
    maxCredits: 300,
    progress: 0,
    badgeImage: level4,
    bgColor: 'linear-gradient(to right, #FF512F, #bcbcbc)',
    progressColor: '#FF512F',
  },
  {
    level: 5,
    round: 3,
    credits: 0,
    maxCredits: 500,
    progress: 0,
    badgeImage: level5,
    bgColor: 'linear-gradient(to right, #FFA500, #bcbcbc)',
    progressColor: '#FF4500',
  },
  {
    level: 6,
    round: 3,
    credits: 0,
    maxCredits: 1000,
    progress: 0,
    badgeImage: level6,
    bgColor: 'linear-gradient(to right, #00C9FF, #bcbcbc)',
    progressColor: '#00C9FF',
  },
];

export const teamRebateData = [
  { level: 'Required Assets', required: '1 - 3000' },
  { level: 'Team A Rebate', required: '18%' },
  { level: 'Team B Rebate', required: '9%' },
  { level: 'Team C Rebate', required: '5%' },
  { level: 'Team D Rebate', required: '1%' },
];
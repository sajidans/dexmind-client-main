import { FaUsers, FaUserTie } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuBrainCircuit, LuPackageSearch, LuSquareActivity } from "react-icons/lu";
import { AuthenticatedRoutes } from "../Routes";
import { FaRegNewspaper, FaWallet } from "react-icons/fa6";
import { BiSolidNotification } from "react-icons/bi";

import {
  MdManageHistory,
  MdOutlineAddCard,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdCreditCard } from "react-icons/md";

import { GrAchievement, GrAnnounce } from "react-icons/gr";
import { FiAlertTriangle } from "react-icons/fi";
import { SiCoinmarketcap } from "react-icons/si";
export const SidebarContent = {
  user: [
    {
      id: "Dashboard",
      icon: <HiOutlineSquares2X2 />,
      name: "Dashboard",
      link: AuthenticatedRoutes.USER_DASHBOARD,
    },
    {
      id: "Assets",
      icon: <MdCreditCard />,
      name: "Assets",
      link: AuthenticatedRoutes.ASSETS,
      options: [
        {
          id: "Dapp Wallet",
          name: "Dapp Wallet",
          link: AuthenticatedRoutes.DAPP_WALLET,
        },
        // {
        //   id: "USDT(BEP-20)",
        //   name: "USDT(BEP-20)",
        //   link: AuthenticatedRoutes.USDT_BEP,
        // },
        // {
        //   id: "USDT(TRC-20)",
        //   name: "USDT(TRC-20)",
        //   link: AuthenticatedRoutes.USDT_TRC,
        // },
        {
          id: "WITHDRAWAL",
          name: "WITHDRAWAL",
          link: AuthenticatedRoutes.WITHDRAWAL,
        },
      ],
    },
    // {
    //   id: "Two Factor Authentication",
    //   icon: <HiOutlineSquares2X2 />,
    //   name: "Two Factor Authentication",
    //   link: AuthenticatedRoutes.TWOFA,
    // },
    {
      id: "Ai Agent History",
      icon: <HiOutlineSquares2X2 />,
      name: "Ai Agent History",
      link: AuthenticatedRoutes.Ai_Agent_History,
    },
    {
      id: "Trade History",
      icon: <HiOutlineSquares2X2 />,
      name: "Trade History",
      link: AuthenticatedRoutes.TRADE_HISTORY,
    },

    {
      id: "History",
      icon: <MdManageHistory />,
      name: "History",
      link: AuthenticatedRoutes.HISTORY,
    },
    {
      id: "AI Agent",
      icon: <LuBrainCircuit />,
      name: "AI Agent",
      link: AuthenticatedRoutes.AI_AGENT,
    },

    {
      id: "Announcements",
      icon: <GrAnnounce />,
      name: "Announcements",
      link: AuthenticatedRoutes.ANNOUNCEMENTS,
    },
    {
      id: "Level Achievement",
      icon: <GrAchievement />,
      name: "Level Achievement",
      link: AuthenticatedRoutes.LEVEL_ACHIEVEMENT,
    },
    // {
    //   id: "Notification & Announcements",
    //   icon: <TfiAnnouncement />,
    //   name: "Notification & Announcements",
    //   link: AuthenticatedRoutes.NEWS_AND_NOTIF,
    // },

    {
      id: "Activity",
      icon: <LuSquareActivity />,
      name: "Acitvity",
      link: AuthenticatedRoutes.Activity,
    },

    // {
    //   id: "AirDrop Alert",
    //   icon: <FiAlertTriangle />,
    //   name: "AirDrop Alert",
    //   link: AuthenticatedRoutes.USERAIRDROPALERT,
    // },

    {
      id: "Market",
      icon: <SiCoinmarketcap />,
      name: "Market",
      link: AuthenticatedRoutes.MARKET,
    },
    {
      id: "Support-AI",
      icon: <BiSupport />,
      name: "Support",
      options: [
        {
          id: "MainSupport",
          name: "Ticket raise",
          link: AuthenticatedRoutes.SUPPORT, // e.g., "/support"
        },
        {
          id: "ChatHistory",
          name: "Ticket raise history",
          link: AuthenticatedRoutes.CHAT_HisTORY, // e.g., "/support/chat-history"
        }
      ]
    },



    // {
    //   id: "Our Team",
    //   icon: <FaUsers />,
    //   name: "Our Team",
    //   options: [
    //     {
    //       id: "Direct",
    //       name: "Direct",
    //       link: AuthenticatedRoutes.TEAM_DIRECT,
    //     },
    //     {
    //       id: "Levels",
    //       name: "Levels",
    //       link: AuthenticatedRoutes.TEAM_TREE,
    //     },
    //   ],
    // },
    {
      id: "OurPlan",
      icon: <MdOutlineAddCard />,
      name: "Our Plan",
      options: [
        {
          id: "Our Plans",
          name: "Our Plans",
          link: AuthenticatedRoutes.OUR_PLANS,
        },
        // {
        //   id: "Purchase Plan History",
        //   name: "Purchase Plan History",
        //   link: AuthenticatedRoutes.PURCHASE_PLAN_HISTORY,
        // },
      ],
    },

    // {
    //   id: "Support",
    //   icon: <BiSupport />,
    //   name: "Help & Support",
    //   options: [
    //     {
    //       id: "Support",
    //       name: "Raise Ticket",
    //       link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET,
    //     },
    //     {
    //       id: "Support History",
    //       name: "Raise Ticket History",
    //       link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY,
    //     },

    //   ],
    // },

    // {
    //     id: "Income Report",
    //     icon: <LuPackageSearch />,
    //     name: "Income Report",
    //     options: [
    //         {
    //             id: "Referral Income",
    //             name: "Referral Income",
    //             link: AuthenticatedRoutes.REFERRAL_INCOME_REPORT,
    //         },
    //         {
    //             id: "ROI Income",
    //             name: "ROI Income",
    //             link: AuthenticatedRoutes.ROI_INCOME_REPORT,
    //         },
    // {
    //   id: "Spin Income",
    //   name: "Spin Income",
    //   link: AuthenticatedRoutes.SPIN_INCOME_REPORT,
    // },
    // {
    //   id: "Royalty Income",
    //   name: "ROI Income",
    //   link: AuthenticatedRoutes.ROYALTY_INCOME_REPORT,
    // },
    // {
    //     id: "Level Income",
    //     name: "Level Income",
    //     link: AuthenticatedRoutes.LEVEL_INCOME_REPORT,
    // },
    // {
    //     id: "Matching Income",
    //     name: "Matching Income",
    //     link: AuthenticatedRoutes.MATCHING_INCOME_REPORT,
    // },
  ],

  // route added by vikas

  // {
  //   id: "Profile",
  //   icon: <FaUserTie />,
  //   name: "Account Setting",
  //   options: [
  //     {
  //       id: "Profile",
  //       name: "Profile",
  //       link: AuthenticatedRoutes.USER_PROFILE,
  //     },

  //   ],
  // },

  admin: [
    {
      id: "Dashboard",
      icon: <HiOutlineSquares2X2 />,
      name: "Dashboard",
      link: AuthenticatedRoutes.ADMIN_DASHBOARD,
    },
    {
      id: "CommisonSetter",
      icon: <FaRegNewspaper />,
      name: "Referral Setter",
      link: AuthenticatedRoutes.Admin_CommissionSetter,
    },
    //  {
    //     id: "Referral Income %",
    //     icon: <FaRegNewspaper />,
    //     name: "Referral Income %",
    //     link: AuthenticatedRoutes.REFERRAL_INCOME_PERCENT,
    // },
    // {
    //   id: "Level Income %",
    //   icon: <FaRegNewspaper />,
    //   name: "Level Income %",
    //   link: AuthenticatedRoutes.LEVEL_INCOME_PERCENT,
    // },
    {
      id: "Users",
      icon: <FaUsers />,
      name: "Users",
      options: [
        {
          id: "All Users",
          icon: <FaUsers />,
          name: "All Users",
          link: AuthenticatedRoutes.ALL_USERS,
        },
        {
          id: "Active Users",
          icon: <FaUsers />,
          name: "Active Users",
          link: AuthenticatedRoutes.ACTIVE_USERS,
        },

      ],
    },

    // {
    //   id: "AirDrop Income",
    //   icon: <FaUsers />,
    //   name: "AirDrop Income",
    //   options: [
    //     {
    //       id: "AirDrop Refferal Income",
    //       icon: <FaUsers />,
    //       name: "AIrDrop Refferal Income",
    //       link: AuthenticatedRoutes.AIRDROP_REFRELAL_INCOME,
    //     },
    //     {
    //       id: "AirDrop Level Income",
    //       icon: <FaUsers />,
    //       name: "AirDrop Level Income",
    //       link: AuthenticatedRoutes.AIRDROP_LEVEL_INCOME,
    //     },
    //     {
    //       id: "AirDrop Joining Income",
    //       icon: <FaUsers />,
    //       name: "AirDrop Joining Income",
    //       link: AuthenticatedRoutes.AIRDROP_JOINING_INCOME,
    //     },
    //   ],
    // },

    {
      id: "financialReports",
      icon: <FaUserTie />,
      name: "Financial Reports",
      options: [
        {
          id: "Transaction History",
          name: "Package Purchase History",
          link: AuthenticatedRoutes.PURCHASE_PLAN_HISTORY,
        },
        {
          id: "Referral Income History",
          name: "Referral Income History",
          link: AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT,
        },
        {
          id: "Stake  History",
          name: "Stake History",
          link: AuthenticatedRoutes.STAKE_HISTORY,
        },
        {
          id: "level Income History",
          name: "Level Income History",
          link: AuthenticatedRoutes.LEVEL_INCOME_REPORT,
        },
        {
          id: "ROI Income History",
          name: "ROI Income History",
          link: AuthenticatedRoutes.ROI_INCOME_HISTORY,
        },
        {
          id: "Admin TopUp History",
          name: "Admin TopUp History",
          link: AuthenticatedRoutes.ADMIN_TOPUP_HISTORY,
        },

        // {
        //     id: "Airdrop Income History",
        //     name: "Airdrop Income History",
        //     link: AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT,
        // },
      ],
    },

    {
      id: "Admin Controls",
      icon: <FaUsers />,
      name: "Admin Controls",
      options: [


        {
          id: "Admin TopUp",
          icon: <FaUsers />,
          name: " Admin TopUp",
          link: AuthenticatedRoutes.ADMIN_TOPUP,
        },
        {
          id: "Block/Unblocked",
          icon: <FaUsers />,
          name: " Block/Unblocked",
          link: AuthenticatedRoutes.BLOCK_UNBLOCK_USER,
        },
        {
          id: "Withdrawal Status",
          icon: <FaUsers />,
          name: "Withdrawal Status",
          link: AuthenticatedRoutes.WITHDRAWALBLOCK,
        },
        {
          id: "User Income Block",
          icon: <FaUsers />,
          name: "User Income Block",
          link: AuthenticatedRoutes.USER_INCOME_BLOCK,
        },
        {
          id: "User Profile Edit",
          icon: <FaUsers />,
          name: "User Profile Edit",
          link: AuthenticatedRoutes.USER_PROFILE_EDIT,
        },
      ],
    },
    {
      id: "Withdrawal Request",
      icon: <FaWallet />,
      name: "Withdrawal",
      options: [
        // {
        //     id: "Withdrawal Update",
        //     name: "Withdrawal Update",
        //     link: AuthenticatedRoutes.WITHDRAWAL_UPDATE,
        // },
        {
          id: "Withdrawal History",
          name: "Withdrawal History",
          link: AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST,
        },
      ],
    },

    {
      id: "News & Notification",
      icon: <BiSolidNotification />,
      name: "News & Notification",
      link: AuthenticatedRoutes.NEWS_AND_NOTIF_ADMIN,
    },

    {
      id: "Support",
      icon: <BiSupport />,
      name: "Help & Support",
      options: [
        {
          id: "Support history",
          name: "Raise Ticket History",
          link: AuthenticatedRoutes.RAISE_TICKET_LIST,
        },
      ],
    },
  ],
};

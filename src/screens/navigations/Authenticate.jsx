import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import UserMain from "../website/UserMain";
import DashboardMain from "../DashboardMain";
import ProfilePage from "../user/ProfilePage";
import Withdrawal from "../user/Withdrawal";
import WithdrawalReport from "../user/WithdrawalReport";
import TeamTree from "../user/TeamTree";
import AdminDashboard from "../admin/AdminDashboard";
import BankDetails from "../user/BankDetails";
import FundRequestForm from "../user/FundRequestForm";
import FundTransferForm from "../user/FundTransferForm";
import FundRequestReport from "../user/FundRequestReport";
import FundTransferReport from "../user/FundTransferReport";
import DirectTeamLists from "../user/DirectTeamLists";
import ReferralIncomeReports from "../user/income-pages/ReferralIncomeReports";
import SpinIncomeReports from "../user/income-pages/SpinIncomeReports";
import LevelIncomeReports from "../user/income-pages/LevelIncomeReports";
import RoyaltyIncomeReports from "../user/income-pages/RoyaltyIncomeReports";
import SelfIncomeReports from "../user/income-pages/SelfIncomeReports";
import FundRecieveReport from "../user/FundRecieveReport";
import CompleteWithdrawalRequest from "../admin/CompleteWithdrawalRequest";
import ComplainRaiseTicket from "../user/ComplainRaiseTicket";
import ComplainTicketHistory from "../user/ComplainTicketHistory";
import ComplainTicketList from "../admin/ComplainTicketList";
import AllUsersList from "../admin/AllUsersList";
import PurchasePlanHistory from "../user/PurchasePlanHistory";
import DirectReferralIncome from "../user/DirectReferralIncome";
import MatchingIncomeReports from "../user/income-pages/MatchingIncomeReports";
import AdminMatchingIncomeReports from "../admin/income-pages/AdminMatchingIncomeReports";
import AdminLevelIncomeReports from "../admin/income-pages/AdminLevelIncomeReports";
import AdminSelfIncomeReports from "../admin/income-pages/AdminSelfIncomeReports";
import AdminDirectReferralIncomeReports from "../admin/income-pages/AdminDirectReferralIncomeReports";
import AllPurchasePackageList from "../admin/AllPurchasePackageList";
import WithdrawalUpdate from "../admin/WithdrawalUpdate";
import RoiIncomeReport from "../user/income-pages/RoiIncomeHistory";
import ActiveUsers from "../admin/ActiveUsers";
import DirectRefferalIncomeHistory from "../user/income-pages/DirectRefferalIncomeHistory";
import Investplans from "../user/Investplans";
import Walletnew from "../../components/Walletnew";
import Assets from "../../components/Assets";
import DappWallet from "../../components/DappWallet";
import UsdtBEP from "../../components/UsdtBEP";
import UsdtTRC from "../../components/UsdtTRC";
import Activity from "../user/Activity";
import AirdropAlert from "../user/AirdropAlert";
import Withdrawalnew from "../../components/Withdrawalnew";
import Market from "../../components/Market";
import History from "../user/History";
import AiAgent from "../user/AiAgent";
import AiAgentDetails from "../user/AiAgentDetails";
import Support from "../user/Support";
import Announcement from "../user/Announcement";
import LevelAchievement from "../user/LevelAchievement";
import CommissionSetter from "../admin/CommissionSetter";
import AirDropRefrelIncome from "../admin/AirDropRefrelIncome";
import AirDropLevelIncome from "../admin/AirDropLevelIncome";
import AirDropJoiningIncome from "../admin/AirDropJoiningIncome";
import RefrelIncomePercentage from "../admin/RefrelIncomePercentage";
import LevelIncomePercentage from "../admin/LevelIncomePercentage";
import ConnectWallet from "../../components/ConnectWallet";
import TwoFA from "../../components/TwoFactorAuthentication";
import TwoFactorAuthentication from "../../components/TwoFactorAuthentication";
import ChatHistory from "../user/ChatHistory";
import OverallUserCustomPlan from "../user/OverallUserCustomPlan";
import TradeHistory from "../user/TradeHistory";
import BotTradeHistory from "../user/BotTradeHistory";
import BotTradehistoryDetails from "../user/BotTradehistoryDetails";
import NewsNotification from "../user/NewsNotification";
import NewsandNotifs from "../admin/NewsandNotifs";
import AdminTopup from "../admin/AdminTopup";
import BlockWithDrawal from "../admin/BlockWithDrawal";
import AdminTopup1 from "../admin/AdminTopup1";
import AdminTopUpHistory from "../admin/AdminTopUpHistory";
import AdminUserIncomeBlock from "../admin/AdminUserIncomeBlock";
import AdminUserProfileEdit from "../admin/AdminUserProfileEdit";
import StakeInvestmentHistory from "../user/income-pages/StakeInvestmentHistory";
// import { useEffect } from "react";

const Authenticate = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Routes>
        {role === "Admin" ? (
          <>
            <Route
              path={"*"}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />
            <Route
              path={AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<CompleteWithdrawalRequest />}
                  name="Complete Withdrawal Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.STAKE_HISTORY}
              element={
                <DashboardMain inner={<StakeInvestmentHistory />} name="Stake History" />
              }
            />
            <Route
              path={AuthenticatedRoutes.AIRDROP_REFRELAL_INCOME}
              element={
                <DashboardMain
                  inner={<AirDropRefrelIncome />}
                  name="Air Drop Referral Income"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.AIRDROP_LEVEL_INCOME}
              element={
                <DashboardMain
                  inner={<AirDropLevelIncome />}
                  name="Air Drop Level Income"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.AIRDROP_JOINING_INCOME}
              element={
                <DashboardMain
                  inner={<AirDropJoiningIncome />}
                  name="Air Drop Joining Income"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.REFERRAL_INCOME_PERCENT}
              element={
                <DashboardMain
                  inner={<RefrelIncomePercentage />}
                  name="Referral Income Percentage"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_PERCENT}
              element={
                <DashboardMain
                  inner={<LevelIncomePercentage />}
                  name="Level Income Percentage"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.Admin_CommissionSetter}
              element={
                <DashboardMain
                  inner={<CommissionSetter />}
                  name="Add Commission Percentage"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_DASHBOARD}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />
            <Route
              path={AuthenticatedRoutes.NEWS_AND_NOTIF_ADMIN}
              element={
                <DashboardMain inner={<NewsandNotifs />} name="News and Notification" />
              }
            />

            <Route
              path={AuthenticatedRoutes.RAISE_TICKET_LIST}
              element={
                <DashboardMain
                  inner={<ComplainTicketList />}
                  name="Raise Ticket History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ALL_USERS}
              element={
                <DashboardMain inner={<AllUsersList />} name="All Users List" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ACTIVE_USERS}
              element={
                <DashboardMain inner={<ActiveUsers />} name="Active Users" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BLOCK_UNBLOCK_USER}
              element={
                <DashboardMain inner={<AdminTopup />} name="User Block/Unblock" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_TOPUP}
              element={
                <DashboardMain inner={<AdminTopup1 />} name="Admin TopUp" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_TOPUP_HISTORY}
              element={
                <DashboardMain inner={<AdminTopUpHistory />} name="Admin TopUp History" />
              }
            />

            <Route
              path={AuthenticatedRoutes.WITHDRAWALBLOCK}
              element={
                <DashboardMain inner={<BlockWithDrawal />} name="withdrwal status" />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminLevelIncomeReports />}
                  name="Level Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SELF_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminSelfIncomeReports />}
                  name="Self Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<DirectRefferalIncomeHistory />}
                  name="Direct Referral Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROI_INCOME_HISTORY}
              element={
                <DashboardMain
                  inner={<AdminMatchingIncomeReports />}
                  name="ROI Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<AdminDirectReferralIncomeReports />}
                  name="Airdrop Income History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PURCHASE_PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<AllPurchasePackageList />}
                  name="All Purchase Package List"
                />
              }
            />

            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_UPDATE}
              element={
                <DashboardMain
                  inner={<WithdrawalUpdate />}
                  name="Withdrawal Details Update"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.USER_INCOME_BLOCK}
              element={
                <DashboardMain
                  inner={<AdminUserIncomeBlock />}
                  name="User Income Block"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.USER_PROFILE_EDIT}
              element={
                <DashboardMain
                  inner={<AdminUserProfileEdit />}
                  name="User Profile Edit"
                />
              }
            />
          </>
        ) : (
          <>
            <Route
              path={AuthenticatedRoutes.USER_HOME}
              element={<UserMain />}
            />
            <Route
              path={AuthenticatedRoutes.USER_DASHBOARD}
              element={<DashboardMain inner={<Walletnew />} name="Dashboard" />}
            />
            <Route path="*" element={<UserMain />} />
            <Route
              path={AuthenticatedRoutes.USER_PROFILE}
              element={<DashboardMain inner={<ProfilePage />} name="Profile" />}
            />
            <Route
              path={AuthenticatedRoutes.TWOFA}
              element={
                <DashboardMain inner={<TwoFactorAuthentication />} name="Setup 2FA" />
              }
            />
            <Route
              path={AuthenticatedRoutes.CHAT_HisTORY}
              element={
                <DashboardMain inner={<ChatHistory />} name="Ticket Raise History" />
              }
            />

            <Route
              path={AuthenticatedRoutes.Ai_Agent_History}
              element={
                <DashboardMain inner={<TradeHistory />} name="Ai Agent History" />
              }
            />
            <Route
              path={AuthenticatedRoutes.TRADE_HISTORY}
              element={
                <DashboardMain inner={<BotTradeHistory />} name="Trade History" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BOT_TRADE_HISTORY}
              element={
                <DashboardMain inner={<BotTradehistoryDetails />} name="Bot Trade History Details" />
              }
            />
            <Route
              path={AuthenticatedRoutes.BANK_DETAILS}
              element={
                <DashboardMain inner={<BankDetails />} name="Bank Detail" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ConnectWallet}
              element={
                <DashboardMain inner={<ConnectWallet />} name="Wallet Connect" />
              }
            />
            <Route
              path={AuthenticatedRoutes.Activity}
              element={<DashboardMain inner={<Activity />} name="Activity" />}
            />
            <Route
              path={AuthenticatedRoutes.AirdropAlert}
              element={
                <DashboardMain inner={<AirdropAlert />} name="Airdrop Alert" />
              }
            />
            {/* <Route
              path={AuthenticatedRoutes.USER_DASHBOARD}
              element={<DashboardMain inner={<Walletnew />} name="Wallet" />}
            /> */}

            {/* assets page  */}
            <Route
              path={AuthenticatedRoutes.ASSETS}
              element={<DashboardMain inner={<Assets />} name="Assets" />}
            />
            <Route
              path={AuthenticatedRoutes.DAPP_WALLET}
              element={
                <DashboardMain inner={<DappWallet />} name="Dapp Wallet" />
              }
            />
            <Route
              path={AuthenticatedRoutes.USDT_BEP}
              element={
                <DashboardMain inner={<UsdtBEP />} name="USDT(BEP-20)" />
              }
            />
            <Route
              path={AuthenticatedRoutes.USDT_TRC}
              element={
                <DashboardMain inner={<UsdtTRC />} name="USDT (TRC-20)" />
              }
            />

            <Route
              path={AuthenticatedRoutes.WITHDRAWAL}
              element={
                <DashboardMain inner={<Withdrawalnew />} name="Withdrawal" />
              }
            />
            <Route
              path={AuthenticatedRoutes.MARKET}
              element={<DashboardMain inner={<Market />} name="Market" />}
            />

            <Route
              path={AuthenticatedRoutes.REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<ReferralIncomeReports />}
                  name="Referral Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROI_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<RoiIncomeReport />}
                  name="ROI Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SPIN_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SpinIncomeReports />}
                  name="Spin Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<LevelIncomeReports />}
                  name="Level Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MATCHING_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<MatchingIncomeReports />}
                  name="Matching Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.DIRECT_REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<DirectReferralIncome />}
                  name="Airdrop Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROYALTY_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<RoyaltyIncomeReports />}
                  name="Royalty Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SELF_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SelfIncomeReports />}
                  name="Self Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.HISTORY}
              element={<DashboardMain inner={<History />} name="History" />}
            />
            <Route
              path={AuthenticatedRoutes.TEAM_TREE}
              element={<DashboardMain inner={<TeamTree />} name="Team Tree" />}
            />
            <Route
              path={AuthenticatedRoutes.WALLET}
              element={<DashboardMain inner={<Withdrawal />} name="Wallet" />}
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_REPORT}
              element={
                <DashboardMain
                  inner={<WithdrawalReport />}
                  name="Withdrawal Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PURCHASE_PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<PurchasePlanHistory />}
                  name="Purchase History"
                />
              }
            />
            {/* <Route
                            path={AuthenticatedRoutes.OUR_PLANS}
                            element={
                                <DashboardMain
                                    inner={<OverallUserCustomPlan />}
                                    name="Our Plan"
                                />
                            }
                        /> */}
            <Route
              path={AuthenticatedRoutes.OUR_PLANS}
              element={
                <DashboardMain inner={<OverallUserCustomPlan />} name="Invest Plan" />
              }
            />

            <Route
              path={AuthenticatedRoutes.FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<FundRequestForm />}
                  name="Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER}
              element={
                <DashboardMain
                  inner={<FundTransferForm />}
                  name="Fund Transfer"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_REQUEST_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRequestReport />}
                  name="Fund Request History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER_HISTORY}
              element={
                <DashboardMain
                  inner={<FundTransferReport />}
                  name="Fund Transfer History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_RECEIVE_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRecieveReport />}
                  name="Fund Receive History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TEAM_DIRECT}
              element={
                <DashboardMain inner={<DirectTeamLists />} name="Direct Team" />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUPPORT_RAISE_TICKET}
              element={
                <DashboardMain
                  inner={<ComplainRaiseTicket />}
                  name="Raise Ticket"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY}
              element={
                <DashboardMain
                  inner={<ComplainTicketHistory />}
                  name="Raise Ticket"
                />
              }
            />
            {/* <Route
              path={AuthenticatedRoutes.NEWS_AND_NOTIF}
              element={
                <DashboardMain
                  inner={<Notification />}
                  name="Notification & Announcements "
                />
              }
            /> */}
            <Route
              path={AuthenticatedRoutes.HISTORY}
              element={<DashboardMain inner={<History />} name="History" />}
            />
            <Route
              path={AuthenticatedRoutes.AI_AGENT}
              element={<DashboardMain inner={<AiAgent />} name="AI Agent" />}
            />
            <Route
              path={AuthenticatedRoutes.AI_AGENT_DETAILS}
              element={
                <DashboardMain
                  inner={<AiAgentDetails />}
                  name="AI Agent Details"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SUPPORT}
              element={<DashboardMain inner={<Support />} name="Support" />}
            />
            <Route
              path={AuthenticatedRoutes.ANNOUNCEMENTS}
              element={
                <DashboardMain inner={<Announcement />} name="Announcements" />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_ACHIEVEMENT}
              element={
                <DashboardMain
                  inner={<LevelAchievement />}
                  name="Level Achievement"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.USERAIRDROPALERT}
              element={
                <DashboardMain
                  inner={<AirdropAlert />}
                  name="Airdrop Alert"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.MARKET}
              element={
                <DashboardMain
                  inner={<Market />}
                  name="Market"
                />
              }
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default Authenticate;

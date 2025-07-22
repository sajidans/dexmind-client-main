import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base + "/users";
const token = localStorage.getItem("token");

export async function raiseSupportRequest(payload) {
  const response = await axios.post(`${apiURL}/support/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getComplainHistory() {
  const response = await axios.get(`${apiURL}/support/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUserTreeData() {
  const response = await axios.get(`${apiURL}/get-binary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function ticketRaisehistory() {
  const response = await axios.get(`${apiURL}/get-message-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getBanner() {
  const response = await axios.get(`${apiURL}/get-all-banners`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function sendOtpValidateEmail(payload) {
  const response = await axios.post(
    `${apiURL}/send-otp-for-password-reset`,
    payload
  );
  return response?.data;
}
export async function uploadBanner(payload) {
  const response = await axios.post(
    `${apiURL}/send-otp-for-password-reset`,
    payload
  );
  return response?.data;
}

export async function resetPasswordApi(payload) {
  const response = await axios.post(`${apiURL}/reset-password`, payload);
  return response?.data;
}

export async function buyPlanPackage(payload) {
  const response = await axios.post(`${apiURL}/invest`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function sentInvitation(payload) {
  const response = await axios.post(`${apiURL}/send-invitation`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function sentMessage(payload) {
  const response = await axios.post(`${apiURL}/support-message`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getCustomPlanList() {
  const response = await axios.get(`${apiURL}/all-packages`);
  return response?.data;
}

export async function getBannerListUser() {
  const response = await axios.get(`${apiURL}/get-banners`);
  return response?.data;
}
export async function getReferralIncomeHistory() {
  const response = await axios.get(`${apiURL}/referalIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response?.data);

  return response?.data;
}
export async function RoiIncomeAPi() {
  const response = await axios.get(`${apiURL}/getRoi-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}
export async function LevelIncomeApi() {
  const response = await axios.get(`${apiURL}/getLevelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}

export async function getLevelUsersDetails() {
  const response = await axios.get(`${apiURL}/getLevelUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function claimRoi() {
  const response = await axios.get(`${apiURL}/claim-today-roi`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response;
}
export async function swap(payload) {
  const response = await axios.post(`${apiURL}/swap-amount`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getFundTransferHistory() {
  const response = await axios.get(`${apiURL}/fund-transfer-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response;
}

export async function requestOtp(payload) {
  const response = await axios.post(
    `${apiURL}/transfer-funds-otp`,
    { payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function fundTransfer(payload) {
  console.log(payload);
  const response = await axios.post(`${apiURL}/transfer-funds`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function dateWiseTeamActivity(payload) {
  console.log(payload);
  const response = await axios.post(`${apiURL}/get-member-data`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export const getWithdrawalHistory = async () => {
  const response = await axios.get(`${apiURL}/withdraw-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response?.data);
  return response?.data;
};

export const getDepositHistory = async () => {
  const response = await axios.get(`${apiURL}/deposit-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getLevelIncomeHistory = async () => {
  const response = await axios.get(`${apiURL}/levelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

// export const getReferralIncomeHistory = async () => {
//   console.log("fjdij")
//   const response = await axios.post(`${apiURL}/referalIncome-history`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   });
//   return response?.data;
// };

export const fetchCryptoData = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "inr",
        ids: "bitcoin,ethereum,ripple,binancecoin,solana,tron",
        order: "market_cap_desc",
        per_page: 6,
        page: 1,
        sparkline: false,
      },
    }
  );
  return response.data;
};

export async function sendOtpFromUserApi(payload) {
  const response = await axios.post(`${apiURL}/transfer-funds-otp`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function generate2FA(payload) {
  const response = await axios.post(`${apiURL}/generate-2fa`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function verify2FA(payload) {
  const response = await axios.post(`${apiURL}/verify-2fa`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export const sendEmailOtp = async () => {
  const response = await axios.get(`${apiURL}/send-email-otp`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getcollectProfit = async () => {
  const response = await axios.get(`${apiURL}/place-trade`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};



export const updateAccount = async (walletAddress) => {
  const response = await axios.post(`${apiURL}/updateAccount`, { walletAddress }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });



  return response.data; // expected to be { success: true/false, message: '...' }
};

export const bep20walletAddress = async (formData) => {
  const response = await axios.post(`${apiURL}/set-bep20-address`, formData, {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add token if required
    },
    withCredentials: true, // if you are using cookies/session
  });

  return response.data; // returns { success: true/false, message: "..."}
};
export const trc20walletAddress = async (formData) => {
  const response = await axios.post(`${apiURL}/set-trc20-address`, formData, {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add token if required
    },
    withCredentials: true, // if you are using cookies/session
  });

  return response.data; // returns { success: true/false, message: "..."}
};

export const sendBep20Otp = async () => {
  const response = await axios.get(`${apiURL}/send-otp-for-wallet-change`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getAiAgentData = async () => {
  const response = await axios.get(`${apiURL}/get-all-plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getAiAgentDetails = async (id) => {
  const response = await axios.get(`${apiURL}/plan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log("ai agent", response?.data);
  return response?.data;
};

export const hireAiAgent = async (payload) => {

  try {
    const response = await axios.post(
      `${apiURL}/ai-agent-investment`,
      payload,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Server Error",
    };
  }
};

export const getTeamData = async () => {
  const response = await axios.get(`${apiURL}/get-team`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const aiAgentHistory = async () => {
  const response = await axios.get(`${apiURL}/ai-agent-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getAllBanners = async () => {
  const response = await axios.get(`${apiURL}/get-all-banners`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const sendWithdrawalOtp = async () => {
  const response = await axios.get(`${apiURL}/send-withdrawal-otp`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const redeemReward = async () => {
  const response = await axios.get(`${apiURL}/redeem-ai-agent-amount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getBotTradeHistory = async () => {
  const response = await axios.get(`${apiURL}/trade-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export async function submitWithdrawalApi(payload) {
  const response = await axios.post(`${apiURL}/user-withdraw`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}





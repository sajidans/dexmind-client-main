import { GlowButton } from '../../components/ui/Buttons';
import { levelCardData, teamRebateData } from '../../utils/data';
import LevelCard from '../../components/LevelCard';
import level0 from '../../assets/level0.png';
import level1 from '../../assets/level1.png';
import profile from '../../assets/profile.png';
import { MdContentCopy, MdOutlineErrorOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const LevelAchievement = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo?.user);
  const aProgress = userInfo?.activeAMembers || 0;
  const bcProgress = userInfo?.activeBCMembers || 0;
  const level = userInfo?.level || 0;
  const aiCredits = Number(userInfo?.aiCredits) || 0;

  const getProgressWidth = (count, target) => {
    const percent = (count / target) * 100;
    return percent > 100 ? '100%' : `${percent}%`;
  };

  const handleCopyUserName = () => {
    const userName = userInfo?.username;

    if (!userName) {
      Swal.fire('No user name available to copy.');
      return;
    }

    const fallbackCopy = (text) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          Swal.fire('User name copied to clipboard!');
        } else {
          Swal.fire('Failed to copy user name.');
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
        Swal.fire('Failed to copy user name.');
        document.body.removeChild(textarea);
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(userName).then(() => {
        Swal.fire('User name copied to clipboard!');
      }).catch((err) => {
        console.error('Clipboard API failed:', err);
        fallbackCopy(userName);
      });
    } else {
      fallbackCopy(userName);
    }
  };

  let remainingCredits = aiCredits;
  const levelCredits = levelCardData.map((data) => {
    const creditsForLevel = Math.min(remainingCredits, data.threshold);
    const isUnlocked = remainingCredits >= data.threshold;
    remainingCredits = Math.max(0, remainingCredits - data.threshold);
    return { creditsForLevel, isUnlocked };
  });

  if (!userInfo) {
    return <div className="text-white text-center p-4">Loading...</div>;
  }

  return (
    <div className="space-y-5 p-4 md:p-10 max-w-screen-xl mx-auto">
      <GlowButton text={`Level ${level} Achievement`} onClick={() => {}} />
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/2">
          {levelCardData.map((data, index) => {
            const { creditsForLevel, isUnlocked } = levelCredits[index];
            return (
              <LevelCard
                key={index}
                level={data.level}
                round={data.round}
                currentCredits={creditsForLevel}
                threshold={data.threshold || 1}
                unlocked={isUnlocked}
                badgeImage={data.badgeImage || level0}
                bgColor={data.bgColor || 'linear-gradient(to right, #434343, #bcbcbc)'}
                progressColor={data.progressColor || '#4caf50'}
              />
            );
          })}
        </div>

        <div className="w-full lg:w-1/2 space-y-5">
          {/* A Members Progress */}
          <div
            className="flex flex-col md:flex-row justify-between rounded-xl p-4"
            style={{ background: 'linear-gradient(to right, #434343, #bcbcbc)' }}
          >
            <div className="w-full text-white md:pr-5">
              <h2 className="text-2xl md:text-3xl font-semibold">Valid A Members</h2>
              <div className="flex items-center gap-3 py-4">
                <div className="w-full h-10 bg-gray-400 rounded-full">
                  <div
                    className="h-10 rounded-full"
                    style={{ width: getProgressWidth(aProgress, 6), background: '#ffffff' }}
                  />
                </div>
                <p className="text-xl md:text-2xl">{aProgress}/6</p>
              </div>
              <p className="text-base md:text-xl">
                Join at least 3 members with $100 or 6 with $50, or deposit $30 minimum to start earning.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:w-[30%] flex justify-center items-center">
              <img src={level0} alt="level 0 badge" className="h-40 md:h-52 w-40 md:w-52 object-cover" />
            </div>
          </div>

          {/* B/C Members Progress */}
          <div
            className="flex flex-col md:flex-row justify-between rounded-xl p-4"
            style={{ background: 'linear-gradient(to right, #FFD700, #bcbcbc)' }}
          >
            <div className="w-full text-white md:pr-5">
              <h2 className="text-2xl md:text-3xl font-semibold">Valid A Members</h2>
              <div className="flex items-center gap-3 py-4">
                <div className="w-full h-10 bg-gray-400 rounded-full">
                  <div
                    className="h-10 rounded-full"
                    style={{ width: getProgressWidth(aProgress, 6), background: '#fe7e13' }}
                  />
                </div>
                <p className="text-xl md:text-2xl">{aProgress}/6</p>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold">Valid B/C Members</h2>
              <div className="flex items-center gap-3 py-4">
                <div className="w-full h-10 bg-gray-400 rounded-full">
                  <div
                    className="h-10 rounded-full"
                    style={{ width: getProgressWidth(bcProgress, 6), background: '#fe7e13' }}
                  />
                </div>
                <p className="text-xl md:text-2xl">{bcProgress}/6</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:w-[30%] flex justify-center items-center">
              <img src={level1} alt="level 1 badge" className="h-40 md:h-52 w-40 md:w-52 object-cover" />
            </div>
          </div>

          {/* Team Rebate Table */}
          <div className="bg-[#25272D] rounded-3xl p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-white">Level</th>
                  <th className="text-right text-white">Required</th>
                </tr>
              </thead>
              <tbody>
                {teamRebateData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left text-white">{item.level}</td>
                    <td className="text-right text-white">{item.required}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Profile Info Card */}
          <div className="bg-[#25272D] rounded-3xl p-4 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-fit rounded-full bg-gray-700 p-4">
                <img
                  src={profile}
                  alt="profile"
                  className="w-32 h-32 md:w-52 md:h-52 object-cover rounded-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-3">
              <h1 className="text-2xl md:text-[2.5rem] font-semibold">{userInfo?.username}</h1>
              <div className="flex items-center gap-2 text-lg">
                <p>UUID: {userInfo?.username}</p>
                <MdContentCopy
                  className="cursor-pointer"
                  onClick={handleCopyUserName}
                  title="Copy Username"
                />
              </div>
              <div className="flex items-center gap-4">
                <GlowButton text={userInfo?.status ? 'Active' : 'Inactive'} onClick={() => {}} />
                <MdOutlineErrorOutline className="text-2xl md:text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelAchievement;

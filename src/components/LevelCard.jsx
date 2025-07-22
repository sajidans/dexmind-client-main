import React from 'react';
import { MdLock } from 'react-icons/md';

const LevelCard = ({ level, round, currentCredits, threshold, unlocked, badgeImage, bgColor, progressColor }) => {
  // Ensure valid numbers to prevent NaN
  const credits = Number(currentCredits) || 0;
  const maxCredits = Number(threshold) || 1; // Fallback to 1 to avoid division by zero
  const progress = maxCredits > 0 ? Math.min((credits / maxCredits) * 100, 100).toFixed(0) : 0;

  console.log(`LevelCard ${level}: credits=${credits}, maxCredits=${maxCredits}, progress=${progress}%, unlocked=${unlocked}`);

  return (
    <div className={`flex justify-between items-center rounded-xl p-4 mb-4`} style={{ background: bgColor || 'linear-gradient(to right, #434343, #bcbcbc)' }}>
      <div className="w-full text-white pr-5">
        <div className="flex items-center gap-2 text-[2rem] font-semibold">
          {!unlocked && <MdLock className="text-white" />}
          <span>Level {level} badge</span>
        </div>
        <p className="bg-transparent text-white border-2 rounded-full px-3 py-1 w-fit text-lg font-medium mt-4">Round {round}</p>
        <p className="text-lg mt-4">AI credits: {credits}/{maxCredits}</p>
        <div className="w-full h-6 bg-gray-300 rounded-full">
          <div
            className="h-6 rounded-full"
            style={{ width: `${progress}%`, background: progressColor || '#4caf50' }}
          />
        </div>
        <p className="text-lg">{progress}%</p>
      </div>
      <div className="w-[30%]">
        <img
          src={badgeImage || 'https://via.placeholder.com/208'}
          alt={`Level ${level} badge`}
          className="h-52 w-52 object-cover"
        />
      </div>
    </div>
  );
};

export default LevelCard;
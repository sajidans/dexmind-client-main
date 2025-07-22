import { useNavigate } from 'react-router-dom';

const AiAgentCard = ({ agent }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ai-agent-details/${agent?.id}`)}
      key={agent.id}
      className={`rounded-3xl p-6 text-white bg-gradient-to-br ${agent.bgColor} relative shadow-xl flex items-center justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
    >
      {/* Green dot if active */}
      {agent.isActive && (
        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-green-600 animate-pulse"></div>
      )}

      <div className='w-1/2'>
        <div>
          <h2 className="text-3xl font-bold">Ai Agent</h2>
          <p className="text-lg my-2 py-2 px-4 border-2 border-white w-fit rounded-full">{agent.name}</p>
        </div>
        <div className="mt-4">
          <p className="text-lg mb-1">Computing skills</p>
          <div className="w-full h-2 bg-white/30 rounded">
            <div
              className={`h-2 rounded ${agent.barColor}`}
              style={{ width: `${agent.skill}%` }}
            ></div>
          </div>
          <p className="text-lg mt-1">{agent.skill}%</p>
        </div>
      </div>
      <div className="w-1/2 px-10 space-y-1 text-xl">
        <p><span className="font-semibold">Duration:</span> {agent.duration}</p>
        <p><span className="font-semibold">Income:</span> {agent.income}</p>
        <p><span className="font-semibold">Investment:</span> {agent.investment}</p>
        <p><span className="font-semibold">Ai Agent fee:</span> {agent.handlingFee}</p>
      </div>
    </div>
  );
};

export default AiAgentCard;
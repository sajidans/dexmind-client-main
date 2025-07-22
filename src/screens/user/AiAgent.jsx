import { GlowButton } from '../../components/ui/Buttons';
import AiAgentCard from '../../components/AiAgentCard';
import { useEffect, useState } from 'react';
import { aiAgentHistory, getAiAgentData } from '../../api/user-api';
import AgentSimmer from './AgentSimmer';

const agentColorMap = {
  "Agent 1": { bgColor: "from-yellow-400 to-orange-500", barColor: "bg-orange-600" },
  "Agent 2": { bgColor: "from-indigo-500 to-blue-500", barColor: "bg-blue-800" },
  "Agent 3": { bgColor: "from-pink-500 to-purple-500", barColor: "bg-pink-300" },
  "Agent 4": { bgColor: "from-orange-400 to-red-500", barColor: "bg-red-500" },
  "Agent 5": { bgColor: "from-cyan-400 to-blue-500", barColor: "bg-blue-500" },
};

const AiAgent = () => {
  const [aiAgents, setAiAgents] = useState([]);
  const [activePlans, setActivePlans] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);

  const fetchAiAgentsData = async () => {
    setLoadingAgents(true);
    try {
      const response = await getAiAgentData();
      if (!response.success) throw new Error("Failed to fetch AI Agents");
      const enrichedAgents = response.plans.map((agent) => {
        const isActive = activePlans.some(
          (plan) => plan.plan === agent._id && plan.isActive
        );
        return {
          id: agent._id,
          name: agent.agentName,
          duration: `${agent.durationInDays} Days`,
          income: `${agent.incomePercent}%`,
          investment: `$${agent.minInvestment} - $${agent.maxInvestment}`,
          handlingFee: agent.aiAgentFee || "5%",
          skill: agent.computingSkills,
          isActive,
          ...agentColorMap[agent.agentName] || {},
        };
      });

      setAiAgents(enrichedAgents);
    } catch (error) {
      console.error("Error fetching AI Agent data:", error);
    } finally {
      setLoadingAgents(false);
    }
  };

  const fetchAiAgentHistory = async () => {
    try {
      const response = await aiAgentHistory();
      if (!response.success) throw new Error("Failed to fetch AI Agent history");
      setActivePlans(response.data);
    } catch (error) {
      console.error("Error fetching AI Agent history:", error);
    }
  };

  useEffect(() => {
    fetchAiAgentHistory();
    fetchAiAgentsData();

  }, []);

  useEffect(() => {
    if (activePlans.length > 0) {
      fetchAiAgentsData();
    }
  }, [activePlans]);

  return (
    <div className='space-y-10 p-4 md:p-10'>
      <GlowButton text="Ai Agent" onClick={() => { }} />
      <div className='border-2 border-[#00d5e6] rounded-2xl p-6 bg-[#0f172a]'>
        <h1 className='uppercase text-3xl mb-4'>Hire AI Agent</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {loadingAgents
            ? Array(1).fill(0).map((_, idx) => <AgentSimmer key={idx} />)
            : aiAgents.map((agent) => (
              <AiAgentCard key={agent.id} agent={agent} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AiAgent;

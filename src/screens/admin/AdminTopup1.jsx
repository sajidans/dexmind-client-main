import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { topUpUser } from '../../api/admin-api'; // Assuming this is the API function you'll import

const AdminTopup1 = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTopUpSubmit = async (e) => {
    e.preventDefault();
    if (!username || !amount) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please provide both Username and Amount.',
        timer: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await topUpUser({ userId: username.trim(), amount: parseFloat(amount) });
      Swal.fire({
        icon: 'success',
        title: 'Top-Up Successful',
        text: response?.message || 'User top-up completed successfully!',
        timer: 2000,
      });
      // Clear input fields after success
      setUsername('');
      setAmount('');
    } catch (error) {
      console.error('Top-Up Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Top-Up Failed',
        text: error?.response?.data?.message || 'Failed to process top-up.',
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { 
    
  }, []);

  return (
    <div className=" flex items-center justify-center ">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-3xl mt-20 shadow-2xl border border-white/20">
        {/* Glass effect container */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">User Top-Up</h2>
        <form onSubmit={handleTopUpSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-xl font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-1 w-full px-4 py-3 bg-white/5 border text-2xl border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-xl font-medium text-gray-200">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 w-full px-4 py-3 bg-white/5 border border-gray-500/50 rounded-lg text-white text-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white  text-2xl hover:bg-blue-700 rounded-xl border-2 border-white transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Top-Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminTopup1;
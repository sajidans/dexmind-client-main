import { useState, useEffect } from 'react';
import { MdChatBubble } from 'react-icons/md';
import PageLoader from '../../components/ui/PageLoader';
import { ticketRaisehistory } from '../../api/user-api';

const ChatHistory = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      const response = await ticketRaisehistory();
      console.log(response)
      if (!response?.success) throw new Error(response?.message || 'Failed to fetch data');

      const formattedData = response.data.map((item) => ({
        type: 'Support Message',
        message: item.message || '-',
        status: item.status || '-',
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          : '-',
        response: item.response || '-',
        file: item.file || null,
        icon: <MdChatBubble size={32} />,
      }));

      setChatData(formattedData);
    } catch (err) {
      setError(err.message || 'Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const closeImagePopup = () => setSelectedImage(null);
  const closeDetailPopup = () => setSelectedDetail(null);

  return (
    <div className="p-12 sm:p-16 max-w-screen-2xl mx-auto border-green-500 border-4 rounded-[40px] bg-transparent">
      <h1 className="text-6xl sm:text-7xl text-white mb-10 sm:mb-14 font-extrabold text-center">
        Ticket Raise History
      </h1>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <div className="text-red-500 text-center p-6 text-3xl">{error}</div>
      ) : (
        <div className="bg-transparent rounded-2xl overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-10 p-6 bg-transparent text-gray-300 font-bold text-3xl border-b-2 border-[#38384A]">
            <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">Message</div>
            <div className="min-w-[180px]">Status</div>
            <div className="min-w-[260px]">Date</div>
            <div className="min-w-[180px]">Attachment</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#38384A]">
            {chatData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-10 p-6 items-center text-gray-200 text-2xl"
              >
                <div className="break-words">{item.message}</div>
                <div>{item.status}</div>
                <div>{item.date}</div>
                <div>
                  {item.file ? (
                    <img
                      src={item.file}
                      alt="Attachment"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl cursor-pointer border-2 border-gray-600 hover:scale-110 transition-transform"
                      onClick={() => setSelectedImage(item.file)}
                    />
                  ) : (
                    '-'
                  )}
                </div>
                <div>
                  <button
                    onClick={() => setSelectedDetail(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={closeImagePopup}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged Attachment"
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            <button
              className="absolute top-4 right-4 bg-[#00d5e6] text-white rounded-full w-12 h-12 text-2xl flex items-center justify-center hover:bg-[#00b0c2] transition-colors"
              onClick={closeImagePopup}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {selectedDetail && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={closeDetailPopup}
        >
          <div className="bg-[#1e1e2f] text-white rounded-2xl p-8 w-full max-w-3xl relative">
            <button
              className="absolute top-4 right-4 bg-[#00d5e6] text-white rounded-full w-12 h-12 text-2xl flex items-center justify-center hover:bg-[#00b0c2] transition-colors"
              onClick={closeDetailPopup}
            >
              ✕
            </button>
            <h2 className="text-4xl font-bold mb-6 text-center">Ticket Details</h2>
            <div className="space-y-4 text-2xl">

              <p><strong>Message:</strong> {selectedDetail.message}</p>
              <p><strong>Status:</strong> {selectedDetail.status}</p>
              <p><strong>Date:</strong> {selectedDetail.date}</p>
              <p><strong>Response:</strong> {selectedDetail.response}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;

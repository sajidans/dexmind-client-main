
import { useState } from "react";

const SupportForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Payload:", formData);
    onClose();
  };

  return (
    <>
      <style>
        {`
          @keyframes slide-in-sidebar {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .animate-slide-in-sidebar {
            animation: slide-in-sidebar 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* Transparent full screen backdrop removed (as per request) */}

      {/* Sidebar Panel */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#0B020D]/80 text-white z-50 shadow-2xl animate-slide-in-sidebar backdrop-blur-none overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-2xl font-bold">Support</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-yellow-400"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-6 py-8 text-xl"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-lg bg-transparent border border-white/20 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-yellow-400 text-xl"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-lg bg-transparent border border-white/20 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-yellow-400 text-xl"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            className="p-4 rounded-lg bg-transparent border border-white/20 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-yellow-400 text-xl resize-none"
            required
          ></textarea>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-[#0B020D] transition text-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0B020D]/80 border border-white text-white font-semibold rounded-md hover:brightness-110 transition text-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SupportForm;

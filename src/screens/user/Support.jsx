import { useState, useEffect, useRef } from 'react';
import { GlowButton } from '../../components/ui/Buttons';
import { AiFillPicture } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { sentMessage } from '../../api/user-api';
import PageLoader from '../../components/ui/PageLoader';
import ChatUI from './ChatUI';

const Support = () => {
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [supportStatus, setSupportStatus] = useState(() => localStorage.getItem('supportStatus') || null);

  const messageEndRef = useRef(null);

  // Auto-scroll to latest chat message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Store chatMessages in localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Store/remove supportStatus in localStorage
  useEffect(() => {
    if (supportStatus) {
      localStorage.setItem('supportStatus', supportStatus);
    } else {
      localStorage.removeItem('supportStatus');
    }
  }, [supportStatus]);

  // Cleanup preview image URL
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          Swal.fire({
            icon: 'warning',
            title: 'Image Too Large',
            text: 'Please select an image smaller than 5MB.',
            toast: true,
            position: 'top-end',
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));

        Swal.fire({
          icon: 'success',
          title: 'Image Selected',
          text: `${file.name} selected!`,
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };
    input.click();
  };

  const handleSendMessage = async () => {
    if (message.trim() === '' || description.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all fields',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setIsLoading(true);

    const fullMessage = `${message}: ${description}${selectedImage ? ' (Image attached)' : ''}`;
    const updatedMessages = [...chatMessages, { from: 'user', text: fullMessage, timestamp: new Date().toISOString() }];
    setChatMessages(updatedMessages);

    const formData = new FormData();
    formData.append('subject', message);
    formData.append('description', description);
    formData.append('message', fullMessage);
    if (selectedImage) formData.append('file', selectedImage);

    try {
      const response = await sentMessage(formData);
      const newStatus = response?.data?.status;

      setSupportStatus(newStatus);

      Swal.fire({
        icon: 'success',
        title: 'Ticket Raised!',
        text: response.data.message || 'Your ticket was raised successfully!',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false,
      });

      if (newStatus === 'Approved' || newStatus === 'Rejected') {
        setMessage('');
        setDescription('');
        setSelectedImage(null);
        setImagePreview(null);
        setChatMessages([]);
        setSupportStatus(null);
        localStorage.removeItem('chatMessages');
        localStorage.removeItem('supportStatus');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Failed to raise ticket. Please try again.',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormUI = () => (
    <div className="w-full">
      <div className="w-full h-fit border-2 border-[#00d5e6] rounded-3xl p-5 bg-[#101727]">
        <h1 className="text-[1.5rem] mb-5 text-white">Raise Support Ticket</h1>




        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="Enter Subject"
          className="border-2 border-white rounded-lg py-4 px-4 bg-[#101727] w-full text-[1.25rem] placeholder:text-white text-white"
          disabled={isLoading}
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Describe your issue in detail..."
          rows={8}
          className="border-2 border-white rounded-lg py-4 px-4 bg-[#101727] w-full text-[1.15rem] placeholder:text-white text-white resize-none mt-5"
          disabled={isLoading}
        />

        <div className="mt-5">
          {imagePreview && (
            <img src={imagePreview} alt="Selected" className="w-32 h-32 object-cover rounded-lg mb-2" />
          )}
          <p className="text-white text-[1rem]">
            {selectedImage ? `Image selected: ${selectedImage.name}` : 'No image selected'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="relative">
            <GlowButton
              text={isLoading ? 'Sending...' : 'Raise Ticket'}
              onClick={handleSendMessage}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <AiFillPicture
            className={`text-[2rem] cursor-pointer ${isLoading ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:text-[#00d5e6]'
              }`}
            onClick={isLoading ? null : handleImageClick}
            title={isLoading ? 'Loading in progress' : 'Add or replace image'}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 p-4 md:p-10 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <PageLoader />
        </div>
      )}

      <GlowButton text="Support" onClick={() => { }} />

      {renderFormUI()}
    </div>
  );

}

export default Support;

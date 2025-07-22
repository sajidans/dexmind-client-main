import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generate2FA, verify2FA } from '../api/user-api';
import PageLoader from './ui/PageLoader';
import { GlowButton } from '../components/ui/Buttons';
import Swal from 'sweetalert2';

const TwoFactorAuthentication = () => {
  const [enable2FA, setEnable2FA] = useState(false);
  const [qrCode, setQrCode] = useState(localStorage.getItem('qrCode') || '');
  const [secretKey, setSecretKey] = useState(localStorage.getItem('secretKey') || '');
  const [isFirstTime2FA, setIsFirstTime2FA] = useState(
    localStorage.getItem('isFirstTime2FA') === 'true'
  );
  const userInfo = useSelector((state) => state?.userInfo?.userInfo?.user);
  const [loading, setLoading] = useState(false);

  const handleGenerateQrCode = async () => {
    if (isFirstTime2FA) {
      setEnable2FA(true);
      Swal.fire({
        title: 'Info',
        text: 'QR code has already been generated. Please scan it or reset 2FA.',
        icon: 'info',
        confirmButtonColor: '#207b61',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await generate2FA({ email: userInfo?.email });
      console.log(response)
      const resData = response?.data || response;

      if (resData?.success) {
        if (resData?.qrCode && resData?.secret) {
          setQrCode(resData.qrCode);
          setSecretKey(resData.secret);
          setIsFirstTime2FA(true);
          setEnable2FA(true);

          localStorage.setItem('qrCode', resData.qrCode);
          localStorage.setItem('secretKey', resData.secret);
          localStorage.setItem('isFirstTime2FA', 'true');

          Swal.fire({
            title: '2FA Enabled!',
            text: 'Scan the QR code with your authenticator app.',
            icon: 'success',
            confirmButtonColor: '#207b61',
          });
        } else {
          setIsFirstTime2FA(false);
          localStorage.setItem('isFirstTime2FA', 'false');
          throw new Error('QR code or secret not provided by the server.');
        }
      } else {
        throw new Error(resData?.message || '2FA Initiation Failed');
      }
    } catch (error) {
      console.error('2FA Init Error:', error);
      Swal.fire({
        icon: 'warning',
        title: 'Failed to initiate 2FA',
        text: error?.response?.data?.message || error.message || 'Something went wrong.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyHandler = async () => {
    try {
      const otp = document.querySelector('input[name="otp"]').value;
      if (!otp) {
        Swal.fire({
          title: 'Error',
          text: 'Please enter the OTP.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
        return;
      }

      setLoading(true);
      const payload = {
        email: userInfo?.email,
        otp: otp,
      };
      const data = await verify2FA(payload);
      setLoading(false);

      if (data.success) {
        Swal.fire({
          title: 'Success',
          text: '2FA verification successful!',
          icon: 'success',
          confirmButtonColor: '#207b61',
        });
        setEnable2FA(false);
        setQrCode('');
        setSecretKey('');
        setIsFirstTime2FA(false);
        localStorage.removeItem('qrCode');
        localStorage.removeItem('secretKey');
        localStorage.removeItem('isFirstTime2FA');
      } else {
        Swal.fire({
          title: 'Failed',
          text: error?.response?.data?.message || 'Invalid OTP. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong during verification.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  const reset2FA = () => {
    setQrCode('');
    setSecretKey('');
    setIsFirstTime2FA(false);
    setEnable2FA(false);
    localStorage.removeItem('qrCode');
    localStorage.removeItem('secretKey');
    localStorage.removeItem('isFirstTime2FA');
    Swal.fire({
      title: 'Reset',
      text: '2FA has been reset. You can generate a new QR code.',
      icon: 'success',
      confirmButtonColor: '#207b61',
    });
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    Swal.fire({
      title: 'Copied!',
      text: 'Secret key copied to clipboard.',
      icon: 'success',
      confirmButtonColor: '#207b61',
      timer: 1500,
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="">
      <GlowButton
        text="2FA Authentication"
        onClick={handleGenerateQrCode}
      />
      <div className="mt-10">
        <div className="text-center">
          <button
            onClick={handleGenerateQrCode}
            className="px-4 py-3 text-xl font-semibold bg-gradient-to-r from-[#5fc7c0] to-[#207b61] hover:bg-indigo-500 transition-all duration-300 rounded-lg"
          >
            {enable2FA ? 'Hide 2FA Setup' : 'Set Your 2FA'}
          </button>

        </div>
        {enable2FA && isFirstTime2FA && (
          <div className="max-w-5xl mx-auto bg-black/30 p-5 rounded-2xl mt-10 text-center">
            <div className="w-full">
              <h1 className="text-3xl text-center font-bold mb-5">Scan QR Code</h1>
              <img src={qrCode} alt="QR Code" className="h-72 w-72 mx-auto" />
              <div className="mt-4">
                <p className="text-lg text-gray-300">Secret Key: {secretKey}</p>
                <button
                  onClick={copySecretKey}
                  className="px-3 py-2 text-md bg-[#5BC2BA] hover:bg-[#4AB0A8] text-white text-[1.2rem] transition-all duration-300 rounded-lg mt-2"
                >
                  Copy Secret Key
                </button>
                <p className="text-md text-[1rem]  mt-2">
                  You can scan the QR code or manually enter the secret key into your Google Authenticator or similar authenticator app.
                </p>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="otp"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 text-xl bg-gray-800 border-none outline-none rounded-lg mt-4"
              />

              <button
                className="px-4 py-3 w-full text-xl bg-[#5BC2BA] hover:bg-[#4AB0A8] transition-all duration-300 rounded-lg mt-4"
                onClick={verifyHandler}
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
import React, { useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import OtpInput from 'src/components/OTPInput/OtpInput';
import PurpleButton from 'src/components/Buttons/BlackButton';
import image from 'src/assets/images/OTP page/dried-flowers-notebook.jpg';
import image1 from 'src/assets/images/OTP page/11857.jpg';
import image2 from 'src/assets/images/OTP page/blue-brushstrokes-background.jpg';
import verifyOTP from 'src/api/otp_verification/verify_otp';
import resendOTP from 'src/api/otp_verification/resend_otp';
import swal from 'sweetalert';

const OTPVerification = () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const email = url.searchParams.get('email');
  const [otp, setOtp] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const [resendmesaage, setResendmessage] = useState('');

  // Callback function to handle OTP changes
  const handleOtpChange = (value) => {
    setOtp(value);
    // You can add logic here to verify the OTP or perform other actions.
  };

  const handleSubmit = async () => {
    const responseData = await verifyOTP(otp, id);
    if (responseData.message === 'OTP is verified successfully.') {
      console.log(responseData);
      swal({
        title: 'Done!',
        text: 'Publisher is registered successfully.',
        icon: 'success',
        timer: 2000,
        button: false,
      });
      // Use setTimeout to wait for 2 seconds before executing the following code
      setTimeout(() => {
        window.location.href = `/auth/login`;
      }, 1000); // Also set the delay here to 2000 milliseconds (2 seconds)
    } else {
      setErrormessage(responseData.message);
      console.log(responseData);
    }
  };

  const handleResend = async () => {
    const responseData = await resendOTP(id, email);
    if (responseData.message === 'OTP is sent successfully.') {
      setResendmessage(responseData.message);
      console.log(responseData.message);
    } else {
      setErrormessage(responseData.message);
      console.log(responseData);
    }
  };

  return (
    <PageContainer title="OTP Verification Page" description="this is OTP Verification Page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1300px',
          height: '600px',
          margin: '0 auto',
          marginBlock: '3%',
          borderRadius: '20px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)',
          backgroundImage: `url(${image})`, // Set the background image
          backgroundSize: '100% 100%', // Make the image fit the container
          backgroundRepeat: 'no-repeat', // Prevent image from repeating
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '600px',
            height: '450px',
            margin: '0 auto',
            marginBlock: '8%',
            borderRadius: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)',
            backgroundImage: `url(${image1})`, // Set the background image
            backgroundSize: '100% 100%', // Make the image fit the container
            backgroundRepeat: 'no-repeat', // Prevent image from repeating
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '40px', // Add padding for spacing
                borderRadius: '10px', // Rounded corners for the content box
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)', // Box shadow for depth
                textAlign: 'center', // Center align text
                backgroundImage: `url(${image2})`, // Set the background image
                backgroundSize: '100% 100%', // Make the image fit the container
                backgroundRepeat: 'no-repeat', // Prevent image from repeating
              }}
            >
              <h1>OTP Verification</h1>
              <p>
                <h4>Enter the OTP sent to your email:</h4>
              </p>
              <div
                style={{
                  paddingLeft: '30px',
                }}
              >
                <OtpInput numInputs={6} onChange={handleOtpChange} />
              </div>

              <p>Entered OTP: {otp}</p>
              <p style={{ color: 'red' }}>{errormessage}</p>
              <p style={{ color: 'green' }}>{resendmesaage}</p>
              <div style={{ display: 'flex', gap: '38px', paddingLeft: '50px' }}>
                <PurpleButton onClick={handleSubmit} label="Submit" />
                <PurpleButton onClick={handleResend} label="Resend OTP" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default OTPVerification;

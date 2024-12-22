import React, { useState } from 'react';
import login from '../../assets/login.jpg';
import Footer from '../Footer/Footer';
import Otpwarn from '../Otp/Otp-warn';
import Leftpanel1 from '../Left Panel 1/Leftpanel1';
import Leftpanel2 from '../Left Panel 2/leftpanel2';
import Rightpanel1 from '../Right panel 1/rightpanel1';
import Rightpanel2 from '../Right Panel 2/Rightpanel2';
import Fscs from '../FSCS/Fscs';
import Header from '../Header/Header';

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleContinue = (e) => {
        e.preventDefault();
        if (username) {
            setStep(2);
            setUsername(username); // Update the parent state
        }
    };

    return (
        <div className="min-h-screen bg-[#3e505d]">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative min-h-[calc(100vh-80px)]">
                {/* Background img */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={login}
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Login Container */}
                <div className="relative z-10 px-4 pt-8">
                    <div className='flex justify-center flex-col items-center gap-6'>
                        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                            {/* Left Panel */}
                            <div className="bg-white p-8 rounded-sm flex flex-col justify-between h-full">
                                {step === 1 ? (
                                    <>
                                     <Leftpanel1 
                                        username={username}
                                        setUsername={setUsername}
                                        rememberMe={rememberMe}
                                        setRememberMe={setRememberMe}
                                        handleContinue={handleContinue}
                                     />
                                    </>
                                ) : (
                                    <>
                                       <Leftpanel2 username={username} setStep={setStep} />
                                    </>
                                )}
                            </div>
                            {/* Right Panel */}
                            <div className="bg-gray-200 p-8 rounded-sm">
                                <h2 className="text-[#1a1f71] text-xl mb-6">Help and support</h2>
                                {step === 1 ? (
                                    <>
                                       <Rightpanel1 />
                                    </>
                                ) : (
                                    <>
                                        <Rightpanel2 />
                                    </>
                                )}

                                {/* FSCS Information */}
                                <Fscs />
                            </div>
                        </div>
                        {/* OTP Warning */}
                        <div className='flex justify-center bg-white max-w-[1100px] w-full  rounded-sm mb-16'>
                            {step === 1 && (
                             <Otpwarn />
                            )}
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}


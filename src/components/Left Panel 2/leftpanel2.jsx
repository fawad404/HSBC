import { React, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Calculator from '../../assets/cal.svg'
import Security from '../../assets/security.svg'
const leftpanel2 = ({ username, setStep }) => {
    const [isOpen, setIsOpen] = useState(false);
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

            <form >

                <div>
                    <label className="block text-sm mb-2">6-digit security code</label>
                    <input
                        type="text"
                        maxLength={6}
                        className="p-2 mt-2 border border-gray-300 focus:border-[#1a1f71] outline-none"
                    />
                    <div className="w-full mt-4">
                        <div className="flex justify-start items-start cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}>
                            <h2 className="text-xs font-bold">How to generate a security code
                            </h2>
                            <button
                                type="button" // Change this line
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className='h-4 w-4' />
                                </motion.span>
                            </button>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='flex flex-row gap-4 mt-2 justify-center items-center'
                                >
                                    <div>
                                        <img src={Calculator} alt="12" />
                                    </div>
                                    <ol className='text-sm text-gray-700 pl-4 space-y-2'>
                                        <li type='1'>
                                            Press the GREEN button <span><img src={Security} alt="Green button" className='inline-block' /></span> Security step icon in the bottom right corner until the screen turns on
                                        </li>
                                        <li type='1'>
                                            Enter your 4-8 digit PIN and HSBC will appear on your device.
                                        </li>
                                        <li type='1'>
                                            Press the GREEN button <span><img src={Security} alt="" className='inline-block' /></span> Security step icon again to generate a 6 digit security code. Enter the security code as shown on the device.
                                        </li>
                                    </ol>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-6 flex justify-end  mt-64">
                    <button
                        type="submit"
                        className="bg-[#db0011] text-white px-6 py-2 rounded-sm hover:bg-[#b30d1f] transition-colors "
                    >
                        Log On
                    </button>
                </div>
            </form>
        </div>
    )
}

export default leftpanel2

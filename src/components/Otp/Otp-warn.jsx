import {React , useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react'
const Otpwarn = () => {
    const [otpVisible, setOtpVisible] = useState(true);

    return (
        <div className="w-full bg-white">
            <div className="flex justify-between items-start p-6 pb-2 hover:bg-[#f3f3f3] hover:cursor-pointer"
                onClick={() => setOtpVisible(!otpVisible)}>
                <h2 className="text-[1.35rem] font-normal text-[#000000]">Never share One-Time Passcodes (OTPs)</h2>
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 border-l-gray-400 border-l-2 pl-4"
                >
                    <motion.span
                        animate={{ rotate: otpVisible ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className='h-7 w-8' />
                    </motion.span>
                </button>
            </div>
            <AnimatePresence>
                {otpVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='flex flex-col text-md font-normal text-gray-700 space-y-2 p-6 pt-2 mr-0 md:mr-28'>
                            <p>
                                Recently, we've seen an increase in fraudsters tricking customers into giving them OTPs.
                            </p>
                            <p>
                                Fraudsters will often contact you pretending to be from your bank and ask you to provide OTPs to stop transactions; however, they may already have your card details and these codes are being used to make payments.
                            </p>
                            <p>
                                HSBC or any other genuine organisation will never ask you for OTPs; they're for your use only.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Otpwarn

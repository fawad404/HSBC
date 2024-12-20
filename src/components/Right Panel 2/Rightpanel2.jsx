import React from 'react'
import { ChevronRight } from 'lucide-react'
const Rightpanel2 = () => {
    return (
        <>
            <h3 className="font-semibold mb-4">Security Device help</h3>
            <ul className="space-y-2 text-sm px-6">
                <li type='disc'>
                    <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/reset/resetofflinepassword" className="text-black hover:underline">
                        Reset your password <ChevronRight className='h-4 w-4 inline-block text-red-600' />
                    </a>
                </li>
                <li type='disc'>
                    <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/resetpin" className="text-black hover:underline">
                        Reset your Security Device PIN <ChevronRight className='h-4 w-4 inline-block text-red-600' />
                    </a>
                </li>
                <li type='disc'>
                    <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/information@@security-device" className="text-black hover:underline">
                        Get a replacement Security Device <ChevronRight className='h-4 w-4 inline-block text-red-600' />
                    </a>
                </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">
                Business Banking app - Digital Security Device help
            </h3>
            <ul className="space-y-2 text-sm px-6">
                <li type='disc'>
                    <a href="#" className="text-gray-800 hover:underline">
                        How to download the Business Banking app and set up your Digital Security Device
                    </a>
                </li>
                <li type='disc'>
                    <a href="#" className="text-gray-800 hover:underline">
                        How to reset your passcode
                    </a>
                </li>
            </ul>
        </>
    )
}

export default Rightpanel2

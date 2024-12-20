import React from 'react'
import { ChevronRight } from 'lucide-react'
const Rightpanel1 = () => {
    return (

        <>
            <h3 className="font-semibold mb-4">Account help</h3>
            <ul className="space-y-2 px-6">
                <li type="disc">
                    <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/recover-username" className="text-[#000] hover:underline">
                        Forgotten your username
                        <ChevronRight className='h-4 w-4 inline-block text-red-600' />
                    </a>
                </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">Password and device help</h3>
            <p className="text-sm mb-4">
                Please enter your username to continue if you:
            </p>
            <ul className='text-sm flex flex-col justify-start space-y-2 items-start'>
                <li>
                    <span className='text-gray-400'> - </span>
                    need to reset your password
                </li>
                <li >
                    <span className='text-gray-400'> - </span>
                    have a physical Security Device and need to reset your device PIN or order a new device
                </li>
            </ul>
        </>
    )
}

export default Rightpanel1

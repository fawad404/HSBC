import React from 'react'
import logo from '../../assets/logo.svg'
import {MessageCircleQuestionIcon} from 'lucide-react'
const Header = () => {
  return (
    <header className="bg-[#3e505d] p-4 flex justify-between items-center max-sm:flex-row-reverse">
                    <img
                        src={logo}
                        alt="HSBC Logo"
                        width={120}
                        height={40}
                        className="w-[120px]"
                    />
                    <div className='flex items-center gap-6 '>
                        <div className=' p-2 bg-white rounded-full'>
                            <MessageCircleQuestionIcon className='h-4 w-4 text-black' />
                        </div>
    
                        <a
                            href="#"
                            className="text-white text-sm max-sm:hidden hover:underline flex items-center px-4 py-2 bg-[#4d6474] rounded-sm "
                        >
                            Return to business banking  
                        </a>
                    </div>
                </header>
  )
}

export default Header

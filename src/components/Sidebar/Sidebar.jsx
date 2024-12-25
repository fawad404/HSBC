import { CheckSquare, Zap , CircleDollarSign, ArrowUpCircle, Monitor, CreditCard, Users2, UserRoundCheck } from 'lucide-react'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { File } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Sidebar({ isOpen, setIsOpen }) {
  const [activeTab, setActiveTab] = useState('Ahmad Asrar')
  
  const menuItems = [
    { icon: UserRoundCheck, text: 'Ahmad Asrar', href: '#' },
    { icon : File , text: 'File Your Returns' , href:'#'},
    { icon: CircleDollarSign, text: 'Simply Invest', href: '#' },
    { icon: CheckSquare, text: 'Invest Bill pay', href: '#' },
    { icon: ArrowUpCircle, text: 'Pay and Transfer', href: '#' },
    { icon: Monitor, text: 'Open fixed Deposit', href: '#' },
    { icon: Zap, text: 'Mutual Funds', href: '#' },
    { icon: CreditCard, text: 'Statements and certificates', href: '#' },
    { icon: Users2, text: 'Nomination', href: '#' }
  ]

  return (
    <div className={`${isOpen ? 'fixed inset-0' : 'hidden'} w-[75%] md:w-[40%] lg:block lg:w-72 bg-[#171829] text-white border-r border-[#ffffff12] z-50`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-32 px-6 border-b border-gray-200">
          <Link to='/'>
          <img 
            src={logo} 
            alt="Favicon" 
            className="h-44 w-44"
          />
         </Link>
          <button onClick={() => setIsOpen(false)} className="ml-4 flex items-center p-2 rounded-md bg-[#4a5055] border border-[#ffffff1a]  backdrop-filter backdrop-blur-sm lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid status_toggle middle sidebar-toggle text-white hover:text-[#5c61f2] transition-colors duration-300"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  onClick={() => setActiveTab(item.text)}
                  className="flex items-center space-x-2 rounded p-2"
                >
                <div className={`${activeTab === item.text ? 'bg-[#83000A] shadow-[1.5px_0.33px_16px_0px_rgba(192,192,192,0.3)]' : ''} transition-all duration-200 p-2 rounded-md `}>
                  <item.icon size={20} />
                </div>
                  <span className='hover:text-[#83000A] transition-colors duration-300'>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}


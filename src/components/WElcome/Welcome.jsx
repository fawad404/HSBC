import { useState, useEffect } from 'react'
import { Eye, EyeOff, RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function WelcomeBanner() {
  const [greeting, setGreeting] = useState('')
  const [lastLogin, setLastLogin] = useState('')
  const [showBalance, setShowBalance] = useState(true)
  const balance = '£2,547.83'

  useEffect(() => {
    // Get current time in UK timezone
    const ukTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
    const hour = new Date(ukTime).getHours()

  
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning')
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }

    // Format last login time in UK format
    const lastLoginDate = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    setLastLogin(lastLoginDate)
  }, [])

  const handleRefresh = async () => {
    console.log('Sending refresh request to admin...')
    
    toast.dismiss()
    
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-[#333] shadow-lg rounded-lg pointer-events-auto flex flex-col items-center`}>
        <div className="flex-1 w-full p-4">
          <div className="flex flex-col items-center">
            <div className="text-white text-center">
              The request has been forwarded to your Business Account Director for review and approval. Kindly await further confirmation
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="mt-4 px-4 py-2 bg-[#DB104F] text-white rounded-md hover:bg-[#83000A] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
    })
  }

  return (
    <div className="bg-[#171829] text-white p-6 relative rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-light mb-2">{greeting}</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-200">Current Balance:</span>
            <span className="font-medium">
              {showBalance ? balance : '******'}
            </span>
            <RefreshCcw 
              size={18} 
              className="text-gray-300 ml-2 cursor-pointer hover:text-white transition-colors" 
              onClick={handleRefresh}
            />
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          Last logged in on {lastLogin}
        </div>
      </div>
    </div>
  )
}


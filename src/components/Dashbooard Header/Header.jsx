import { User2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import useAuthStore from '../../stores'; // Import your auth store
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  const { removeAuthUser } = useAuthStore(); // Assuming you have a method to update the store
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign out from Firebase
      removeAuthUser(); // Clear user data from your store
      localStorage.removeItem('currentUser'); // Remove user data from localStorage
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md h-20 lg:h-32 flex items-center">
      <div className="flex w-full px-6 justify-between items-center">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="flex items-center p-2 rounded-md bg-[#db0011] hover:bg-[#af000d] lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-grid status_toggle middle sidebar-toggle text-white"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <div className="flex flex-col text-xl max-lg:hidden space-y-1">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl lg:text-3xl font-normal text-gray-900">Corporate Banking Portal</h1>
              <p className="text-sm lg:text-base text-gray-600">SMART ENERGY EFFICIENT SOLUTIONS LTD</p>
              <p className="text-sm lg:text-base text-gray-600">Private limited Company - 14826884</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={handleSignOut}
              className="flex text-gray-500 focus:outline-none"
              title="Sign Out"
            >
              <User2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

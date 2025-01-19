import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Dashbooard Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import WelcomeBanner from '../../components/WElcome/Welcome';
import Info from '../../components/MobilebankingInfo/Info';
import useAuthStore from '../../stores';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authUser, setAuthUser } = useAuthStore(); 
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if(!authUser){
      navigate('/login');
    }
  }, [setAuthUser, navigate]);

  if (!authUser) {
    
    return null;
  }

  console.log(authUser);

  return (
    <>
      <Helmet>
        <title>Dashboard Business Banking</title>
        <meta
          name="description"
          content="Welcome to the HSBC Dashboard. Manage your transactions and view your account information."
        />
      </Helmet>
      <div className="flex h-screen bg-gray-100 font-hsbc">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Info />
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="px-6 py-8">
              <WelcomeBanner />
              <TransactionsTable user={authUser?.user?._id}/>
            </div>
          </main>
          <footer className="bg-white border-t border-gray-200 p-4">
            <p className="text-center text-gray-600 text-sm">
              HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

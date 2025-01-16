import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import CardHeader from '../../components/CardHeader/CardHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable'
import WelcomeBanner from '../../components/WElcome/Welcome'
import Info from '../../components/MobilebankingInfo/Info'
import CardsTransactions from '../../components/CardsTransections/CardsTransections'
import useAuthStore from '../../stores'

export default function CardDetails() {
  const { authUser } = useAuthStore(); 
  const username = authUser?.user?.username;
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Access the cards directly
    const cards = authUser?.user?.cards || [];
    
    // Find the card with the matching id
    const card = cards.find(c => c._id === id);

    // Update the state with the card details
    setCardDetails(card || null);
  }, [id, authUser]);

  return (
    <>
    <Helmet>
      <title>Dashboard Business Banking</title>
      <meta name="description" content="Welcome to the HSBC Dashboard. Manage your transactions and view your account information." />
    </Helmet>
    <div className="flex h-screen bg-gray-100 font-hsbc">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
      <Info />
        <CardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} cardDetails={cardDetails} cardUser={username} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="px-6 py-8">
            <WelcomeBanner />
            <CardsTransactions cardDetails={cardDetails} cardUser={username}  />
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
  )
}


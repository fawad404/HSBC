import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Header from '../../components/Dashbooard Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable'
import WelcomeBanner from '../../components/WElcome/Welcome'
import Info from '../../components/MobilebankingInfo/Info'
import CardsTransactions from '../../components/CardsTransections/CardsTransections'

export default function CardDetails() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    if (!id) return;

    const cards = [
      { id: "1", number: "1265 7896 3658 75", cvv: "675", expiry: "06/26" },
      { id: "2", number: "4532 8721 9012 3456", cvv: "123", expiry: "09/25" },
      { id: "3", number: "5678 1234 5678 9012", cvv: "456", expiry: "12/24" },
      { id: "4", number: "9012 3456 7890 1234", cvv: "789", expiry: "03/25" },
      { id: "5", number: "3456 7890 1234 5678", cvv: "321", expiry: "08/26" },
      { id: "6", number: "7890 1234 5678 9012", cvv: "654", expiry: "11/25" },
    ];
    
    const card = cards.find(c => c.id === id);
    setCardDetails(card || null);
  }, [id]);

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
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="px-6 py-8">
            <WelcomeBanner />
            <CardsTransactions cardDetails={cardDetails} />
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


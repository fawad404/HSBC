import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ChevronRight, Plus, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../../stores';


const Card = ({ children, className, onClick }) => (

  <div 
    className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#db0011] disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ManageCards = () => {
  const { authUser } = useAuthStore(); 
  console.log(authUser?.user?.cards);
  const [isVisible , setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [cards, setCards] = useState(authUser?.user?.cards || []);

  const [showPopup, setShowPopup] = useState(false);

  const toggleCardVisibility = (id) => {
    setCards(cards.map(card => 
      card._id === id ? { ...card, isVisible: !card.isVisible } : card
    ));
  };

  const maskNumber = (number) => {
    if (!number) return "•••• •••• •••• ••••";
    return number.replace(/\d(?=\d{4})/g, "•");
  };

  const handleRequestMoreCards = () => {
    setShowPopup(true);
  };

  return (
    <div className="">

    <div className='flex justify-center items-center text-white p-6 relative rounded-md bg-[#171829] mt-2 mb-8'>
      <h1 className="text-4xl font-normal text-center">Manage Your Cards</h1>
    </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {Array.isArray(cards) && cards.length > 0 ? (
        cards.map((card) => (
          <Card
            key={card._id}
            className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer perspective-1000"
            onClick={() => navigate(`/dashboard/manage-cards/${card._id}`)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#db0011]/10 via-transparent to-[#db0011]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 relative transform transition-transform duration-500 group-hover:rotate-y-12">
              <div className="flex items-start justify-between mb-4">
                <CreditCard className="h-10 w-10 text-[#db0011]" />
                <div className="space-x-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCardVisibility(card._id);
                    }}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
                    {card.isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="font-mono text-xl tracking-wider">
                  {card.isVisible ? card.cardNumber : maskNumber(card.cardNumber)}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>CVV: {card.isVisible ? card.cvv : "•••"}</span>
                  <span>Expiry: {card.dd}/{card.mm}</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ChevronRight className="h-6 w-6 text-[#db0011]" />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No cards available</p>
      )}
      </div>

      <div className="text-center">
        <Button
          onClick={handleRequestMoreCards}
          className="group relative overflow-hidden bg-[#db0011] hover:bg-[#af000d] text-white px-10 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-3 text-xl font-medium">
            Request More Cards
            <Plus 
              className="h-6 w-6 transition-transform duration-300 group-hover:rotate-180" 
            />
          </span>
          <div 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#af000d] transition-transform duration-500 ease-in-out" 
          />
        </Button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#333] p-6 rounded-lg shadow-lg text-center w-[40%] max-sm:w-full max-sm:mx-4">
            <p className="text-white mb-4">
            Request has been sent to your Business Account Director. Please wait for approval. 
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-[#DB104F] text-white rounded-md hover:bg-[#83000A] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCards;


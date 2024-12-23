import React, { useState } from 'react';
import { X } from 'lucide-react';
const Info = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full">
          <span className="text-xl font-bold">i</span>
        </div>

        {/* Text */}
        <p className="text-sm text-gray-800">
          Make convenient, fast and fee-free outward international remittances via the HSBC India Mobile Banking app today.{' '}
          <a
            href="https://www.business.hsbc.uk/en-gb/solutions/business-mobile-banking"
            className="text-red-600 font-medium hover:underline"
          >
            Learn more.
          </a>
        </p>
      </div>

      {/* Close Button */}
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700 focus:outline-none hover:rotate-90 transition-transform"
        aria-label="Close"
        onClick={() => setIsVisible(false)}
      >
        <X size={24}/>
      </button>
    </div>
  );
};

export default Info;

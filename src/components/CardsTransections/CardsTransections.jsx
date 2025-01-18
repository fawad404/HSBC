import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parse, isWithinInterval } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/pdf-logo.svg';

export default function CardsTransactions({ cardDetails, cardUser }) {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState(null); // Set initial state to null or undefined
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions dynamically from the API
  const fetchTransactions = async () => {
    if (cardNumber) {
      try {
        setLoading(true);
        const response = await fetch('https://hsbc-backend.vercel.app/api/v1/transections/detail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardNumber: cardNumber, // Ensure cardNumber is available
          }),
        });
        const data = await response.json();
        const transactions = data.transections || [];
        setTransactions(transactions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  // Filter transactions based on the selected date range
  const filterTransactions = () => {
    if (!startDate || !endDate) {
      const transactionsToShow = transactions
        .filter(transaction => (id ? transaction.cardNumber === id : true))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
      setFilteredTransactions(transactionsToShow);
      return;
    }

    const filtered = transactions.filter(transaction => {
      const transactionDate = parse(transaction.date, 'MMM dd, yyyy', new Date());
      return isWithinInterval(transactionDate, {
        start: parse(startDate, 'yyyy-MM-dd', new Date()),
        end: parse(endDate, 'yyyy-MM-dd', new Date())
      });
    });
    setFilteredTransactions(filtered);
  };

  // Run the effect to fetch card number and transactions when 'id' or 'cardDetails' changes
  useEffect(() => {
    if (cardDetails?.cardNumber) {
      setCardNumber(cardDetails.cardNumber);
    }
  }, [cardDetails]);

  // Fetch transactions when cardNumber is set
  useEffect(() => {
    if (cardNumber) {
      fetchTransactions();
    }
  }, [cardNumber]);

  // Fetch transactions when 'id' changes
  useEffect(() => {
    filterTransactions();
  }, [transactions, startDate, endDate, id]);

  // const filterTransactions = () => {
  //   if (!startDate || !endDate) {

  //     const transactions = id 
  //       ? (transactionsByCard[id] || []).slice(0, 10)
  //       : getAllTransactions();
  //     setFilteredTransactions(transactions);
  //     return;
  //   }

  //   const transactions = id 
  //     ? (transactionsByCard[id] || [])
  //     : Object.values(transactionsByCard).flat();

  //   const filtered = transactions.filter(transaction => {
  //     const date = parse(transaction.transferDate, 'd MMMM yyyy', new Date());
  //     return isWithinInterval(date, {
  //       start: parse(startDate, 'yyyy-MM-dd', new Date()),
  //       end: parse(endDate, 'yyyy-MM-dd', new Date())
  //     });
  //   });

  //   setFilteredTransactions(filtered);
  // };

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalLevy = filteredTransactions.reduce((sum, transaction) => sum + transaction.levy, 0)

  const convertSvgToDataUrl = (callback) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      callback(canvas.toDataURL('image/png'))
    }
    img.src = logo
  }

  const exportToPDF = () => {
    const doc = new jsPDF();

    let start = startDate;
    let end = endDate;

    if (!startDate) {
      start = '2024-01-01';
    }

    if (!endDate) {
      end = format(new Date(), 'yyyy-MM-dd');
    }

    convertSvgToDataUrl((dataUrl) => {
      try {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const padding = 25; // Add padding to the left and right

        const logoWidth = 50;
        const logoHeight = 10;
        const totalWidth = logoWidth + doc.getTextWidth('HSBC UK Bank Limited');
        const logoX = (pageWidth - totalWidth) / 2;
        doc.addImage(dataUrl, 'PNG', logoX, 14, logoWidth, logoHeight);

        doc.setFontSize(18);
        doc.setTextColor(0,0,0);
        doc.setFont('helvetica', 'bold');
        doc.text('HSBC UK Bank ', 75, 17);
        doc.text('Limited', 75 , 25)

        // Add address under header
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('1 Centenary Square, Birmingham, B1 1HQ',75, 30);

        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('DEBIT CARD TRANSECTIONS STATEMENT', pageWidth / 2, 50, { align: 'center' });

        // Add customer details with null check
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        if (cardDetails) {
          doc.text(`${cardUser }`, padding, 70);
          doc.text(`${cardDetails.address}`, padding, 80);
        }

        let startY = 115; // Default startY without card details

        // Only add card details if they exist
        if (cardDetails) {
          doc.text(`Card Number: ${cardDetails.cardNumber}`, padding, 90);
          doc.text(`CVV: ${cardDetails.cvv}`, padding, 100);
          doc.text(`Expiry: ${cardDetails.dd}/${cardDetails.mm}`, padding, 110);
          startY = 130; // Adjust startY when card details are present
        }

        // Add export date and time on the right with UK timezone
        const ukTime = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        });
        const ukDate = format(new Date(), 'dd/MM/yyyy');
        doc.setFontSize(9);
        doc.text(`Duration: ${start} - ${end}`, pageWidth - padding, startY - 15, { align: 'right' });
        doc.text(`Export Date: ${ukDate}`, pageWidth - padding, startY - 8, { align: 'right' });



        // Update table headers and data structure
        const tableData = filteredTransactions.map(transaction => [
          transaction.Reference,
          transaction.transferDate,
          transaction.description,
          `$${transaction.amount.toFixed(2)}`
        ]);

        // Update table with new starting position
        doc.autoTable({
          startY: startY, // Adjust start position if card details are present
          margin: { left: padding, right: padding },
          head: [['Reference Number', 'Date', 'Description', 'Transaction Amount']],
          body: tableData,
          theme: 'grid',
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
          },
          styles: {
            fontSize: 11,
            cellPadding: 1,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
          },
          alternateRowStyles: {
            fillColor: [255, 255, 255],
          },
          bodyStyles: {
            textColor: [0, 0, 0],
          },
          didDrawPage: (data) => {
            const tableHeight = data.cursor.y;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(128, 128, 128);
            doc.text('HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved.', padding, tableHeight + 17);
          }
        });

        // Save the PDF
        doc.save('Wallet-Balance-Statement.pdf');
      } catch (error) {
        console.error('Error generating the PDF:', error);
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="p-4 lg:p-6">
        
        <div className="flex flex-col lg:flex-row lg:justify-end space-y-2 lg:space-y-0 lg:space-x-0 mb-4 mt-4">
          <input
            type="date"
            className="border rounded p-2 w-full lg:w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2 w-full lg:w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            onClick={filterTransactions}
            className="bg-[#db0011] text-white px-4 py-2  hover:bg-[#af000d] w-full lg:w-auto"
          >
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Number</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transection Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.referenceNumber}</td>
                    <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.date}</td>
                    <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-green-600">{transaction.description}</td>
                    <td className="w-1/4 px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-blue-600">{transaction.amount.toFixed(2)} {transaction.currency}</td>
                  </tr>
                ))}
              </tbody>
            {/* <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-3 lg:px-6 py-2 lg:py-4 text-right font-semibold text-sm">Total Amount (GBP)</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-blue-600 font-semibold text-sm">${totalAmount.toFixed(2)}</td>  
              </tr>
            </tfoot> */}
          </table>
        </div>
      </div>
      <div className="flex flex-col p-4 lg:p-6 bg-gray-50">
        <div className="flex justify-between mb-4">
          <button 
            className="bg-[#db0011] text-white px-3 lg:px-4 py-2 hover:bg-[#af000d] text-sm"
            onClick={exportToPDF}
          >
            Export
          </button>
          <button 
            className="bg-[#db0011] text-white px-3 lg:px-4 py-2 hover:bg-[#af000d] text-sm"
            onClick={() => {
              setStartDate('')
              setEndDate('')
              setFilteredTransactions(getRecentTransactions())
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}


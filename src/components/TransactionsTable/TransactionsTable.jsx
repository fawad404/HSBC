import { useState } from 'react'
import { format, parse, isWithinInterval } from 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/pdf-logo.svg'

const initialTransactions = [
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 628037', amount: 310, levy: 33.17 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 057371', amount: 439, levy: 46.873 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 129668', amount: 521, levy: 55.747 },
  { transferDate: '24 June 2024', postingDate: '25 June 2024', description: 'Reference: 975608', amount: 220, levy: 23.54 },
  { transferDate: '25 June 2024', postingDate: '26 June 2024', description: 'Reference: 217381', amount: 391.50, levy: 41.8905 },
  { transferDate: '26 June 2024', postingDate: '27 June 2024', description: 'Reference: 231663', amount: 370, levy: 39.59 },
  { transferDate: '27 June 2024', postingDate: '28 June 2024', description: 'Reference: 171836', amount: 816, levy: 87.312 },
  { transferDate: '27 June 2024', postingDate: '28 June 2024', description: 'Reference: 778001', amount: 184, levy: 19.688 },
]

export default function TransactionsTable() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions)

  const filterTransactions = () => {
    if (!startDate || !endDate) return

    const filtered = initialTransactions.filter(transaction => {
      const date = parse(transaction.transferDate, 'd MMMM yyyy', new Date())
      return isWithinInterval(date, {
        start: parse(startDate, 'yyyy-MM-dd', new Date()),
        end: parse(endDate, 'yyyy-MM-dd', new Date())
      })
    })

    setFilteredTransactions(filtered)
  }

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
  

    convertSvgToDataUrl((dataUrl) => {
      try {
      
        doc.addImage(dataUrl, 'PNG', 14, 20, 30, 12);
  
        // Adjusted header position to align with logo
        doc.setFontSize(20);
        doc.setTextColor(219, 16, 79); // HSBC brand color
        doc.setFont('helvetica', 'bold');
        doc.text('HSBC UK Bank Limited', 30, 27); 
  
        // Add subheader with personal and account details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Customer Name: AHMAD ASRAR', 14, 50);
        doc.text('Address: 10A Cranley Parade, SE9 4DZ', 14, 57);
        doc.text('Sort Code: 231486', 14, 64);
        doc.text('Account Number: 15302980', 14, 71);
  

  
        // Add export date and time on the right with UK timezone
        const ukTime = new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        });
        const ukDate = format(new Date(), 'dd/MM/yyyy');
        doc.setFontSize(10);
        doc.text(`Export Date: ${ukDate}`, doc.internal.pageSize.width - 70, 78);
        doc.text('Duration: 10/12/2024 - 18/12/2024', doc.internal.pageSize.width - 70, 85);
  
        // Format table data
        const tableData = filteredTransactions.map((transaction) => [
          transaction.description.split(': ')[1],
          `$${transaction.amount.toFixed(2)}`,
          transaction.transferDate,
        ]);
  
        // Add table with styling and adjusted position
        doc.autoTable({
          startY: 90,
          head: [['Reference Number', 'Deposit Amount', 'Deposit Date', 'DTL (10.7%)']],
          body: tableData.map(row => [...row, `$${filteredTransactions[tableData.indexOf(row)].levy.toFixed(2)}`]),
          theme: 'striped',
          headStyles: { fillColor: [219, 16, 79], textColor: [255, 255, 255] },
          styles: { fontSize: 10, cellPadding: 3 },
          bodyStyles: { textColor: [0, 0, 0] },
        });
  
        // Add totals section
        const finalY = doc.lastAutoTable.finalY || 90;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, finalY + 10);
        doc.text(`Total Levy: $${totalLevy.toFixed(2)}`, 14, finalY + 20);
  
        // Add footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(128, 128, 128);
        doc.text(
          'HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved.',
          14,
          doc.internal.pageSize.height - 10
        );
  
        // Save PDF
        doc.save('HSBC-transactions.pdf');
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
  
        // Handle PDF generation without logo
        doc.setFontSize(20);
        doc.setTextColor(219, 16, 79);
        doc.setFont('helvetica', 'bold');
        doc.text('HSBC UK Bank Limited', 14, 25);
        doc.save('HSBC-transactions.pdf');
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
            className="bg-[#DB104F] text-white px-4 py-2  hover:bg-[#83000A] w-full lg:w-auto"
          >
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Number</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Amount</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DTL (10.7%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.description.split(': ')[1]}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-blue-600">${transaction.amount.toFixed(2)}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.transferDate}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-green-600">${transaction.levy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={2} className="px-3 lg:px-6 py-2 lg:py-4 text-right font-semibold text-sm">Total Amount (GBP)</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-blue-600 font-semibold text-sm">${totalAmount.toFixed(2)}</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-green-600 font-semibold text-sm">${totalLevy.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex flex-col p-4 lg:p-6 bg-gray-50">
        <div className="flex justify-between mb-4">
          <button 
            className="bg-[#DB104F] text-white px-3 lg:px-4 py-2 hover:bg-[#83000A] text-sm"
            onClick={exportToPDF}
          >
            Export
          </button>
          <button 
            className="bg-[#DB104F] text-white px-3 lg:px-4 py-2 hover:bg-[#83000A] text-sm"
            onClick={() => {
              setStartDate('')
              setEndDate('')
              setFilteredTransactions(initialTransactions)
            }}
          >
            Clear
          </button>
        </div>
        <div className="text-center text-sm text-gray-600">
          HSBC Group | © Copyright HSBC Group 2002-2024. All rights reserved
        </div>
      </div>
    </div>
  )
}


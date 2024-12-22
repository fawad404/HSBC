'use client'

import { useState } from 'react'
import { format, parse, isWithinInterval } from 'date-fns'

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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="p-4 lg:p-6">
        <div className='flex flex-col space-y-4'>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Corporate Banking Portal</h1>
          <p className="text-sm lg:text-base text-gray-600">SMART ENERGY EFFICIENT SOLUTIONS LTD</p>
          <p className="text-sm lg:text-base text-gray-600">Private limited Company - 14826884</p>
        </div>
        
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
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posting Date</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Transaction Levy(DTL) - 10.7%</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.transferDate}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.postingDate}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm">{transaction.description}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-blue-600">${transaction.amount.toFixed(2)}</td>
                  <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-sm text-green-600">${transaction.levy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-3 lg:px-6 py-2 lg:py-4 text-right font-semibold text-sm">Total Amount (GBP)</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-blue-600 font-semibold text-sm">${totalAmount.toFixed(2)}</td>
                <td className="px-3 lg:px-6 py-2 lg:py-4 whitespace-nowrap text-green-600 font-semibold text-sm">${totalLevy.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex justify-between p-4 lg:p-6 bg-gray-50">
        <button className="bg-[#DB104F] text-white px-3 lg:px-4 py-2  hover:bg-[#83000A] text-sm">Export</button>
        <button className="bg-[#DB104F] text-white px-3 lg:px-4 py-2  hover:bg-[#83000A] text-sm">Clear</button>
      </div>
    </div>
  )
}


// import { useState } from 'react';
// import './App.css'

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [source, setSource] = useState('');
//   const [target, setTarget] = useState('');
//   const [amount, setAmount] = useState('');
//   const [results, setResults] = useState([]);

//   const handleAddTransaction = () => {
//     const newTransaction = { source, target, amount: parseFloat(amount) };
//     setTransactions([...transactions, newTransaction]);
//     setSource('');
//     setTarget('');
//     setAmount('');
//   };

//   const calculateBalances = () => {
//     const balances = {};
//     transactions.forEach(({ source, target, amount }) => {
//       balances[source] = (balances[source] || 0) + amount;
//       balances[target] = (balances[target] || 0) - amount;
//     });
//     console.log(balances)

//     const transactionsList = [];

//     while (true) {
//         const creditValues = Object.values(balances);
//         const maxCredit = Math.max(...creditValues);
//         const maxDebt = Math.min(...creditValues);
//         if (maxCredit === 0 && maxDebt === 0) {
//             break;
//         }
//         // const maxCreditIndex = creditValues.indexOf(maxCredit);
//         // const maxDebtIndex = creditValues.indexOf(maxDebt);
//         // const transaction = {
//         //   source: Object.keys(balances)[maxDebtIndex],
//         //   target: Object.keys(balances)[maxCreditIndex],
//         //   amount: Math.min(maxCredit, -maxDebt)
//         //   };
//         //   transactionsList.push(transaction);
          

//         const creditor = Object.keys(balances).find(key => balances[key] === maxCredit);
//         const debtor = Object.keys(balances).find(key => balances[key] === maxDebt);

//         const transferAmount = Math.min(maxCredit, -maxDebt);

//         transactionsList.push(`${debtor} needs to pay ${creditor}: ${transferAmount.toFixed(2)}`);

//         balances[creditor] = maxCredit - transferAmount;
//         balances[debtor] = maxDebt + transferAmount;
//     }

//     setResults(transactionsList);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//       <h1 className="text-3xl font-bold mb-5">Debit Splitter</h1>

//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-xl font-semibold mb-4">Add a Transaction</h2>

//         <input
//           type="text"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           placeholder="Source (Who gives)"
//           className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
//         />

//         <input
//           type="text"
//           value={target}
//           onChange={(e) => setTarget(e.target.value)}
//           placeholder="Target (Who receives)"
//           className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
//         />

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount"
//           className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
//         />

//         <button
//           onClick={handleAddTransaction}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
//         >
//           Add Transaction
//         </button>
//       </div>

//       <div className="mt-6">
//         <button
//           onClick={calculateBalances}
//           className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600"
//         >
//           Calculate Balances
//         </button>
//       </div>

//       <div className="mt-8 w-96">
//         {results.length > 0 && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Results:</h3>
//             <ul>
//               {results.map((result, index) => (
//                 <li key={index} className="mb-2">
//                   {result}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState([]);

  const handleAddTransaction = () => {
    if (!source || !target || isNaN(amount) || amount <= 0) {
      toast.error("Please provide valid transaction details.");
      return;
    }

    const newTransaction = { source, target, amount: parseFloat(amount) };
    setTransactions([...transactions, newTransaction]);
    setSource('');
    setTarget('');
    setAmount('');
    toast.success("Transaction added successfully!");
  };

  const calculateBalances = () => {
    const balances = {};
    transactions.forEach(({ source, target, amount }) => {
      balances[source] = (balances[source] || 0) + amount;
      balances[target] = (balances[target] || 0) - amount;
    });

    const transactionsList = [];

    while (true) {
      const creditValues = Object.values(balances);
      const maxCredit = Math.max(...creditValues);
      const maxDebt = Math.min(...creditValues);
      if (maxCredit === 0 && maxDebt === 0) {
        break;
      }

      const creditor = Object.keys(balances).find(key => balances[key] === maxCredit);
      const debtor = Object.keys(balances).find(key => balances[key] === maxDebt);

      const transferAmount = Math.min(maxCredit, -maxDebt);

      transactionsList.push(`${debtor} needs to pay ${creditor}: ${transferAmount.toFixed(2)}`);

      balances[creditor] = maxCredit - transferAmount;
      balances[debtor] = maxDebt + transferAmount;
    }

    setResults(transactionsList);
  };

  return (
    <div>

    <div className='bg-gray-100 shadow-md flex justify-around align-middle'>
    <div className=" bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-5">Debit Splitter</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add a Transaction</h2>

        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source (Who gives)"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target (Who receives)"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleAddTransaction}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={calculateBalances}
          className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600"
        >
          Calculate Balances
        </button>
      </div>
      </div>
      <div className="mt-8 w-96">
        <h3 className="text-lg font-semibold mb-4">Transactions:</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Source</th>
              <th className="py-2 px-4 border-b">Target</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{transaction.source}</td>
                <td className="py-2 px-4 border-b">{transaction.target}</td>
                <td className="py-2 px-4 border-b">{transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <div className='flex justify-center'>

      
      <div className="mt-8 w-96">
        {results.length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Results:</h3>
            <ul>
              {results.map((result, index) => (
                <li key={index} className="mb-2">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;





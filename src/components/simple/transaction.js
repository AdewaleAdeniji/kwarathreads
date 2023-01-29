/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import utils from "../../utils";

const Transaction = ({ transaction }) => {
  return (
    transaction && <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {transaction.transactionTitle}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
           {transaction.transactionDetails}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {utils.displayMoney(parseFloat(transaction.transactionAmount))}
        </div>
      </div>
      <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
        SUCCESSFUL
      </span>
      {/* <a
        href="#"
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Track Order location
      </a> */}
    </li>
  );
};

export default Transaction;

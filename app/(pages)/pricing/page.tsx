const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Flexible pricing for casual and power users alike. Select the plan that works best for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pay-As-You-Go Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Pay-As-You-Go
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Purchase credits as you need them with no commitments.
            </p>
            <ul className="text-left mb-6">
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> $10 for 50 credits
              </li>
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> $20 for 120 credits
              </li>
              <li className="flex items-center text-white">
                <span className="text-indigo-500 mr-2">✔</span> $50 for 350 credits
              </li>
            </ul>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700">
              Buy Credits
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Pro Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Best for users who need a reliable amount of credits each month.
            </p>
            <ul className="text-left mb-6">
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> 250 credits/month
              </li>
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> Priority Support
              </li>
              <li className="flex items-center text-white">
                <span className="text-indigo-500 mr-2">✔</span> $19.99/month
              </li>
            </ul>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700">
              Subscribe to Pro
            </button>
          </div>

          {/* Unlimited Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Unlimited Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For power users who need unrestricted access to all features.
            </p>
            <ul className="text-left mb-6">
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> Unlimited credits
              </li>
              <li className="flex items-center mb-2 text-white">
                <span className="text-indigo-500 mr-2">✔</span> Premium Support
              </li>
              <li className="flex items-center text-white">
                <span className="text-indigo-500 mr-2">✔</span> $49.99/month
              </li>
            </ul>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700">
              Subscribe to Unlimited
            </button>
          </div>
        </div>

        <div className="mt-12 text-gray-600 dark:text-gray-400">
          <p>Not sure which plan is right for you? Start with Pay-As-You-Go and upgrade anytime!</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

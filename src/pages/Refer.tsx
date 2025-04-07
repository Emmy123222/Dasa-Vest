import { ArrowLeft, Gift, Printer, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Refer() {
  const referralCode = "dasavest.com/register/tunmisedasa";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-6 py-8">
        <Link
          to="/account"
          className="inline-flex items-center text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Invite friends to Dasavest to earn rewards
        </h1>
        
        <div className="bg-blue-50 text-blue-600 text-sm text-center rounded-xl px-4 py-2 mb-8">
          ₦2,000 Each
        </div>

        <p className="text-center text-gray-600 text-sm mb-8">
          Invite friends who have not created Dasavest account to join and earn rewards after activating their account!
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Gift className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Share referral link with friends</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Printer className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Friends activate their account with first investment</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">You'll receive your rewards in your wallet</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white rounded-xl py-4 mb-4 font-medium">
          Share Referral Code
        </button>

        <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-4 mb-8">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-transparent text-blue-600 outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Copy
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Total Earned</span>
              </div>
              <p className="text-2xl font-bold">₦70,000</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Invites</span>
              </div>
              <p className="text-2xl font-bold text-center">35</p>
            </div>
          </div>

          <Link
            to="/referral-record"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
          >
            <span className="font-medium">Referral Record</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
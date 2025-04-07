import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface InvestmentPeriod {
  months: number;
  returnPercentage: number;
}

export default function InvestmentDetail() {
  const { id } = useParams();
  
  const investmentPeriods: InvestmentPeriod[] = [
    { months: 24, returnPercentage: 60 },
    { months: 36, returnPercentage: 90 },
    { months: 48, returnPercentage: 120 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075&ixlib=rb-4.0.3"
          alt="Brilla Residence"
          className="w-full h-full object-cover"
        />
        <Link
          to="/investments"
          className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6 relative">
        <div className="bg-white rounded-t-3xl p-6">
          <h1 className="text-2xl font-bold text-fuchsia-600 mb-2">
            Brilla Residence
          </h1>
          <p className="text-gray-600 text-sm mb-6">By Dasa Homes Limited</p>

          <button className="w-full bg-fuchsia-600 text-white py-3 rounded-xl font-medium hover:bg-fuchsia-700 transition-colors">
            Invest Now
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Investment Information</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Developers</h3>
                  <p className="font-medium">Dasa Homes Limited</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">Investment Category</h3>
                  <p className="font-medium">Capital Investment</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-2">Return on Investments</h3>
                <div className="space-y-2">
                  {investmentPeriods.map((period) => (
                    <div key={period.months} className="flex justify-between">
                      <span>{period.months} Months</span>
                      <span className="font-medium">{period.returnPercentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-1">Investment Type</h3>
                <p className="font-medium">Slot Purchase</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-1">Location</h3>
                <p className="font-medium">Moniya-Iseyin, Ibadan, Oyo State</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-1">Purchase Document Title</h3>
                <p className="font-medium">Slot Purchase Agreement</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-1">Investment Goal</h3>
                <p className="font-medium">Long Term</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-600 mb-1">Total Shares Available</h3>
                <p className="font-medium">10000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
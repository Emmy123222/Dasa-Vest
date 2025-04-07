import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Investment {
  id: string;
  name: string;
  image: string;
  pricePerShare: number;
  returnPercentage: number;
  duration: number;
  sharesLeft: number;
}

export default function Investments() {
  const investments: Investment[] = [
    {
      id: 'brilla-residence',
      name: 'Brilla Residence',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075&ixlib=rb-4.0.3',
      pricePerShare: 25000.00,
      returnPercentage: 60,
      duration: 24,
      sharesLeft: 10000
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-fuchsia-600 text-white px-6 pt-12 pb-20 rounded-b-[2.5rem]">
        <div className="flex justify-end mb-8">
          <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
            <Mail className="w-6 h-6" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">My Investments</h1>
          <div className="bg-fuchsia-500/50 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-sm opacity-90 mb-2">Total Investments</p>
            <p className="text-3xl font-bold mb-3">₦245,536,826.38</p>
            <div className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-sm">
              up to 60% returns in 24 Months
            </div>
          </div>
        </div>
      </div>

      {/* Vetted Opportunities */}
      <div className="px-6 -mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Vetted Opportunities</h2>
          <Link to="/investments/all" className="text-fuchsia-600 text-sm font-medium flex items-center gap-1">
            View More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {investments.map((investment) => (
            <Link
              key={investment.id}
              to={`/investments/${investment.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={investment.image}
                  alt={investment.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-fuchsia-600 mb-2">
                    {investment.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        ₦{investment.pricePerShare.toLocaleString()}/Share
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <span className="text-fuchsia-600 font-medium">{investment.returnPercentage}%</span>
                        <span>•</span>
                        <span>{investment.duration} Months</span>
                      </div>
                    </div>
                    <ArrowRight className="text-fuchsia-600" />
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div
                        className="bg-fuchsia-600 h-2 rounded-full"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {investment.sharesLeft.toLocaleString()} Shares left
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Investment Status Tabs */}
        <div className="mt-8">
          <div className="flex">
            <button className="flex-1 text-fuchsia-600 border-b-2 border-fuchsia-600 py-3 font-medium">
              Active
            </button>
            <button className="flex-1 text-gray-400 py-3 font-medium">
              Matured
            </button>
          </div>
          
          <div className="py-16 flex flex-col items-center justify-center text-gray-400">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
            </div>
            <p className="font-medium">NO Active investments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
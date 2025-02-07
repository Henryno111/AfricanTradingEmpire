import { useState } from "react";
import { Wallet, ShoppingBag, Map, Activity } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [merchants, setMerchants] = useState([
    {
      id: 1,
      type: "Spice Trader",
      level: 3,
      resources: ["Cinnamon", "Pepper", "Saffron"],
      image: "https://images.unsplash.com/photo-1514326005837-fb4791d25e03?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      type: "Gold Merchant",
      level: 2,
      resources: ["Gold", "Silver", "Gems"],
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=400",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Trader Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Active Merchants
              </h3>
              <ShoppingBag className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {merchants.length}
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Trade Routes
              </h3>
              <Map className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">3</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Resources
              </h3>
              <Activity className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">8</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Your Merchants
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {merchants.map((merchant) => (
              <div
                key={merchant.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800"
              >
                <img
                  src={merchant.image}
                  alt={merchant.type}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {merchant.type}
                  </h3>
                  <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                    Level {merchant.level}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {merchant.resources.map((resource) => (
                      <span
                        key={resource}
                        className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
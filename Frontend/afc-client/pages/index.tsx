import { Compass } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex items-center space-x-2">
            <Compass className="h-12 w-12 text-amber-600 dark:text-amber-500" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              African Trade Empire
            </h1>
          </div>
          
          <p className="mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Embark on an epic journey through ancient African trade routes. Build your merchant empire, 
            establish trade networks, and become a legendary trader in this unique NFT-powered game.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                Trade Routes
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Establish lucrative trade routes across the continent
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                Merchant Cards
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Collect unique merchant NFTs with special abilities
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                Resources
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Trade valuable resources and grow your wealth
              </p>
            </div>
          </div>

          <div className="mt-12 flex space-x-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-amber-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
            >
              Start Trading
            </Link>
            <Link
              href="/marketplace"
              className="rounded-lg bg-slate-200 px-6 py-3 text-lg font-semibold text-slate-800 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              Visit Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client"
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          African Trade Empire
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Access Cards */}
          <Link href="/dashboard" 
            className="p-6 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p>View your merchant cards and stats</p>
          </Link>

          <Link href="/marketplace" 
            className="p-6 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Marketplace</h2>
            <p>Trade and acquire new merchants</p>
          </Link>

          <Link href="/trade" 
            className="p-6 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold">Trading Routes</h2>
            <p>Establish and manage trade routes</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
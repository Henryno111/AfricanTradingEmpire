// components/layout/Navbar.js
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import * as fcl from "@onflow/fcl"
import { motion, AnimatePresence } from "framer-motion"
import { useClickAway } from 'react-use'

// Wallet Options Component with animations
const WalletOptions = ({ onSelect, onClose, isLoading, loadingWallet }) => {
  const ref = useRef(null)
  useClickAway(ref, onClose)

  const wallets = [
    { id: 'flow', name: 'Flow Wallet', icon: '/flow-wallet.png' },
    { id: 'leather', name: 'Leather Wallet', icon: '/leather-wallet.png' },
    { id: 'xverse', name: 'Xverse Wallet', icon: '/xverse-wallet.png' }
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20"
    >
      <div className="p-2 space-y-1">
        {wallets.map((wallet) => (
          <motion.button
            key={wallet.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(wallet.id)}
            disabled={isLoading}
            className={`group flex items-center w-full p-3 rounded-lg 
              ${isLoading && loadingWallet === wallet.id 
                ? 'bg-purple-500/20 animate-pulse' 
                : 'hover:bg-white/10'} 
              transition-all duration-300`}
          >
            <img src={wallet.icon} alt={wallet.name} className="w-6 h-6 mr-3" />
            <span className="text-white font-medium">{wallet.name}</span>
            {isLoading && loadingWallet === wallet.id && (
              <div className="ml-auto">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// Error Toast Component
const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [user, setUser] = useState({ loggedIn: false })
  const [isHovered, setIsHovered] = useState('')
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingWallet, setLoadingWallet] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  const handleWalletSelect = async (wallet) => {
    try {
      setIsLoading(true)
      setLoadingWallet(wallet)
      setError(null)

      switch(wallet) {
        case 'flow':
          await fcl.authenticate()
          break
        case 'leather':
          await fcl.authenticate({
            payer: fcl.authn,
            proposer: fcl.authn,
            authorizations: [fcl.authn],
            args: (arg, t) => [],
            limit: 9999
          })
          break
        case 'xverse':
          await fcl.authenticate({
            payer: fcl.authn,
            proposer: fcl.authn,
            authorizations: [fcl.authn],
            args: (arg, t) => [],
            limit: 9999
          })
          break
      }
      
      setShowWalletOptions(false)
    } catch (err) {
      setError(`Failed to connect to ${wallet}: ${err.message}`)
    } finally {
      setIsLoading(false)
      setLoadingWallet(null)
    }
  }

  const disconnect = async () => {
    try {
      await fcl.unauthenticate()
    } catch (err) {
      setError(`Failed to disconnect: ${err.message}`)
    }
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 border-b border-purple-500/20 backdrop-blur-sm">
        {/* Same navbar content as before, but with enhanced UI */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              >
                African Trade Empire
              </motion.span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {['dashboard', 'marketplace', 'trade', 'inventory'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={`/${item}`}
                    onMouseEnter={() => setIsHovered(item)}
                    onMouseLeave={() => setIsHovered('')}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white relative group flex items-center"
                  >
                    <span className="capitalize z-10">{item}</span>
                    {isHovered === item && (
                      <motion.div 
                        layoutId="hoverBackground"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Wallet Connection */}
              <div className="relative ml-4">
                {user.loggedIn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={disconnect}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                    {user.addr?.slice(0, 6)}...{user.addr?.slice(-4)}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowWalletOptions(!showWalletOptions)}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/50"
                  >
                    Connect Wallet
                  </motion.button>
                )}

                <AnimatePresence>
                  {showWalletOptions && !user.loggedIn && (
                    <WalletOptions 
                      onSelect={handleWalletSelect}
                      onClose={() => setShowWalletOptions(false)}
                      isLoading={isLoading}
                      loadingWallet={loadingWallet}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {error && (
          <ErrorToast 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Compass, LayoutDashboard, Route, Boxes } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useClickAway } from 'react-use';
import * as fcl from "@onflow/fcl"; // Import FCL
import "../../config/flow.config"; // Ensure Flow config is loaded

const WalletButton = ({ wallet, onSelect, isLoading, loadingWallet }) => (
  <button
    onClick={() => onSelect(wallet.id)}
    disabled={isLoading}
    className={`w-full flex items-center gap-3 p-6 rounded-lg border border-white/10 transition-all duration-300
      ${isLoading && loadingWallet === wallet.id 
        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse' 
        : 'hover:bg-white/5'}`}
  >
    <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
    <div className="flex-1 text-left">
      <div className="font-semibold text-white">{wallet.name}</div>
      <div className="text-sm text-gray-400">Connect to {wallet.name}</div>
    </div>
    {isLoading && loadingWallet === wallet.id && (
      <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
    )}
  </button>
);

export default function Navbar() {
  const { user, isLoading: authLoading, connectWallet, disconnectWallet } = useAuth();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const [toast, setToast] = useState(null);
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    if (showWalletModal) setShowWalletModal(false);
  });

  const wallets = [
    { id: 'flow', name: 'Flow Wallet', icon: '/flow.webp' },
    { id: 'blocto', name: 'Blocto Wallet', icon: '/blocto.png' },
    { id: 'dapper', name: 'Dapper Wallet', icon: '/dapper.png' }
  ];

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/marketplace', label: 'Marketplace', icon: Compass },
    { href: '/trade', label: 'Trade Routes', icon: Route },
    { href: '/inventory', label: 'Inventory', icon: Boxes }
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWalletSelect = async (walletId) => {
    try {
      setLoadingWallet(walletId);
      
      // Ensure FCL Discovery Wallet is correctly set
      fcl.config().put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

      // Connect Wallet
      await fcl.authenticate();
      
      setShowWalletModal(false);
      showToast('Wallet connected successfully!');
    } catch (error) {
      showToast(`Failed to connect wallet: ${error.message}`, 'error');
    } finally {
      setLoadingWallet(null);
    }
  };

  const handleDisconnect = async () => {
    try {
      await fcl.unauthenticate();
      showToast('Wallet disconnected successfully!');
    } catch (error) {
      showToast(`Failed to disconnect: ${error.message}`, 'error');
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <Link href="/" className="flex items-center">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              >
                African Trade Empire
              </motion.span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setActiveLink(href)}
                      onHoverEnd={() => setActiveLink('')}
                      className="relative px-4 py-2"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium relative z-10">
                        <Icon className={`w-4 h-4 ${activeLink === href ? 'text-white' : 'text-white/70'}`} />
                        <span className={activeLink === href ? 'text-white' : 'text-white/70'}>
                          {label}
                        </span>
                      </div>
                      {activeLink === href && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.loggedIn ? (
                  <button
                    onClick={handleDisconnect}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium flex items-center gap-2 transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {user.addr?.substring(0, 6)}...{user.addr?.substring(user.addr.length - 4)}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium flex items-center gap-2 transition-all duration-300"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content relative w-full max-w-md mx-4 bg-gray-900/95 rounded-xl border border-purple-500/20 shadow-xl"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-6">Choose your preferred wallet:</p>
                <div className="space-y-2">
                  {wallets.map((wallet) => (
                    <WalletButton
                      key={wallet.id}
                      wallet={wallet}
                      onSelect={handleWalletSelect}
                      isLoading={authLoading}
                      loadingWallet={loadingWallet}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

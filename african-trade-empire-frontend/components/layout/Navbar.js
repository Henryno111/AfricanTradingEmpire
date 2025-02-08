"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Compass, LayoutDashboard, Route, Boxes } from 'lucide-react';
import * as fcl from "@onflow/fcl";
import config from "../../config/flow.config"

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
  const [user, setUser] = useState({ loggedIn: false, addr: null });
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const [toast, setToast] = useState(null);

  // Subscribe to user authentication changes
  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const wallets = [
    { id: 'flow', name: 'Flow Wallet', icon: 'flow.webp' },
    { id: 'blocto', name: 'Blocto Wallet', icon: 'blocto.png' },
    { id: 'dapper', name: 'Dapper Wallet', icon: 'https://assets.website-files.com/60f01680d1547eabcef8f63e/6141c4db4256056e0416e2d9_Dapper_Favicon_500x500.png' }
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
      setIsLoading(true);
      setLoadingWallet(walletId);

      // Authenticate with Flow
      await fcl.authenticate({
        appIdentifier: "African Trade Empire",
        serviceName: "African Trade Empire",
        includeMethods: ["TESTNET"], // or ["MAINNET"] for production
      });

      setShowWalletModal(false);
      showToast('Wallet connected successfully!');
    } catch (error) {
      showToast(`Failed to connect wallet: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
      setLoadingWallet(null);
    }
  };

  const disconnect = async () => {
    try {
      await fcl.unauthenticate();
      showToast('Wallet disconnected successfully!');
    } catch (error) {
      showToast(`Failed to disconnect: ${error.message}`, 'error');
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showWalletModal && !e.target.closest('.modal-content')) {
        setShowWalletModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showWalletModal]);

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
                Africa Trade Empire
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
                    onClick={disconnect}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content relative w-full max-w-md mx-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-xl border border-purple-500/20 shadow-xl"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-400 mb-6">
                  Choose your preferred wallet to connect to African Trade Empire
                </p>
                <div className="space-y-2">
                  {wallets.map((wallet) => (
                    <WalletButton
                      key={wallet.id}
                      wallet={wallet}
                      onSelect={handleWalletSelect}
                      isLoading={isLoading}
                      loadingWallet={loadingWallet}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white z-50`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
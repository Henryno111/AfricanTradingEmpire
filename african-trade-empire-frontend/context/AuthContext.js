'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import * as fcl from "@onflow/fcl"

const AuthContext = createContext({
  user: null,
  isLoading: false,
  error: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  const connectWallet = async (walletType) => {
    try {
      setIsLoading(true)
      setError(null)
      
      switch(walletType) {
        case 'flow':
          await fcl.authenticate()
          break
        case 'leather':
        case 'xverse':
          await fcl.authenticate({
            payer: fcl.authn,
            proposer: fcl.authn,
            authorizations: [fcl.authn],
            args: (arg, t) => [],
            limit: 9999
          })
          break
        default:
          throw new Error('Unsupported wallet type')
      }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      await fcl.unauthenticate()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
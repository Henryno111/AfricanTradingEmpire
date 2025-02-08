import { AuthProvider } from '../context/AuthContext'
import Navbar from '@/components/layout/Navbar'
import "./globals.css"

export const metadata = {
  title: "African Trade Empire",
  description: "An NFT-based trading game on Flow blockchain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
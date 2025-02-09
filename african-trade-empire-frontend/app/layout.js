import { AuthProvider } from '../context/AuthContext'
import Navbar from '@/components/layout/Navbar'
import "./globals.css"
import Footer from '@/components/layout/Footer';
import FloatingChat from '@/components/layout/FloatingChat';

export const metadata = {
  title: "African Trade Empire",
  description: "An NFT-based trading game on Flow blockchain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
          <FloatingChat/>
        </AuthProvider>
      </body>
    </html>
  )
}
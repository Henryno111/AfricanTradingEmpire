# African Trade Empire 🌍


![image](https://github.com/user-attachments/assets/6ba9f95c-4e94-4799-9b4a-fe69aa937122)




A Web3-based trading game built on the Flow blockchain that simulates managing a trading empire across Africa. This project is part of TheAfricaHack Web3 hackathon, combining blockchain gaming with real-world asset tokenization.

## 🎯 Project Overview

African Trade Empire is an innovative NFT card game and trading platform built on the Flow blockchain that combines strategic gameplay with AI-powered market analysis. Players collect, trade, and deploy merchant cards representing historical African traders, each with unique abilities and trading specialties.

Core Game Elements:
- Collect and trade merchant NFT cards with unique abilities and historical significance
- Deploy merchants strategically on trade routes across Africa
- Use SudoCat AI to analyze market trends and optimize trading strategies
- Compete in trading competitions and special events
- Earn rewards through successful trade route management

## 🚀 Features

### NFT Card Game
- **Merchant Cards**: Unique NFT cards representing historical African traders
- **Card Attributes**: Each merchant has specific trading specialties, influence ranges, and special abilities
- **Strategic Gameplay**: Deploy merchants strategically to maximize trade route efficiency
- **Card Rarity System**: Common to Legendary merchants with varying abilities
- **Card Evolution**: Level up merchants through successful trades

### Dynamic Marketplace
- **AI-Powered Market Analysis**: Integration with SudoCat AI for:
  - Price prediction and trend analysis
  - Trading opportunity identification
  - Market sentiment analysis
  - Portfolio optimization suggestions
- **Real-time Trading**: Live marketplace for buying and selling merchant NFTs
- **Auction House**: Special auctions for rare merchant cards
- **Trading History**: Comprehensive transaction and performance tracking

### Core Platform Features
- **Command Center Dashboard**: Monitor your merchant fleet and trading empire statistics
- **Trade Routes**: Chart new paths and establish trading networks
- **Inventory Management**: Track and manage your merchant cards and assets
- **Smart Contract Integration**: Built on Flow blockchain for secure transactions
- **Web3 Wallet Support**: Compatible with multiple wallets including:
  - Flow Wallet
  - Blocto Wallet
  - Dapper Wallet

## 🛠 Technology Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Blockchain**: Flow
- **Smart Contracts**: Cadence
- **Authentication**: FCL (Flow Client Library)
- **State Management**: React Context API

## 🔗 Smart Contract

The African Trade Empire NFT contract is deployed on Flow testnet at address: `fb11ab794c9a3fd0`

### Contract Overview

```cadence
access(all) contract AfricanTradeEmpire: NonFungibleToken {
    // Implementation of NFT collection for merchant cards
}
```

### Key Features

- **Merchant NFT Implementation**: Full implementation of Flow's NonFungibleToken standard
- **Metadata Integration**: Support for Flow metadata standards
- **Access Control**: Admin-controlled minting and contract management
- **Daily Mint Limits**: Built-in rate limiting for NFT minting
- **Event Tracking**: Comprehensive event emission for all major actions

### Storage Paths

```cadence
access(all) let MerchantStoragePath: /storage/AfricanTradeEmpireMerchant
access(all) let MerchantPublicPath: /public/AfricanTradeEmpireMerchant
access(all) let MerchantPrivatePath: /private/AfricanTradeEmpireMerchant
access(all) let TradeRouteStoragePath: /storage/AfricanTradeEmpireRoute
access(all) let AdminStoragePath: /storage/AfricanTradeEmpireAdmin
```

### Core Resources

1. **NFT Resource**
   - Unique merchant card implementation
   - Includes merchant data and trade history
   - Implements NonFungibleToken standard

2. **Collection Resource**
   - Manages owned merchant cards
   - Handles deposit and withdrawal operations
   - Maintains NFT ownership records

3. **Administrator Resource**
   - Controls minting operations
   - Manages contract settings
   - Handles administrative functions

### Events

```cadence
access(all) event ContractInitialized()
access(all) event MerchantCardMinted(id: UInt64, merchantType: String, recipient: Address)
access(all) event TradeRouteEstablished(from: Address, to: Address, routeId: UInt64)
access(all) event AdminGranted(address: Address)
access(all) event ContractPaused(paused: Bool)
```

### Interacting with the Contract

1. **Setup Collection**
```cadence
import AfricanTradeEmpire from 0xfb11ab794c9a3fd0

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&AfricanTradeEmpire.Collection>(from: AfricanTradeEmpire.MerchantStoragePath) == nil {
            acct.save(<-AfricanTradeEmpire.createEmptyCollection(), to: AfricanTradeEmpire.MerchantStoragePath)
            acct.link<&AfricanTradeEmpire.Collection{NonFungibleToken.CollectionPublic}>(AfricanTradeEmpire.MerchantPublicPath, target: AfricanTradeEmpire.MerchantStoragePath)
        }
    }
}

## 🏗 Project Structure

```
├── app/
│   ├── dashboard/
│   │   └── page.js         # Dashboard view
│   └── page.js             # Landing page
├── components/
│   └── layout/
│       └── Navbar.js       # Navigation component
├── context/
│   └── AuthContext.js      # Authentication context
└── config/
    └── flow.config.js      # Flow blockchain configuration
```

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/african-trade-empire.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
NEXT_PUBLIC_FLOW_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=fb11ab794c9a3fd0
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Wallet Connection

The application supports multiple Web3 wallets:

1. Click the "Connect Wallet" button in the navigation bar
2. Select your preferred wallet from the modal
3. Follow the wallet's connection prompts
4. Once connected, your wallet address will be displayed in the navigation bar

## 🎮 Gameplay Features

### Merchant Cards (NFTs)
- **Card Types**: Various merchant characters based on historical African traders
- **Attributes**: 
  - Trading Level (determines trading capacity)
  - Resource Types (specializations in different trade goods)
  - Trade History (tracks all previous transactions)
  - Special Abilities (unique trading advantages)

### Trading System
- **Establish Routes**: Create trade routes between African cities
- **Resource Management**: Balance different trade goods across your network
- **Route Optimization**: Strategic placement of merchants for maximum efficiency
- **Performance Tracking**: Monitor success rates and profitability
- **Interactive Map**: Visual representation of your trade empire (coming soon)

### Game Mechanics
- **Daily Mint Limits**: Strategic resource management for new merchant cards
- **Trading Levels**: Progress system for merchant development
- **Resource Specialization**: Different merchants excel at different trade goods
- **Market Dynamics**: Real-time price fluctuations based on supply and demand

## 🤝 Contributing

We welcome contributions to African Trade Empire! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🏆 Hackathon Context

This project is part of TheAfricaHack Web3 hackathon, focusing on:
- Gaming on Flow Blockchain
- Advancing DeFi
- Real-World Asset Tokenization
- Web3 Innovation in Africa

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- TheAfricaHack organizers and mentors
- Flow blockchain team
- All contributors and participants

## 📞 Contact

For questions and support, please open an issue in the GitHub repository or contact the team at [team@africantradeempire.com](mailto:team@africantradeempire.com)

---

Built with ❤️ for Africa's Web3 future 🌍

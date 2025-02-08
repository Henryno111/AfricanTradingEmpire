// config/flow.config.js
import { config } from "@onflow/fcl"

config({
  "app.detail.title": "African Trade Empire",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  
  // Network configurations
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  
  // Testnet addresses for deployed contracts
  "0xAfricanTradeEmpire": "fb11ab794c9a3fd0",

  // Wallet Discovery
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  
  "fcl.eventPollRate": 2500,
})


export default config
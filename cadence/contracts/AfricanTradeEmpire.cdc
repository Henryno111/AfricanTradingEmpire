import FungibleToken from "./interfaces/FungibleToken.cdc"
import NonFungibleToken from "./interfaces/NonFungibleToken.cdc"
import MetadataViews from "./interfaces/MetadataViews.cdc"

access(all) contract AfricanTradeEmpire: NonFungibleToken {

   // Events
   access(all) event ContractInitialized()
   access(all) event MerchantCardMinted(id: UInt64, merchantType: String, recipient: Address)
   access(all) event TradeRouteEstablished(from: Address, to: Address, routeId: UInt64)
   access(all) event AdminGranted(address: Address)
   access(all) event ContractPaused(paused: Bool)
   access(all) event ResourcePriceSet(resourceType: String, price: UFix64)
   access(all) event Withdraw(id: UInt64, from: Address?)
   access(all) event Deposit(id: UInt64, to: Address?)

   // State Variables
   access(all) var totalSupply: UInt64
   access(all) var totalMerchants: UInt64
   access(all) var totalTradeRoutes: UInt64
   access(all) var isPaused: Bool
   access(contract) var adminAddresses: {Address: Bool}
   access(contract) var resourcePrices: {String: UFix64}
   access(contract) var dailyMintLimit: UInt64
   access(contract) var dailyMintCount: UInt64
   access(contract) var lastMintReset: UFix64

   // Paths
   access(all) let MerchantStoragePath: StoragePath
   access(all) let MerchantPublicPath: PublicPath
   access(all) let MerchantPrivatePath: PrivatePath
   access(all) let TradeRouteStoragePath: StoragePath
   access(all) let AdminStoragePath: StoragePath

   access(all) struct MerchantData {
       access(all) let id: UInt64
       access(all) let merchantType: String
       access(all) let tradingLevel: UInt8
       access(all) let resourceTypes: [String]
       access(all) let mintTime: UFix64

       init(id: UInt64, type: String, level: UInt8, resources: [String]) {
           pre {
               type.length > 0: "Invalid merchant type"
               level > 0: "Invalid level"
               resources.length > 0: "Must specify resources"
           }
           self.id = id
           self.merchantType = type
           self.tradingLevel = level
           self.resourceTypes = resources
           self.mintTime = getCurrentBlock().timestamp
       }
   }

   access(all) resource NFT: NonFungibleToken.NFT {
       access(all) let id: UInt64
       access(all) let data: MerchantData
       access(self) var tradeHistory: [{Address: UFix64}]

       init(merchantData: MerchantData) {
           self.id = merchantData.id
           self.data = merchantData
           self.tradeHistory = []
       }
   }

   access(all) resource Collection: NonFungibleToken.Collection {
       access(all) var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

       init () {
           self.ownedNFTs <- {}
       }

       access(all) fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
           pre {
               self.ownedNFTs[withdrawID] != nil: "NFT not found"
               !AfricanTradeEmpire.isPaused: "Contract is paused"
           }
           
           let token <- self.ownedNFTs.remove(key: withdrawID)!
           emit Withdraw(id: token.id, from: self.owner?.address)
           return <-token
       }

       access(all) fun deposit(token: @NonFungibleToken.NFT) {
           pre {
               !AfricanTradeEmpire.isPaused: "Contract is paused"
           }
           
           let id = token.id
           emit Deposit(id: id, to: self.owner?.address)
           self.ownedNFTs[id] <-! token
       }
   }

   access(all) resource Administrator {
       access(all) fun mintNFT(
           recipient: &NonFungibleToken.Collection,
           merchantType: String,
           level: UInt8,
           resources: [String]
       ) {
           pre {
               !AfricanTradeEmpire.isPaused: "Contract is paused"
               AfricanTradeEmpire.dailyMintCount < AfricanTradeEmpire.dailyMintLimit: "Daily mint limit reached"
               merchantType.length > 0: "Invalid merchant type"
               level > 0: "Invalid level"
               resources.length > 0: "Must specify resources"
           }

           let merchantData = MerchantData(
               id: AfricanTradeEmpire.totalMerchants,
               type: merchantType,
               level: level,
               resources: resources
           )

           let token <- create NFT(merchantData: merchantData)
           recipient.deposit(token: <-token)

           AfricanTradeEmpire.totalSupply = AfricanTradeEmpire.totalSupply + 1
           AfricanTradeEmpire.totalMerchants = AfricanTradeEmpire.totalMerchants + 1
           AfricanTradeEmpire.dailyMintCount = AfricanTradeEmpire.dailyMintCount + 1

           emit MerchantCardMinted(
               id: merchantData.id,
               merchantType: merchantType,
               recipient: recipient.owner!.address
           )
       }
   }

   access(all) fun isAdmin(_ address: Address): Bool {
       return self.adminAddresses[address] ?? false
   }

   init() {
       self.totalSupply = 0
       self.totalMerchants = 0
       self.totalTradeRoutes = 0
       self.isPaused = false
       self.adminAddresses = {}
       self.resourcePrices = {}
       self.dailyMintLimit = 1000
       self.dailyMintCount = 0
       self.lastMintReset = getCurrentBlock().timestamp

       self.MerchantStoragePath = /storage/AfricanTradeEmpireMerchant
       self.MerchantPublicPath = /public/AfricanTradeEmpireMerchant
       self.MerchantPrivatePath = /private/AfricanTradeEmpireMerchant
       self.TradeRouteStoragePath = /storage/AfricanTradeEmpireRoute
       self.AdminStoragePath = /storage/AfricanTradeEmpireAdmin

       let admin <- create Administrator()
       self.account.storage.save(<-admin, to: self.AdminStoragePath)

       self.adminAddresses[self.account.address] = true

       emit ContractInitialized()
   }
}

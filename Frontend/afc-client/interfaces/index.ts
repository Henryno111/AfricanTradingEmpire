// interfaces/index.ts

// Blockchain & Wallet
export interface FlowWallet {
    address: string;
    balance: number;
    isConnected: boolean;
  }
  
  // User & Authentication
  export interface User {
    id: string;
    username: string;
    wallet: FlowWallet;
    experience: number;
    level: number;
    joinedAt: Date;
    lastLogin: Date;
  }
  
  // Game Assets
  export interface Resource {
    id: string;
    name: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
    quantity: number;
    basePrice: number;
  }
  
  export interface MerchantCard {
    id: string;
    tokenId: string;
    name: string;
    level: number;
    experience: number;
    specialties: string[];
    tradeBonus: number;
    resources: Resource[];
    imageUrl: string;
  }
  
  // Trade System
  export interface TradeRoute {
    id: string;
    startLocation: string;
    endLocation: string;
    distance: number;
    requiredLevel: number;
    possibleResources: Resource[];
    risk: number;
    reward: number;
  }
  
  export interface Trade {
    id: string;
    seller: string;
    buyer: string;
    merchantCard: MerchantCard;
    resources: Resource[];
    price: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    completedAt?: Date;
  }
  
  // Guild System
  export interface Guild {
    id: string;
    name: string;
    level: number;
    members: User[];
    leader: string;
    reputation: number;
    tradeRoutes: TradeRoute[];
    treasury: Resource[];
  }
  
  // Mission & Quest System
  export interface Mission {
    id: string;
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'story';
    requirements: {
      resources?: Resource[];
      tradeCount?: number;
      routeDiscovery?: number;
    };
    rewards: {
      experience: number;
      resources?: Resource[];
      merchantCard?: MerchantCard;
    };
    status: 'active' | 'completed' | 'failed';
    deadline?: Date;
  }
  
  // Tournament System
  export interface Tournament {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    entryFee: number;
    participants: User[];
    prizes: {
      position: number;
      rewards: {
        resources?: Resource[];
        merchantCards?: MerchantCard[];
        experience: number;
      };
    }[];
    status: 'upcoming' | 'active' | 'completed';
  }
  
  // Game State
  export interface GameState {
    user: User;
    inventory: {
      resources: Resource[];
      merchantCards: MerchantCard[];
    };
    activeMissions: Mission[];
    activeTradeRoutes: TradeRoute[];
    guild?: Guild;
    currentTournament?: Tournament;
    notifications: {
      id: string;
      type: 'trade' | 'mission' | 'guild' | 'tournament';
      message: string;
      read: boolean;
      createdAt: Date;
    }[];
  }
  
  // API Responses
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: Date;
  }
  
  // Game Actions
  export interface GameAction {
    type: string;
    payload: any;
    timestamp: Date;
    userId: string;
  }
  
  // Event System
  export interface GameEvent {
    id: string;
    type: 'trade' | 'mission' | 'guild' | 'tournament' | 'system';
    data: any;
    timestamp: Date;
    affectedUsers: string[];
  }
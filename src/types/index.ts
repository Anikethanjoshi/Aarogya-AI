export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription?: 'basic' | 'premium' | 'enterprise';
  createdAt: Date;
  tavusApiKey?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

export interface ConsultationSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'cancelled';
  aiAgent: string;
  duration?: number;
  tavusSessionId?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  revenueCatId?: string;
}

export interface TavusSession {
  id: string;
  status: 'active' | 'completed' | 'failed';
  duration: number;
  participantCount: number;
  createdAt: Date;
}
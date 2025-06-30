import { TAVUS_CONFIG } from '../utils/constants';
import { handleAPIError, logError } from '../utils/errorHandler';

export interface TavusSession {
  id: string;
  status: 'active' | 'completed' | 'failed';
  duration: number;
  participantCount: number;
  createdAt: Date;
  agentType: 'doctor' | 'nurse' | 'specialist';
}

export interface TavusAgent {
  id: string;
  name: string;
  type: 'doctor' | 'nurse' | 'specialist';
  specialization: string[];
  languages: string[];
  isActive: boolean;
}

class TavusService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_TAVUS_API_KEY || '';
    this.baseURL = TAVUS_CONFIG.API_URL;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async createSession(agentType: string = 'doctor', userId: string): Promise<TavusSession> {
    try {
      const response = await fetch(`${this.baseURL}/sessions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          agent_type: agentType,
          user_id: userId,
          max_duration: TAVUS_CONFIG.MAX_SESSION_DURATION,
          language: 'en'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create Tavus session: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.session_id || `mock_session_${Date.now()}`,
        status: 'active',
        duration: 0,
        participantCount: 1,
        createdAt: new Date(),
        agentType: agentType as 'doctor' | 'nurse' | 'specialist'
      };
    } catch (error) {
      logError(error as Error, 'TavusService.createSession');
      
      // Return mock session for development
      return {
        id: `mock_session_${Date.now()}`,
        status: 'active',
        duration: 0,
        participantCount: 1,
        createdAt: new Date(),
        agentType: agentType as 'doctor' | 'nurse' | 'specialist'
      };
    }
  }

  async endSession(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/sessions/${sessionId}/end`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to end Tavus session: ${response.statusText}`);
      }
    } catch (error) {
      logError(error as Error, 'TavusService.endSession');
    }
  }

  async getSessionAnalytics(sessionId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/sessions/${sessionId}/analytics`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to get session analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logError(error as Error, 'TavusService.getSessionAnalytics');
      return null;
    }
  }

  async getAvailableAgents(): Promise<TavusAgent[]> {
    try {
      const response = await fetch(`${this.baseURL}/agents`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to get available agents: ${response.statusText}`);
      }

      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      logError(error as Error, 'TavusService.getAvailableAgents');
      
      // Return mock agents for development
      return [
        {
          id: 'dr-aarogya',
          name: 'Dr. Aarogya',
          type: 'doctor',
          specialization: ['general_medicine', 'preventive_care'],
          languages: ['en', 'hi'],
          isActive: true
        }
      ];
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const tavusService = new TavusService();
export default tavusService;
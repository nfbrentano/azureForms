import type { UserProfile } from "../types/user";

// This is a mock service. In a real app, this would interface with @react-oauth/google
// and potentially a backend to verify tokens.
export const googleAuthService = {
  login: async (): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: "google-123",
      name: "Usuário Corporativo",
      email: "contato@empresa.com",
      avatar: "https://github.com/nutlope.png" // Placeholder avatar
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

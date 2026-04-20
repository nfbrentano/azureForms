export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

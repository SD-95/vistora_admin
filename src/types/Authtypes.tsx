export type UserRole = 'superadmin' | 'admin' | 'team' | 'serviceexecutive' | null;

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  role: UserRole;
  loading: boolean;
  error: string | null
}

export type history = {
    id?: number; 
  login_date: string; 
  login_time: string; 
  verification_result: 'Login' | 'Logout'; 
  user_id: string;
}
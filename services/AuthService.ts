export class AuthService {
  private supabase;

  constructor() {
    this.supabase = useSupabaseClient();
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    return { error };
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
    });

    return { error };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();

    localStorage.removeItem("passwords");

    return { error };
  }
}

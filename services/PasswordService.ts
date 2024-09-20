import type { PasswordDto } from "~/types/password.manager.types";

export class ManagerService {
  private supabase;
  private user;

  constructor() {
    this.supabase = useSupabaseClient();
    this.user = useSupabaseUser();
  }

  async getPassword() {
    if (!this.user.value?.id) return;

    return (
      (
        await this.supabase
          .from("password_manager")
          .select("*", { count: "exact" })
          .eq("user_id", this.user.value.id)
      ).data ?? []
    );
  }

  async createPassword(password: PasswordDto): Promise<any> {
    if (!this.user.value?.id) return;

    const { data, error } = await this.supabase
      .from("password_manager")
      .insert<PasswordDto>({
        ...password,
        password: encryptPassword(password.password),
        user_id: this.user.value.id,
      })
      .select("*");

    return { data, error };
  }

  async updatePassword(id: number, password: PasswordDto) {
    const passwords = (await this.getPassword()) ?? [];
    const userPassword = passwords.find((el) => el.id === id);

    if (userPassword && userPassword.password !== password.password) {
      password = {
        ...password,
        password: encryptPassword(password.password),
      };
    }

    const { data, error } = await this.supabase
      .from("password_manager")
      .update(password)
      .eq("id", id)
      .select("*");

    return { data, error };
  }

  async deletePassword(id: number) {
    return await this.supabase.from("password_manager").delete().eq("id", id);
  }
}

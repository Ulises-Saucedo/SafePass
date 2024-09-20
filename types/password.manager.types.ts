import { type Database } from "./database.types";

export type Password = Database["public"]["Tables"]["password_manager"]["Row"];

export type PasswordDto =
  Database["public"]["Tables"]["password_manager"]["Insert"];

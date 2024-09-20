import { CATEGORIES } from "~/types/category.types";

export const useInitialForm = () => {
  const initialState = {
    title: "",
    account: undefined,
    password: "",
    website: undefined,
    notes: undefined,
    category: CATEGORIES.SOCIALS,
  };

  const handleStateChange = (password: any) => {
    return {
      title: password.title,
      account: password.account || undefined,
      password: password.password,
      website: password.website || undefined,
      notes: password.notes || undefined,
      category: password.category as CATEGORIES,
    };
  };

  return {
    initialState,
    handleStateChange,
  };
};

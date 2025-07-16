import { AccountRole } from "./constant/account";

export const getRole = (role) => {
  return role ? [role] : [];
};

export const isAdmin = (roles) => {
  return roles.includes(AccountRole.admin);
};

export const isUser = (roles) => {
  return roles.includes(AccountRole.user);
};

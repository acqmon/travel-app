import { useMutation } from "@tanstack/react-query";
import {
  registerCustomer,
  registerPartner,
  signIn,
  signOut,
} from "./auth.service";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useRegisterPartner = () => {
  return useMutation({
    mutationFn: registerPartner,
  });
};

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: registerCustomer,
  });
};

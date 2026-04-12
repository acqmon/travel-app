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
    onSuccess: (data) => {
      console.log("Sign in successful", data);
    },
    onError: (error) => {
      console.log("Sign in failed", error);
    },
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
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      console.log("Registration failed", error);
    },
  });
};

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: registerCustomer,
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      console.log("Registration failed", error);
    },
  });
};

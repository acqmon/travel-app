import { ROLES } from "@/constants/role.constant";

export const routeAccess = {
  "/admin": [ROLES.ADMIN],
  "/partner": [ROLES.PARTNER],
  "/dashboard": [ROLES.CUSTOMER],
};

export const publicRoutes = ["/login", "/register", "/"];

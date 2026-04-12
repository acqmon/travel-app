import { ROLE } from "@/constants/role.constant";

export const routeAccess = {
  "/admin": [ROLE.ADMIN],
  "/partner": [ROLE.PARTNER],
  "/dashboard": [ROLE.CUSTOMER],
};

export const publicRoutes = ["/login", "/register"];

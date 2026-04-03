import { ROLE } from "./role.constant";
import { PATHS } from "./paths.constant";

export const NAVIGATION = {
  [ROLE.ADMIN]: [{ label: "Dashboard", path: PATHS.ADMIN.DASHBOARD }],
  [ROLE.PARTNER]: [{ label: "Dashboard", path: PATHS.PARTNER.DASHBOARD }],
  [ROLE.CUSTOMER]: [{ label: "Dashboard", path: PATHS.CUSTOMER.DASHBOARD }],
};

import { ROLE } from "./role.constant";
import { PATHS } from "./paths.constant";

export const NAVIGATION = {
  [ROLE.ADMIN]: [
    { label: "Dashboard", path: PATHS.ADMIN.DASHBOARD },
    { label: "Partners", path: PATHS.ADMIN.PARTNERS },
    { label: "Customers", path: PATHS.ADMIN.CUSTOMERS },
    { label: "Activities", path: PATHS.ADMIN.ACTIVITIES },
    { label: "Listings", path: PATHS.ADMIN.LISTINGS },
  ],
  [ROLE.PARTNER]: [{ label: "Dashboard", path: PATHS.PARTNER.DASHBOARD }],
  [ROLE.CUSTOMER]: [{ label: "Dashboard", path: PATHS.CUSTOMER.DASHBOARD }],
};
